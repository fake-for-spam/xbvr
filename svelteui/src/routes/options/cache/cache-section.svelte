<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        title: string;
        description: string;
        size: string;
        buttonSection: Snippet
    }
    let { title, description, size, buttonSection }: Props = $props();
</script>
<div class="grid grid-cols-4 gap-2">
    <div class="col-span-2 text-xl">
        {title}
    </div>
    <div>
        {size}
    </div>
    <div class="flex items-center justify-end gap-2">
        {@render buttonSection()}
    </div>
    <div class="col-span-2">
        {description}
    </div>
</div>