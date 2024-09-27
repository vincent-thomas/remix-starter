import { createRequestHandler } from "@remix-run/express";
import express from "express";

import "./instrumentation";

import * as build from "../build/server/index.js";
import type { ServerBuild } from "@remix-run/node";

const remixHandler = createRequestHandler({
  build: build as unknown as ServerBuild,
});

const app = express();

app.disable("x-powered-by");

// Vite fingerprints its assets so we can cache forever.
app.use(
  "/assets",
  express.static("build/client/assets", { immutable: true, maxAge: "1y" }),
);

app.use(express.static("build/client", { maxAge: "1h" }));

// handle SSR requests
app.all("*", remixHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`mode: ${process.env.NODE_ENV}`);
  console.log(`Express server listening at http://localhost:${port}`);
});
