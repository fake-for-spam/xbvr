export const load = async ({ fetch }) => {
    try {
        const r = await fetch('/api/options/state')
        const options = await r.json()
        return options
    } catch(e: unknown) {
        return {}
    }
};