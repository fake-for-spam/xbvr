<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import { XbvrApiClient } from "$lib/api/xbvr-api-client";

    let token = $state('');
    let api = new XbvrApiClient();
    let error: string | null = $state(null);
    async function addNewFolder() {
        const response = await api.addStorageFolder({type: 'putio', token})
        if (response.ok) {
            token = '';
            error = null;
            invalidateAll();
        } else {
            error = await response.text();
        }
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
    {#if error}
        <div class="p-4 card preset-outlined-error-500">
            <span>{error}</span>
        </div>
    {/if}
</div>