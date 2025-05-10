<script lang="ts">
    const themes = [
        'catppuccin', 'cerberus', 'concord', 'crimson', 'fennec', 'hamlindigo',
        'legacy', 'mint', 'modern', 'mona', 'nosh', 'nouveau', 'pine', 'reign',
        'rocket', 'rose', 'sahara', 'seafoam', 'terminus', 'vintage', 'vox', 'wintry'
    ] as const
    type ThemeName = typeof themes[number]
    function isThemeName(name: string): name is ThemeName {
        return themes.includes(name as any)
    }

    let selected: ThemeName = $state('cerberus')

    $effect(() => {
        const value = localStorage.getItem('theme') || 'cerberus';
        if (isThemeName(value)) {
            document.documentElement.setAttribute('data-theme', value);
            selected = value
        }
    });

    function onchange(e: Event & {
        currentTarget: EventTarget & HTMLSelectElement;
    }) {
        const value = e.currentTarget.value
        if (isThemeName(value)) {
            document.documentElement.setAttribute('data-theme', value);
            localStorage.setItem('theme', value);
            selected = value
        }
    }

</script>

<svelte:head>
  <script>
    const theme = localStorage.getItem('theme') || 'cerberus';
    document.documentElement.setAttribute('data-theme', mode);
  </script>
</svelte:head>

<select class="select" value={selected} {onchange}>
 {#each themes as theme }
    <option value={theme} class="capitalize">{theme}</option>
 {/each}
</select>