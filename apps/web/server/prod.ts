import { createRequestHandler } from "@remix-run/express";
import type { ServerBuild } from "@remix-run/node";
import express from "express";
import { randomBytes } from "node:crypto";

//import "./instrumentation";
//
//import * as build from "../build/server";
//import type { ServerBuild } from "@remix-run/node";
import { z } from "zod";
//import { randomBytes } from "node:crypto";

const MODE = z.string().parse(process.env.NODE_ENV);

const IS_PROD = MODE === "production";

const app = express();

// Is prod
require("./instrumentation");
app.use(
  "/assets",
  express.static("build/client/assets", { immutable: true, maxAge: "1y" }),
);
//
// Everything else (like favicon.ico) is cached for an hour. You may want to be
// more aggressive with this caching.
app.use(express.static("build/client", { maxAge: "1h" }));

app.use((_, res, next) => {
  res.locals.cspNonce = randomBytes(16).toString("hex");
  next();
});

function getLoadContext() {
  return {
    cspNonce: randomBytes(16).toString("hex"),
    serverBuild: getBuild(),
  };
}

async function getBuild() {
  try {
    const build = await import("../build/server/index.js");

    return { build: build as unknown as ServerBuild, error: null };
  } catch (error) {
    // Catch error and return null to make express happy and avoid an unrecoverable crash
    console.error("Error creating build:", error);
    return { error: error, build: null as unknown as ServerBuild };
  }
}

const remixHandler = createRequestHandler({
  mode: MODE,
  build: async () => {
    const { error, build } = await getBuild();
    // gracefully "catch" the error
    if (error) {
      throw error;
    }
    return build;
  },
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  getLoadContext: (_: any, res: any) => ({
    cspNonce: res.locals.cspNonce,
    serverBuild: getBuild(),
  }),
});

//handle SSR requests
app.all("*", remixHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`mode: ${process.env.NODE_ENV}`);
  console.log(`Express server listening at http://localhost:${port}`);
});
