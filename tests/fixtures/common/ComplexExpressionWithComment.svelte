<script>
    let obj = { content: "<div>Test</div>" };
</script>

<div>
    <!-- svelte-ignore unsafe_html -->
    {@html obj.content}
    <!-- svelte-ignore unsafe_html -->
    {@html obj.content.trim()}
    {@html obj.content.toUpperCase()}
</div>
