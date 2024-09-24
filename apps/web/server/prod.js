import { createRequestHandler } from "@remix-run/express";
import express from "express";

import "./instrumentation.js";

const remixHandler = createRequestHandler({
  build: await import("../build/server/index.js"),
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
