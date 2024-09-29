import { createRequestHandler } from "@remix-run/express";
import type { ServerBuild } from "@remix-run/node";
import express from "express";
import { randomBytes } from "node:crypto";

import "./instrumentation";

import { z } from "zod";
import { helmetMiddleware } from "./shared";

const MODE = z.string().parse(process.env.NODE_ENV);

const app = express();

const viteDevServer = await import("vite").then((vite) =>
  vite.createServer({
    server: { middlewareMode: true },
  }),
);

// Is prod
app.use(viteDevServer.middlewares);

app.use((_, res, next) => {
  res.locals.cspNonce = randomBytes(16).toString("hex");
  next();
});

async function getBuild() {
  try {
    const build = await viteDevServer.ssrLoadModule(
      "virtual:remix/server-build",
    );

    return { build: build as unknown as ServerBuild, error: null };
  } catch (error) {
    // Catch error and return null to make express happy and avoid an unrecoverable crash
    console.error("Error creating build:", error);
    return { error: error, build: null as unknown as ServerBuild };
  }
}

app.use(helmetMiddleware(MODE));

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
