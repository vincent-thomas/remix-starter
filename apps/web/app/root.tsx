import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import "./root.css";
import { z } from "zod";
import { sharedEnvs } from "./shared/shared-env";
import { cn } from "@starter/components";
import { themeClass } from "@starter/components/src/theme.css";
import { rootClassname } from "./root.css";
import "./globals.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export async function loader() {
  return json({
    ENV: z.object(sharedEnvs).parse(process.env),
  });
}

export function Layout({ children }: any) {
  const data = useLoaderData<typeof loader>();

  return (
    <html className={cn(themeClass)} lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className={cn(rootClassname)}>
        {children}
        <ScrollRestoration />
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: This is controlled manor
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
          }}
        />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
