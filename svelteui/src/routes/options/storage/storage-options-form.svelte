<script lang="ts">
    import type { StorageConfig } from "$lib/api/options/storage";
    import { XbvrApiClient } from "$lib/api/xbvr-api-client";
    import { Switch } from "@skeletonlabs/skeleton-svelte";
    
    interface Props {
        form?: StorageConfig,
        api?: XbvrApiClient
    }
    let { 
        form = { match_ohash: false },
        api = new XbvrApiClient(),
    }: Props = $props()

    let match_ohash = $state(form.match_ohash);

    async function updateStorageOptions() {
        await api.saveStorageOptions({match_ohash});
    }
</script>
<div class="flex flex-col gap-2">
    <label class="flex flex-row gap-2">
        <Switch checked={match_ohash} onCheckedChange={(e) => {
            match_ohash = e.checked
        }} />
        <span>Match Stash DB Hashes</span>
    </label>
    <button type="button" class="btn preset-filled-primary-500" onclick={updateStorageOptions}>
        Save options
    </button>
</div>