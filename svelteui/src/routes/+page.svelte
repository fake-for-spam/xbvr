<script lang="ts">
    let { data } = $props()
    let { state } = data
</script>
<pre class="pre">{JSON.stringify(data.state, null, 2)}</pre>