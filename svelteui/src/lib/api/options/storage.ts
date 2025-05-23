import { z } from "zod";
import { volumeSchema } from "../model/volume";

export const storageConfig = z.object({
    match_ohash: z.boolean(),
});
export type StorageConfig = z.infer<typeof storageConfig>;

export const getStorageResponse = z.object({
    volumes: volumeSchema.array(),
    match_ohash: z.boolean(),
});
export type GetStorageResponse = z.infer<typeof getStorageResponse>;