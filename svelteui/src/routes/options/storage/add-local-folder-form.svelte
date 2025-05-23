<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import { XbvrApiClient } from "$lib/api/xbvr-api-client";

    let path = $state('');
    let api = new XbvrApiClient();
    async function addNewFolder() {
        await api.addStorageFolder({type: 'local', path})
        path = '';
        invalidateAll();
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
</div>