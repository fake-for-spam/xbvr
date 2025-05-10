<script lang="ts">
  import { invalidateAll } from "$app/navigation";
    import { previewConfig, type PreviewConfig } from "$lib/api/options/previews";
    import { XbvrApiClient } from "$lib/api/xbvr-api-client";
    interface Props {
        form?: PreviewConfig,
        api?: XbvrApiClient
    }
    let { 
        form = $bindable({
            startTime: 10,
            snippetLength: 0.4,
            snippetAmount: 20,
            resolution: 400,
            extraSnippet: false
        }),
        api = new XbvrApiClient(),
    }: Props = $props()
    const formSchema = previewConfig.extend({
        startTime: previewConfig.shape.startTime.gte(5).lte(60).step(5),
        snippetLength: previewConfig.shape.snippetLength.gte(0.2).lte(5).step(.2),
        snippetAmount: previewConfig.shape.snippetAmount.gte(2).lte(40).step(1),
        resolution: previewConfig.shape.resolution.gte(300).lte(800).step(20),
        extraSnippet: previewConfig.shape.extraSnippet
    })
    let error: string | null = $state(null)
    async function saveSettings() {
        const result = formSchema.safeParse(form)
        if (result.success) {
            const apiResponse = await api.setPreviewConfig(result.data)
            if (apiResponse.ok) {
                error = null
                await invalidateAll()
            } else {
                error = await apiResponse.text()
            }
        } else {
            error = result.error.issues.map(issue => issue.message).join(", ")
        }
    }
    async function testSettings() {
        const result = formSchema.safeParse(form)
        if (result.success) {
            const apiResponse = await api.testPreviewConfig(result.data)
            if (apiResponse.ok) {
                error = null
                await invalidateAll()
            } else {
                error = await apiResponse.text()
            }
        } else {
            error = result.error.issues.map(issue => issue.message).join(", ")
        }
    }
</script>
<div class="flex flex-col gap-4">
    {#if error}
        <div class="p-4 card preset-outlined-error-500">
            <span>{error}</span>
        </div>
    {/if}
    <label class="label">
        <span class="label-text">Start Time</span>
        <div class="grid grid-cols-2 gap-2">
            <input class="input" type="range" bind:value={form.startTime} min={formSchema.shape.startTime.minValue} max={formSchema.shape.startTime.maxValue} step="5" />
            <span>{form.startTime} seconds</span>
        </div>
    </label>
    <label class="label">
        <span class="label-text">Snippet Length</span>
        <div class="grid grid-cols-2 gap-2">
            <input class="input" type="range" bind:value={form.snippetLength} min={formSchema.shape.snippetLength.minValue} max={formSchema.shape.snippetLength.maxValue} step=".2" />
            <span>{form.snippetLength} seconds</span>
        </div>
    </label>
    <label class="label">
        <span class="label-text">Number of Snippets</span>
        <div class="grid grid-cols-2 gap-2">
            <input class="input" type="range" bind:value={form.snippetAmount} min={formSchema.shape.snippetAmount.minValue} max={formSchema.shape.snippetAmount.maxValue} step="1" />
            <span>{form.snippetAmount}</span>
        </div>
    </label>
    <label class="flex items-center space-x-2">
        <input class="checkbox" type="checkbox" bind:checked={form.extraSnippet} />
        <p>Grab extra snippet from the end of video</p>
    </label>
    <label class="label">
        <span class="label-text">Preview Resolution</span>
        <div class="grid grid-cols-2 gap-2">
            <input class="input" type="range" bind:value={form.resolution} min={formSchema.shape.resolution.minValue} max={formSchema.shape.resolution.maxValue} step="20" />
            <span>{form.resolution} px</span>
        </div>
    </label>
    <div class="flex gap-4">
        <button class="btn preset-filled-primary-500" onclick={saveSettings}>Save settings</button>
        <button class="btn preset-filled" onclick={testSettings}>Test settings</button>
    </div>
</div>