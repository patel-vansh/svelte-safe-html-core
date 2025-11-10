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
export function findUnsafeHtml(
    code: string,
    filename: string,
    ignoreFunctions?: string[],
    runes?: boolean
): {
    filename: string;
    parsed: boolean;
    error: Error | null;
    warnings: {
        filename: string;
        start: { line: number; column: number };
        end: { line: number; column: number };
        message: string;
    }[];
};