import { previewConfig, type PreviewConfig } from "./options/previews";
import { stateResponseSchema } from "./options/state";
import { type AddFolder, addFolderSchema } from "./schema";

export class XbvrApiClient {
    constructor(protected fetch: typeof globalThis.fetch = globalThis.fetch) {}

    async getState() {
        const response = await this.fetch('/api/options/state');
        if (!response.ok) {
            throw new Error(`Failed to fetch state: ${response.statusText}`);
        }
        const json = await response.json();
        return stateResponseSchema.parse(json);
    }

    async getPreviewConfig(): Promise<PreviewConfig> {
        const state = await this.getState();
        return previewConfig.parse(state.config.library.preview);
    }

    setPreviewConfig(config: PreviewConfig) {
        const data = previewConfig.parse(config)
        return this.fetch('/api/options/previews', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }

    testPreviewConfig(config: PreviewConfig) {
        const data = previewConfig.parse(config)
        return this.fetch('/api/options/previews/test', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }

    startGeneratingPreviews() {
        return this.fetch('/api/task/preview/generate')
    }

    addStorageFolder(form: AddFolder) {
        const data = addFolderSchema.parse(form)
        return this.fetch('/api/options/storage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }
}

export abstract class XbvrApiModule {
    constructor(protected client: XbvrApiClient, protected basePath: string) {}
}