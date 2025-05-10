<script lang="ts">
	import '../app.css';
	import Lightswitch from '../lib/components/lightswitch.svelte'
	import ThemeSwitcher from '../lib/components/theme-switcher/theme-switcher.svelte'
	
	let { children } = $props();
</script>
<Lightswitch />
<ThemeSwitcher />
{@render children()}
