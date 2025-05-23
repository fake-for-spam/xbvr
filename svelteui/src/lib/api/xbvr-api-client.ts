import { previewConfig, type PreviewConfig } from "./options/previews";
import { stateResponseSchema } from "./options/state";
import { getStorageResponse } from "./options/storage";
import { type AddFolder, addFolderSchema, type StorageOptions, storageOptionsSchema } from "./schema";

export class XbvrApiClient {
    constructor(protected fetch: typeof globalThis.fetch = globalThis.fetch) {}

    private async request(method: 'GET' | 'POST' | 'PUT' | 'DELETE', 
        url: string, body?: any) {
        const options: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
        };
        if (body) {
            options.body = JSON.stringify(body);
        }
        const response = await this.fetch(url, options);
        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        const contentType = response.headers.get('Content-Type')
        if (contentType === 'application/json') {
            const data = await response.json();
            return data;
        }
        const text = await response.text();
        return text;
    }
    private async get(url: string) {
        return this.request('GET', url);
    }
    private async post(url: string, body: any) {
        return this.request('POST', url, body);
    }
    private async put(url: string, body: any) {
        return this.request('PUT', url, body);
    }
    private async delete(url: string) {
        return this.request('DELETE', url);
    }
    async getState() {
        const response = await this.get('/api/options/state');
        return stateResponseSchema.parse(response);
    }

    async getPreviewConfig(): Promise<PreviewConfig> {
        const state = await this.getState();
        return previewConfig.parse(state.config.library.preview);
    }

    setPreviewConfig(config: PreviewConfig) {
        const data = previewConfig.parse(config)
        return this.put('/api/options/previews', data)
    }

    testPreviewConfig(config: PreviewConfig) {
        const data = previewConfig.parse(config)
        return this.post('/api/options/previews/test', data)
    }

    startGeneratingPreviews() {
        return this.get('/api/task/preview/generate')
    }

    addStorageFolder(form: AddFolder) {
        const data = addFolderSchema.parse(form)
        return this.post('/api/options/storage', data)
    }

    saveStorageOptions(options: StorageOptions) {
        const data = storageOptionsSchema.parse(options)
        return this.put('/api/options/storage', data)
    }

    async getStorageOptions() {
        const data = await this.get('/api/options/storage');
        return getStorageResponse.parse(data);
    }

    rescanAllFolders() {
        return this.get('/api/task/rescan');
    }
    rescanFolder(id: number | string) {
        return this.get(`/api/task/rescan/${id}`);
    }
    removeFolder(id: number | string) {
        return this.delete(`/api/options/storage/${id}`);
    }
}

export abstract class XbvrApiModule {
    constructor(protected client: XbvrApiClient, protected basePath: string) {}
}