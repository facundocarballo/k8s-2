import { z } from "zod";

export const K8S1GetUserResponseSchema = z.object({
    username: z.string(),
    password: z.string(),
    id: z.string()
});