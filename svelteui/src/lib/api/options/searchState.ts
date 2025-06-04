import { z } from "zod";

export const searchState = z.object({
    documentCount: z.number(),
    inProgress: z.boolean(),
});
export type SearchState = z.infer<typeof searchState>;