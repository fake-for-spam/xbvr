<script lang="ts">
    import prettyBytes from 'pretty-bytes';
    import CacheSection from "./cache-section.svelte";
  import { XbvrApiClient } from '$lib/api/xbvr-api-client';
  import { invalidateAll } from '$app/navigation';

    let { data } = $props();
    let { cacheSize, searchState } = $derived(data);

    const api = new XbvrApiClient();

    async function resetCache(type: 'images' | 'previews' | 'searchIndex') {
        await api.resetCache(type)
        await invalidateAll();
    }
    async function rescanSearchIndex() {
        await api.rescanSearchIndex();
        await invalidateAll();
    }
    async function refreshScenes() {
        await api.refreshScenes();
        await invalidateAll();
    }
</script>
<h3 class="h3">Cache</h3>
<hr class="hr mt-4 mb-4" />
<div class="flex flex-col gap-4">
    <CacheSection
        title="Images"
        description="Cache of remote images that were requested at least once."
        size={prettyBytes(cacheSize.images)}
        >
        {#snippet buttonSection()}
            <button class="btn preset-outlined" onclick={()=>resetCache('images')}>Reset</button>
        {/snippet}
    </CacheSection>
    <hr class="hr" />
    <CacheSection
        title="Video previews"
        description="Generated on demand for local files. Remove when you want to generate previews using new settings."
        size={prettyBytes(cacheSize.previews)}
        >
        {#snippet buttonSection()}
            <button class="btn preset-outlined" onclick={()=>resetCache('previews')}>Reset</button>
        {/snippet}
    </CacheSection>
    <hr class="hr" />
    <CacheSection
        title={`Search index - ${searchState.documentCount} scenes indexed`}
        description="Remove search index when facing issues with finding/matching files."
        size={prettyBytes(cacheSize.searchIndex)}
        >
        {#snippet buttonSection()}
            <button class="btn preset-outlined" onclick={()=>resetCache('searchIndex')}>Reset</button>
            <button class="btn preset-outlined" onclick={rescanSearchIndex}>Rescan</button>
        {/snippet}
    </CacheSection>
    <hr class="hr" />
    <CacheSection
        title="Scene status"
        description='Refresh scene status when scenes are not marked "available" or "scripted" despite having such files assigned.'
        size=""
        >
        {#snippet buttonSection()}
            <button class="btn preset-outlined" onclick={refreshScenes}>Refresh scenes</button>
        {/snippet}
    </CacheSection>
</div>