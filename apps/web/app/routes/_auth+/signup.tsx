import { banUserSession, createSessionCookie } from "@backend/session";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, redirect, useNavigation } from "@remix-run/react";
import { z } from "zod";

import { parseWithZod } from "@conform-to/zod";
import { LoaderCircleIcon } from "lucide-react";

import { rotateSpin } from "@starter/components/keyframes";
import { cn, sprinkles } from "@starter/components";
import { createUser } from "@backend/funcs/createUser";
import { createUserSession } from "@backend/funcs/createUserSession";

export async function loader(args: LoaderFunctionArgs) {
  await banUserSession(args.request, "/app");

  return null;
}

const schema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string().min(10),
});

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const dataSubmitted = parseWithZod(formData, {
    schema,
  });

  if (dataSubmitted.status !== "success") {
    return { status: "error" as const };
  }

  const user = await createUser({
    email: dataSubmitted.value.email,
    name: dataSubmitted.value.name,
    password: dataSubmitted.value.password,
  });

  if (user.type === "error") {
    return { status: "error" as const };
  }

  const userId = user.userId;
  const userSession = await createUserSession({ userId });

  return redirect("/app", {
    headers: {
      "Set-Cookie": await createSessionCookie(userSession.id),
    },
  });
}

export default function Page() {
  const state = useNavigation();

  return (
    <Form
      method="POST"
      className={cn(
        sprinkles({
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }),
      )}
    >
      <input type="full_name" name="name" />
      <input type="email" name="email" />
      <input type="password" name="password" />
      <button type="submit" disabled={state.state !== "idle"}>
        {state.state !== "idle" && <LoaderCircleIcon className={rotateSpin} />}
        {state.state === "submitting" ? "Submitting" : "Submit"}
      </button>
    </Form>
  );
}
