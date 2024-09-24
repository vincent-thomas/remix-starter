import { env } from "@backend/env";
import { PostHog } from "posthog-node";

export const posthogSdk = new PostHog(env.CLIENT_POSTHOG_KEY, {
  host: "https://eu.i.posthog.com",
});
