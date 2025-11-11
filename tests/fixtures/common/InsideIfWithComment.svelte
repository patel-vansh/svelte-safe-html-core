<script>
    const insideIf = true;
</script>

<div>
    {#if insideIf}
        <!-- svelte-ignore unsafe_html -->
        {@html "<span>Inside If</span>"}
    {/if}
</div>
