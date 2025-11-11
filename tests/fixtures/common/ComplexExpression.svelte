<script>
    let obj = { content: "<div>Test</div>" };
</script>

<div>
    {@html obj.content}
    {@html obj.content.trim()}
    {@html obj.content.toUpperCase()}
</div>
