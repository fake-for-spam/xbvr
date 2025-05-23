import { z } from "zod";

export const volumeSchema = z.object({
    id: z.number(),
    type: z.string(),
    path: z.string(),
    metadata: z.string(),
    last_scan: z.string().datetime(),
    is_available: z.boolean(),
    file_count: z.number(),
    unmatched_count: z.number(),
    total_size: z.number(),
})
export type Volume = z.infer<typeof volumeSchema>