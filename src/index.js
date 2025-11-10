import { parse } from "svelte/compiler";

/**
 * Finds unsafe HTML insertions in Svelte code that use {@html} tags without proper sanitization.
 * 
 * @param {string} code - The Svelte component source code to analyze
 * @param {string} filename - The name of the file being analyzed (used in warning messages)
 * @param {string[]} [ignoreFunctions=[]] - Array of function names that are considered safe sanitizers.
 *                                          If an {@html} tag uses one of these functions, it won't be flagged.
 * @param {boolean} [runes=false] - Whether to enable modern parsing mode in the Svelte compiler
 * @returns {Object} Analysis result object
 * @returns {string} returns.filename - The filename that was analyzed
 * @returns {boolean} returns.parsed - Whether the file was successfully parsed
 * @returns {Error|null} returns.error - Parse error if parsing failed, null otherwise
 * @returns {Array<Object>} returns.warnings - Array of warning objects for unsafe HTML insertions
 * @returns {string} returns.warnings[].filename - File where the warning occurred
 * @returns {Object} returns.warnings[].start - Start position of the unsafe code
 * @returns {number} returns.warnings[].start.line - Starting line number
 * @returns {number} returns.warnings[].start.column - Starting column number
 * @returns {Object} returns.warnings[].end - End position of the unsafe code
 * @returns {number} returns.warnings[].end.line - Ending line number
 * @returns {number} returns.warnings[].end.column - Ending column number
 * @returns {string} returns.warnings[].message - Description of the warning
 * 
 * @example
 * const result = findUnsafeHtml(code, 'App.svelte', ['sanitize', 'escape']);
 * // Returns: { filename: 'App.svelte', parsed: true, error: null, warnings: [...] }
 */
export function findUnsafeHtml(code, filename, ignoreFunctions = [], runes = false) {
    let warnings = [];

    let ast;

    try {
        ast = parse(code, { modern: runes });
    } catch (err) {
        return {
            'filename': filename,
            'parsed': false,
            'error': err,
            'warnings': warnings
        };
    }

    console.log(JSON.stringify(ast)); // --- DEBUG ---
    console.log(JSON.stringify(ast.html)); // --- DEBUG ---

    warnings = checkNodeForUnsafeHtml(ast.html, filename, ignoreFunctions);

    return {
        'filename': filename,
        'parsed': true,
        'error': null,
        'warnings': warnings
    };
}

/**
 * Recursively checks an AST node and its children for unsafe HTML insertions.
 * 
 * This function traverses the Svelte AST looking for RawMustacheTag nodes ({@html} tags).
 * For each found tag, it checks if the usage is safe by looking for:
 * 1. A sanitizer function wrapping the content
 * 2. A `<!-- svelte-ignore unsafe_html -->` comment on the same line (before or after)
 * 3. A `<!-- svelte-ignore unsafe_html -->` comment on the line above
 * 
 * @param {Object} node - The AST node to check (from svelte/compiler parse output)
 * @param {string} filename - The name of the file being analyzed
 * @param {string[]} ignoreFunctions - Array of function names considered safe sanitizers
 * @returns {Array<Object>} Array of warning objects for any unsafe HTML insertions found
 * 
 * @private
 */
function checkNodeForUnsafeHtml(node, filename, ignoreFunctions) {
    let warnings = [];

    if (!node) {
        return warnings;
    }

    if ('children' in node && Array.isArray(node.children)) {
        for (let i = 0; i < node.children.length; i++) {
            const child = node.children[i];
            if ('children' in child && Array.isArray(child.children)) {
                warnings.push(...checkNodeForUnsafeHtml(child, filename, ignoreFunctions));
            } else if (child.type === 'RawMustacheTag') {
                if (isSanitized(child, ignoreFunctions)) {
                    continue;
                }

                // Check for comment on the same line (after the tag)
                if (i < node.children.length - 1) {
                    const nextNode = node.children[i + 1];
                    if (nextNode && nextNode.type === 'Comment' && nextNode.ignores.includes('unsafe_html')) {
                        continue;
                    }
                    // Check for whitespace then comment on the same line
                    if (nextNode && nextNode.type === 'Text' && nextNode.data.trim() === '' && i < node.children.length - 2) {
                        const nextNextNode = node.children[i + 2];
                        if (nextNextNode && nextNextNode.type === 'Comment' && nextNextNode.ignores.includes('unsafe_html')) {
                            continue;
                        }
                    }
                }

                // Check for comment on the line above
                if (i > 0) {
                    const prevNode = node.children[i - 1];
                    if (prevNode && prevNode.type === 'Comment' && prevNode.ignores.includes('unsafe_html')) {
                        continue;
                    }
                    // Check for whitespace then comment on the line above
                    if (prevNode && prevNode.type === 'Text' && prevNode.data.trim() === '' && i > 1) {
                        const prevPrevNode = node.children[i - 2];
                        if (prevPrevNode && prevPrevNode.type === 'Comment' && prevPrevNode.ignores.includes('unsafe_html')) {
                            continue;
                        }
                    }
                }

                warnings.push({
                    'filename': filename,
                    'start': {
                        'line': child.expression.loc.start.line,
                        'column': child.expression.loc.start.column
                    },
                    'end': {
                        'line': child.expression.loc.end.line,
                        'column': child.expression.loc.end.column
                    },
                    'message': `Unsafe raw HTML insertion without sanitizer`
                });
            }
        }
    } else if (node.type === 'RawMustacheTag') {
        if (!isSanitized(node, ignoreFunctions)) {
            warnings.push({
                'filename': filename,
                'start': {
                    'line': node.expression.loc.start.line,
                    'column': node.expression.loc.start.column
                },
                'end': {
                    'line': node.expression.loc.end.line,
                    'column': node.expression.loc.end.column
                },
                'message': `Unsafe raw HTML insertion without sanitizer`
            });
        }
    }

    return warnings;
}

/**
 * Checks if a RawMustacheTag node uses a sanitizer function.
 * 
 * A tag is considered sanitized if it's a CallExpression where the function name
 * is in the ignoreFunctions array. For example: {@html sanitize(content)}
 * 
 * @param {Object} node - The AST node to check (should be a RawMustacheTag)
 * @param {string[]} ignoreFunctions - Array of function names that are considered safe sanitizers
 * @returns {boolean} True if the node uses a sanitizer function, false otherwise
 * 
 * @example
 * // If ignoreFunctions = ['sanitize', 'escape']
 * // {@html sanitize(content)} -> returns true
 * // {@html content} -> returns false
 * // {@html otherFunc(content)} -> returns false
 * 
 * @private
 */
function isSanitized(node, ignoreFunctions) {
    if (node.type === 'RawMustacheTag') {
        if (node.expression && node.expression.type === 'CallExpression') {
            const functionName = node.expression.callee.name;
            if (ignoreFunctions.includes(functionName)) {
                return true;
            }
        }
    }
    return false;
}