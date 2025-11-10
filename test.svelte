<script>
    let a = 5;

    function sanitize(input) {
        // Simple sanitization example (not secure, just for demonstration)
        return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
</script>

<!-- Comment -->
<!-- svelte-ignore unsafe_html -->

{@html "<p>This is unsafe HTML content</p>"}

{@html sanitize("<p>This is sanitized HTML content</p>")}

<div>
    <p>Regular content with value: {a}</p>
    <!-- svelte-ignore unsafe_html -->
    {@html "<p>This is unsafe HTML content</p>"}        
</div>
