import { z } from "zod";

export const previewConfig = z.object({
    startTime: z.number(),
    snippetLength: z.number(),
    snippetAmount: z.number(),
    resolution: z.number(),
    extraSnippet: z.boolean()
});
export type PreviewConfig = z.infer<typeof previewConfig>;
