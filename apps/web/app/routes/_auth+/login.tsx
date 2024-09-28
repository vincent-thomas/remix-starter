import { banUserSession, createSessionCookie } from "@backend/session";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  Form,
  json,
  useActionData,
  useNavigate,
  useNavigation,
} from "@remix-run/react";
import { z } from "zod";
import { userSessionTable, userTable } from "@backend/composables/db/schema";
import { eq } from "drizzle-orm";

import { verify } from "argon2";
import { toast } from "sonner";
import { parseWithZod } from "@conform-to/zod";
import { useEffect } from "react";
import { LoaderCircleIcon } from "lucide-react";

import { rotateSpin } from "@starter/components/keyframes";

export async function loader(args: LoaderFunctionArgs) {
  await banUserSession(args.request, "/app");

  return null;
}

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(10),
});

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const dataSubmitted = parseWithZod(formData, {
    schema,
  });

  if (dataSubmitted.status !== "success") {
    return { status: "error" as const, message: "Invalid credentials" };
  }
  const result = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, dataSubmitted.value.email));

  if (result.length === 0) {
    return { status: "error" as const, message: "Invalid credentials" };
  }

  if (!(await verify(result[0].password, dataSubmitted.value.password))) {
    return { status: "error" as const, message: "Invalid credentials" };
  }

  const userId = result[0].id;

  const currentDate = new Date();

  const validUntil = new Date(currentDate);
  validUntil.setDate(currentDate.getDate() + 1);

  const userSessionResult = await db
    .insert(userSessionTable)
    .values({
      userId,

      created_at: currentDate,
      valid_until: validUntil,
      unvalidated_at: null,
    })
    .returning({
      id: userSessionTable.id,
    });

  return json(
    {
      status: "success" as const,
      message: "Du är inloggad!",
    },
    {
      headers: {
        "Set-Cookie": await createSessionCookie(userSessionResult[0].id),
      },
    },
  );
}

export default function Page() {
  const data = useActionData<typeof action>();

  const navigate = useNavigate();

  const state = useNavigation();

  useEffect(() => {
    if (data === undefined) return;

    if (data.status === "error") {
      toast.error(data.message, {
        richColors: true,
      });
    }

    if (data.status === "success") {
      toast.success(data.message, {
        richColors: true,
      });
      navigate("/app");
    }
  }, [data, navigate]);

  return (
    <Form method="POST">
      <input type="email" name="email" />
      <input type="password" name="password" />
      <button type="submit" disabled={state.state !== "idle"}>
        {state.state !== "idle" && <LoaderCircleIcon className={rotateSpin} />}
        {state.state === "submitting" ? "Submitting" : "Submit"}
      </button>
    </Form>
  );
}
