import { z } from "zod";

export const sharedEnvs = {
  CLIENT_POSTHOG_KEY: z.string(),
};
