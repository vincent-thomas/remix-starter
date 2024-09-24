// app/sessions.ts
import { createCookieSessionStorage } from "@remix-run/node"; // or cloudflare/deno
import { env } from "./env";

type SessionData = {
  userId: string;
};

type SessionFlashData = {
  error: string;
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: "__session",

      httpOnly: true,
      maxAge: 60,
      path: "/",
      sameSite: "lax",
      secrets: [env.SESSION_SECRET],
      secure: true,
    },
  });

export { getSession, commitSession, destroySession };
