import { XbvrApiClient } from "$lib/api/xbvr-api-client";

export const ssr = false;
export const load = async ({ fetch }) => {
    const apiClient = new XbvrApiClient(fetch)
    return {
        state: await apiClient.getState()
    }
};