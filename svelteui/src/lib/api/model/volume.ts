import { z } from "zod";

export const volumeSchema = z.object({
    id: z.number(),
    type: z.string(),
    path: z.string(),
    metadata: z.string(),
    last_scan: z.string().datetime(),
    is_available: z.boolean(),
})
export type Volume = z.infer<typeof volumeSchema>