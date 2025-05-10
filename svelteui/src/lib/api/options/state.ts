import { z } from "zod";
import { previewConfig } from "./previews";

const currentState = z.object({
    server: z.object({
        bound_ip: z.array(z.string())
    }),
    web: z.object({
        tagSort: z.string(),
        sceneHidden: z.boolean(),
        sceneWatchlist: z.boolean(),
        sceneFavourite: z.boolean(),
        sceneWishlist: z.boolean(),
        sceneWatched: z.boolean(),
        sceneEdit: z.boolean(),
        sceneDuration: z.boolean(),
        sceneCuepoint: z.boolean(),
        showHspFile: z.boolean(),
        showSubtitlesFile: z.boolean(),
        sceneTrailerlist: z.boolean(),
        showScriptHeatmap: z.boolean(),
        showAllHeatmaps: z.boolean(),
        showOpenInNewWindow: z.boolean(),
        updateCheck: z.boolean(),
        isAvailOpacity: z.number()
    }),
    dlna: z.object({
        running: z.boolean(),
        images: z.array(z.string()),
        recentIp: z.array(z.string())
    }),
    cacheSize: z.object({
        images: z.number(),
        previews: z.number(),
        searchIndex: z.number()
    })
})
const serverConfig = z.object({
    bindAddress: z.string(),
    port: z.number()
})
const securityConfig = z.object({
    username: z.string(),
    password: z.string()
})
const webConfig = z.object({
    tagSort: z.string(),
    sceneHidden: z.boolean(),
    sceneWatchlist: z.boolean(),
    sceneFavourite: z.boolean(),
    sceneWishlist: z.boolean(),
    sceneWatched: z.boolean(),
    sceneEdit: z.boolean(),
    sceneDuration: z.boolean(),
    sceneCuepoint: z.boolean(),
    showHspFile: z.boolean(),
    showSubtitlesFile: z.boolean(),
    sceneTrailerlist: z.boolean(),
    showScriptHeatmap: z.boolean(),
    showAllHeatmaps: z.boolean(),
    showOpenInNewWindow: z.boolean(),
    updateCheck: z.boolean(),
    isAvailOpacity: z.number()
})
const advancedConfig = z.object({
    showInternalSceneId: z.boolean(),
    showHSPApiLink: z.boolean(),
    showSceneSearchField: z.boolean(),
    stashApiKey: z.string(),
    scrapeActorAfterScene: z.boolean(),
    useImperialEntry: z.boolean(),
    progressTimeInterval: z.number(),
    linkScenesAfterSceneScraping: z.boolean(),
    useAltSrcInFileMatching: z.boolean(),
    useAltSrcInScriptFilters: z.boolean(),
    ignoreReleasedBefore: z.string().datetime()
})
const funscriptsConfig = z.object({
    scrapeFunscripts: z.boolean()
})
const vendorConfig = z.object({
    tpdb: z.object({
        apiToken: z.string()
    })
})
const dlnaConfig = z.object({
    enabled: z.boolean(),
    serviceName: z.string(),
    serviceImage: z.string(),
    allowedIp: z.array(z.string())
})
const deovrConfig = z.object({
    enabled: z.boolean(),
    auth_enabled: z.boolean(),
    render_heatmaps: z.boolean(),
    track_watch_time: z.boolean(),
    remote_enabled: z.boolean(),
    username: z.string(),
    password: z.string()
})
const heresphereConfig = z.object({
    allow_file_deletes: z.boolean(),
    allow_rating_updates: z.boolean(),
    allow_favorite_updates: z.boolean(),
    allow_hsp_data: z.boolean(),
    allow_tag_updates: z.boolean(),
    allow_cuepoint_updates: z.boolean(),
    allow_watchlist_updates: z.boolean(),
    multitrack_cuepoints: z.boolean(),
    multitrack_cast_cuepoints: z.boolean(),
    retain_non_hsp_cuepoints: z.boolean()
})
const playersConfig = z.object({
    video_sort_seq: z.string(),
    script_sort_seq: z.string(),
    subtitle_sort_seq: z.string()
})
const interfacesConfig = z.object({
    dlna: dlnaConfig,
    deovr: deovrConfig,
    heresphere: heresphereConfig,
    players: playersConfig
})
const libraryConfig = z.object({
    preview: previewConfig.extend({
        enabled: z.boolean()
    })
})
const cronJobConfig = z.object({
    enabled: z.boolean(),
    hourInterval: z.number(),
    useRange: z.boolean(),
    minuteStart: z.number(),
    hourStart: z.number(),
    hourEnd: z.number(),
    runAtStartDelay: z.number()
})
const cronConfig = z.object({
    rescrapeSchedule: cronJobConfig,
    rescanSchedule: cronJobConfig,
    previewSchedule: cronJobConfig,
    actorRescrapeSchedule: cronJobConfig,
    stashdbRescrapeSchedule: cronJobConfig,
    linkScenesSchedule: cronJobConfig
})
const storageConfig = z.object({
    match_ohash: z.boolean()
})
const scraperSettingsConfig = z.object({
    tmwvrnet: z.object({
        tmwMembersDomain: z.string()
    }),
    javr: z.object({
        javrScraper: z.string()
    })
})
const config = z.object({
    server: serverConfig.describe("Server configuration"),
    security: securityConfig,
    web: webConfig,
    advanced: advancedConfig,
    funscripts: funscriptsConfig,
    vendor: vendorConfig,
    interfaces: interfacesConfig,
    library: libraryConfig,
    cron: cronConfig,
    storage: storageConfig,
    scraper_settings: scraperSettingsConfig
})
const scraper = z.object({
    id: z.string(),
    name: z.string(),
    avaatarurl: z.string(),
    domain: z.string(),
    master_site_id: z.string()
})
export const stateResponseSchema = z.object({
    currentState,
    config,
    scrapers: z.array(scraper)
})
export type StateResponse = z.infer<typeof stateResponseSchema>