import { getDomainUrl } from "@backend/utils/misc";
import { generateRobotsTxt } from "@nasa-gcn/remix-seo";
import type { LoaderFunctionArgs } from "@remix-run/node";

export function loader({ request }: LoaderFunctionArgs) {
  return generateRobotsTxt([
    { type: "sitemap", value: `${getDomainUrl(request)}/sitemap.xml` },
  ]);
}
