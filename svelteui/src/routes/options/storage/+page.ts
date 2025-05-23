import { XbvrApiClient } from "$lib/api/xbvr-api-client"

export const load = async ({ fetch }) => {
    const api = new XbvrApiClient(fetch)
    const storageOptions = await api.getStorageOptions()
    return { storageOptions }
}