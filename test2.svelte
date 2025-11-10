<script>
    let a = [5, 10, 15];

    function sanitize(input) {
        // Simple sanitization example (not secure, just for demonstration)
        return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
</script>

{#each a as item}
    <div>Regular content with value: {item}</div>
    {@html "<p>This is unsafe HTML content</p>"}

    {@html "<p>This is unsafe HTML content</p>"} <!-- svelte-ignore unsafe_html -->

    <!-- svelte-ignore unsafe_html --> {@html "<p>This is unsafe HTML content</p>"}

    {@html sanitize("<p>This is unsafe HTML content</p>")}
    
{/each}