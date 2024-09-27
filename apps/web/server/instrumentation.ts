import * as Sentry from "@sentry/remix";

import { env } from "../app/.server/env";

Sentry.init({
  dsn: env.CLIENT_SENTRY_KEY,
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for tracing.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,

  // To use Sentry OpenTelemetry auto-instrumentation
  // default: false
  autoInstrumentRemix: true,

  enabled: env.NODE_ENV === "production",
});
