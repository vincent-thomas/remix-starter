import {
  json,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import "./root.css";
import { z } from "zod";
import { sharedEnvs } from "./shared/shared-env";
import { cn } from "@starter/components";
import { themeClass } from "@starter/components/theme";
import { rootClassname } from "./root.css";
import { Providers } from "./providers";

export async function loader({ context }: LoaderFunctionArgs) {
  return json({
    ENV: z.object(sharedEnvs).parse(process.env),
    cspNonce: z.string().parse(context.cspNonce),
  });
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function Layout({ children }: any) {
  const data = useLoaderData<typeof loader>();
  console.log(data.cspNonce);

  return (
    <html className={cn(themeClass)} lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          nonce={data.cspNonce}
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          nonce={data.cspNonce}
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          nonce={data.cspNonce}
        />
      </head>
      <body className={cn(rootClassname)}>
        {children}
        <script
          nonce={data.cspNonce}
          // biome-ignore lint/security/noDangerouslySetInnerHtml: This is controlled manor
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
          }}
        />
        <Scripts nonce={data.cspNonce} />
        <ScrollRestoration nonce={data.cspNonce} />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Providers>
      <Outlet />
    </Providers>
  );
}
