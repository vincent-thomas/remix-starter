import { z } from "zod";

export const sharedEnvs = {
  CLIENT_POSTHOG_KEY: z.string(),
  CLIENT_STRIPE_KEY: z.string(),
};
