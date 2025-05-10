<script lang="ts">
    let { data } = $props()
</script>
<h1>Svelte Test</h1>
<pre class="pre">{JSON.stringify(data, null, 2)}</pre>