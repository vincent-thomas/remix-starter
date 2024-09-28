import { getDomainUrl } from "@backend/utils/misc";
import { generateSitemap } from "@nasa-gcn/remix-seo";
import type { ServerBuild, LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ request, context }: LoaderFunctionArgs) {
  const serverBuild = (await context.serverBuild) as { build: ServerBuild };

  return generateSitemap(request, serverBuild.build.routes, {
    siteUrl: getDomainUrl(request),
    headers: {
      "Cache-Control": `public, max-age=${60 * 5}`,
    },
  });
}
