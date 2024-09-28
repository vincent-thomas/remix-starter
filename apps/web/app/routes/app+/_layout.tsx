import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import * as styles from "./styles.css";
import { json, Outlet, useLoaderData } from "@remix-run/react";
import { cn } from "@starter/components";
import { requireUserSession } from "@backend/session";

export const meta: MetaFunction = () => {
  return [
    { title: "VT App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};
export async function loader({ request }: LoaderFunctionArgs) {
  const session = await requireUserSession(request);
  return json({ isAuthed: session !== null });
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  return (
    <main className={cn(styles.indexRoot)}>
      <Outlet />
    </main>
  );
}
