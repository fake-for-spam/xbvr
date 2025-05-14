import { z } from "zod";

export const addLocalFolderSchema = z.object({
    type: z.literal('local'),
    path: z.string().min(1, 'Path is required'),
});
export const addRemoteFolderSchema = z.object({
    type: z.literal('putio'),
    token: z.string().min(1, 'Token is required'),
});
export const addFolderSchema = z.discriminatedUnion('type', [
    addLocalFolderSchema,
    addRemoteFolderSchema,
]);
export type AddFolder = z.infer<typeof addFolderSchema>;