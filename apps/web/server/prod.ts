import { createRequestHandler } from "@remix-run/express";
import type { ServerBuild } from "@remix-run/node";
import express from "express";
import { randomBytes } from "node:crypto";

import "./instrumentation";

import * as serverBuild from "../build/server";
import { z } from "zod";
import { helmetMiddleware } from "./shared";

const MODE = z.string().parse(process.env.NODE_ENV);

const app = express();

app.use(
  "/assets",
  express.static("build/client/assets", { immutable: true, maxAge: "1y" }),
);
// Everything else (like favicon.ico) is cached for an hour. You may want to be
// more aggressive with this caching.
app.use(express.static("build/client", { maxAge: "1h" }));

app.use((_, res, next) => {
  res.locals.cspNonce = randomBytes(16).toString("hex");
  next();
});
app.use(helmetMiddleware(MODE));
//
//function getLoadContext() {
//  return {
//    cspNonce: randomBytes(16).toString("hex"),
//    serverBuild: serverBuild as any as ServerBuild,
//  };
//}
//
//

const remixHandler = createRequestHandler({
  mode: MODE,
  build: serverBuild as any as ServerBuild,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  getLoadContext: async (_: any, res: any) => ({
    cspNonce: res.locals.cspNonce,
    serverBuild: serverBuild,
  }),
});

//handle SSR requests
app.all("*", remixHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`mode: ${process.env.NODE_ENV}`);
  console.log(`Express server listening at http://localhost:${port}`);
});
