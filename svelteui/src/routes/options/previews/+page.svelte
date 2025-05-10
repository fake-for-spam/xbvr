<script lang="ts">
    import { XbvrApiClient } from "$lib/api/xbvr-api-client";
    import PreviewForm from "./preview-form.svelte";
    let { data } = $props();
    let api = new XbvrApiClient();
    let previewConfig = $state(data.state.config.library.preview)

    async function generatePreviews() {
        const apiResponse = await api.startGeneratingPreviews();
        if (!apiResponse.ok) {
            console.error("Failed to start generating previews", await apiResponse.text());
        }
    }
</script>
<div class="flex flex-col gap-4">
    <h3 class="h3">Previews</h3>
    <hr class="hr" />
    <PreviewForm {api} form={previewConfig} />
    <hr class="hr" />
    <p>
        Once you picked preview settings, you should start generating them.
    </p>
    <p>
        BETA NOTE: Please note this is CPU-heavy process and once started, 
        it can only be stopped by closing the app.
    </p>
    <button class="btn preset-filled-primary-500" onclick={generatePreviews}>Start generating previews</button>
</div>