<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import { XbvrApiClient } from "$lib/api/xbvr-api-client";

    let path = $state('');
    let api = new XbvrApiClient();
    let error: string | null = $state(null);
    async function addNewFolder() {
        const response = await api.addStorageFolder({type: 'local', path})
        if (response.ok) {
            path = '';
            error = null;
            invalidateAll();
        } else {
            error = await response.text();
        }
    }
</script>
<div class="flex flex-col gap-2">
    <label class="label">
    <span class="label-text">Path to folder with content</span>
    <input type="text" class="input" bind:value={path}/>
    </label>
    <button type="button" class="btn preset-filled-primary-500" onclick={addNewFolder}>
        Add new folder
    </button>
    {#if error}
        <div class="p-4 card preset-outlined-error-500">
            <span>{error}</span>
        </div>
    {/if}
</div>