<script lang="ts">
	import '../app.css';
	import { base } from '$app/paths';
	import Lightswitch from '$lib/components/layout/lightswitch.svelte'
	import ThemeSwitcher from '$lib/components/layout/theme-switcher/theme-switcher.svelte'
	
	let { children } = $props();
</script>
<div class="grid grid-rows-[auto_1fr]">
	<header class="sticky top-0 z-50 border-b border-primary-500 bg-surface-50-950/75 backdrop-blur-lg w-full h-[70px] flex items-center justify-between gap-2 px-4">
		<div class="flex items-center justify-center gap-2">
			<span class="text-2xl text-primary-500">XBVR</span>
			<a class="btn hover:preset-tonal" href={`${base}/scene`}>Scenes</a>
			<a class="btn hover:preset-tonal" href={`${base}/actor`}>Actors</a>
			<a class="btn hover:preset-tonal" href={`${base}/file`}>Files</a>
			<a class="btn hover:preset-tonal" href={`${base}/options`}>Options</a>
		</div>
		<div class="flex items-center justify-center gap-2">
			<div class="max-w-auto">
				<ThemeSwitcher />
			</div>
			<Lightswitch />
		</div>
	</header>
	{@render children()}
</div>