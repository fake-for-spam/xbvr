import { XbvrApiClient } from "$lib/api/xbvr-api-client";
import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
    const api = new XbvrApiClient(fetch)
    const state = await api.getState()
    const { cacheSize } = state.currentState
    const searchState = await api.getSearchState()
    return { cacheSize, searchState }
};