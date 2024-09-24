/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { envClient } from "@client/env";
import { RemixBrowser } from "@remix-run/react";
import posthog from "posthog-js";
import { startTransition, StrictMode, useEffect } from "react";
import { hydrateRoot } from "react-dom/client";

function PosthogInit() {
  useEffect(() => {
    posthog.init(envClient.CLIENT_POSTHOG_KEY, {
      api_host: "https://eu.i.posthog.com",
      person_profiles: "identified_only",
    });
  }, []);

  return null;
}

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <RemixBrowser />
      <PosthogInit />
    </StrictMode>,
  );
});
