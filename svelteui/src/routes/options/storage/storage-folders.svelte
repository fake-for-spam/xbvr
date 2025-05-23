<script lang="ts">
  import type { Volume } from "$lib/api/model/volume";
  import { XbvrApiClient } from "$lib/api/xbvr-api-client";
  import { Check, CircleX, Cloud, Folder, FolderSync, X } from "lucide-svelte";
  import { parseAbsoluteToLocal, DateFormatter } from "@internationalized/date"
  import { invalidateAll } from "$app/navigation";

    interface Props {
        volumes?: Volume[],
        api?: XbvrApiClient
    }
    let { volumes = [], api = new XbvrApiClient() }: Props = $props();

    function datetimeFormat(datetime: string): string {
        const dt = parseAbsoluteToLocal(datetime);
        if (dt.year === 1) {
            return "never";
        }
        const formatter = new DateFormatter("en-US", {
            dateStyle: "short",
            timeStyle: "short",
        });
        return formatter.format(dt.toDate());
    }

    async function rescanFolder(id: number) {
        await api.rescanFolder(id);
        invalidateAll();
    }
    async function removeFolder(id: number) {
        await api.removeFolder(id);
        invalidateAll();
    }
</script>
<div class="flex justify-between">
    <h4 class="h4">Storage</h4>
    <button type="button" class="btn preset-filled-primary-500" onclick={()=>{api.rescanAllFolders()}}>
        Rescan all folders
    </button>
</div>
{#if volumes.length > 0}
    <div class="table-wrap">
        <table class="table">
            <thead>
                <tr>
                    <th>Path</th>
                    <th>Type</th>
                    <th>Avail</th>
                    <th># of files</th>
                    <th>Not matched</th>
                    <th>Total size</th>
                    <th>Last scan</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {#each volumes as volume}
                    <tr>
                        <td>{volume.path}</td>
                        <td>
                            {#if volume.type === "local"}
                                <Folder size={16} />
                            {:else if volume.type === "cloud"}
                                <Cloud size={16} />
                            {/if}
                        </td>
                        <td>
                            {#if volume.is_available}
                                <Check size={16} />
                            {:else}
                                <X size={16} />
                            {/if}
                        </td>
                        <td>{volume.file_count}</td>
                        <td>{volume.unmatched_count}</td>
                        <td>{volume.total_size} B</td>
                        <td>{datetimeFormat(volume.last_scan)}</td>
                        <td>
                            <div class="flex gap-2 items-center">
                                <button type="button" class="btn btn-icon preset-outlined" 
                                    onclick={()=>{rescanFolder(volume.id)}}>
                                    <FolderSync />
                                </button>
                                <button type="button" class="btn btn-icon text-error-500 preset-outlined-error-500" 
                                    onclick={()=>{removeFolder(volume.id)}}>
                                    <CircleX />
                                </button>
                            </div>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
{:else}
<div class="flex flex-col items-center gap-2 p-15">
    <Folder size={40} />
    <span class="text-2xl">Add folders with VR videos</span>
</div>
{/if}