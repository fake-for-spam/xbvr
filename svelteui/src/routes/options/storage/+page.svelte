<script lang="ts">
  import AddCloudStorage from "./add-cloud-storage.svelte";
  import AddLocalFolderForm from "./add-local-folder-form.svelte";
  import StorageFolders from "./storage-folders.svelte";
  import StorageOptionsForm from "./storage-options-form.svelte";

  let { data } = $props();
  let { storageOptions } = $derived(data);
    
</script>
<StorageFolders volumes={storageOptions.volumes} />
<hr class="hr" />
<div class="grid grid-cols-2 gap-4">
    <div>
        <h4 class="h4">Add local folder</h4>
        <AddLocalFolderForm />
    </div>
    <div>
        <h4 class="h4">Add cloud storage</h4>
        <AddCloudStorage />
    </div>
</div>
<hr class="hr" />
<div>
    <h4 class="h4">Options</h4>
    <StorageOptionsForm form={storageOptions} />
</div>