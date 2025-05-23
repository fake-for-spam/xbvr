<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import { XbvrApiClient } from "$lib/api/xbvr-api-client";

    let token = $state('');
    let api = new XbvrApiClient();
    let error: string | null = $state(null);
    async function addNewFolder() {
        await api.addStorageFolder({type: 'putio', token})
        token = '';
        error = null;
        invalidateAll();
    }
</script>
<div class="flex flex-col gap-2">
    <label class="label">
    <span class="label-text">Add cloud storage</span>
    <input type="text" class="input" bind:value={token}/>
    </label>
    <button type="button" class="btn preset-filled-primary-500" onclick={addNewFolder}>
        Add service
    </button>
</div>