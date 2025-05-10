<script lang="ts">
    let { children } = $props();

    type MenuItem = {
        section: string;
        items: {
            name: string;
            href: string;
        }[];
    }
    const menuItems: MenuItem[] = [
        {
            section: 'Options',
            items: [
                { name: 'Storage', href: 'storage' },
                { name: 'Previews', href: 'previews' },
                { name: 'Cache', href: 'cache' },
                { name: 'Task Schedule', href: 'task-schedule' }
            ]
        },
        {
            section: 'Scene Data',
            items: [
                { name: 'Scrapers', href: 'scrapers' },
                { name: 'Create/Import Scene', href: 'create-scene' },
                { name: 'Funscripts', href: 'funscripts' },
                { name: 'Data Import/Export', href: 'data-loading' }
            ]
        },
        {
            section: 'Interfaces',
            items: [
                { name: 'Players', href: 'players' },
                { name: 'DLNA', href: 'dlna' },
                { name: 'Web UI', href: 'web-ui' },
                { name: 'Advanced', href: 'advanced' }
            ]
        },

    ];
</script>
<div class="grid grid-cols-[auto_1fr] h-full">
    <aside class="sticky top-[70px] h-[calc(100vh-70px)] overflow-y-auto p-4 border-r border-primary-500">
        <nav class="space-y-2">
        {#each menuItems as { section, items }}
            <p class="text-lg font-bold">{section}</p>
            <ul class="space-y-2">
                {#each items as { name, href }}
                    <li>
                        <a class="anchor" {href}>{name}</a>
                    </li>
                {/each}
            </ul>
        {/each}
        </nav>
    </aside>
    <main class="overflow-auto p-4">
        {@render children()}
    </main>
</div>