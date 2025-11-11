<script>
    let items = [
        { content: '<strong>Item 1</strong>' },
        { content: '<em>Item 2</em>' },
        { content: '<u>Item 3</u>' }
    ];
</script>

{#each items as item}
    {@html item.content}
{/each}