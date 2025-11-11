<script>
    let title = "Two Unsafe With Script";
</script>

<p>{@html '<b>Bold Text</b>'}</p>


<p>{@html '<script>alert("XSS Attack")</script>'}</p>