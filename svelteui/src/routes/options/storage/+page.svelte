<script lang="ts">
  import AddCloudStorage from "./add-cloud-storage.svelte";
  import AddLocalFolderForm from "./add-local-folder-form.svelte";

    
</script>
<h3 class="h3">Storage</h3>
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