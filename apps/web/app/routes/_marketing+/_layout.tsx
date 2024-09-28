import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import * as styles from "./styles.css";
import { PublicNavbar } from "app/shared/components/public-navbar";
import { json, Outlet, useLoaderData } from "@remix-run/react";
import { cn, sprinkles } from "@starter/components";
import { getUserSession } from "@backend/session";

export const meta: MetaFunction = () => {
  return [
    { title: "VT App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};
export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getUserSession(request);

  return json({ isAuthed: session !== null });
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  return (
    <main
      className={cn(
        sprinkles({
          paddingX: "large",
        }),
        styles.indexRoot,
      )}
    >
      <PublicNavbar isAuthed={data.isAuthed} />
      <Outlet />
    </main>
  );
}
