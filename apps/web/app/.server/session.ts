import { createCookie, redirect } from "@remix-run/node";
import { userSessionTable, userTable } from "./composables/db/schema";
import { eq } from "drizzle-orm";

const sessionCookie = createCookie("__session", {
  httpOnly: true,
  maxAge: 60 * 60 * 24 * 7,
  path: "/",
  sameSite: "lax",
  secrets: [env.SESSION_SECRET],
  secure: env.NODE_ENV === "production",
});

export const createSessionCookie = sessionCookie.serialize;

export async function getSession(req: Request) {
  const cookie: string = await sessionCookie.parse(req.headers.get("Cookie"));

  if (cookie === null || cookie === "") {
    return null;
  }

  const result = await db
    .select()
    .from(userSessionTable)
    .where(eq(userSessionTable.id, cookie));

  const userSession = result[0];

  if (userSession.valid_until < new Date() && !!userSession.unvalidated_at) {
    return null;
  }

  return userSession;
}

export async function requireSession(req: Request) {
  const session = await getSession(req);

  if (session === null) {
    throw redirect("/login", {
      headers: {
        "Set-Cookie": `${sessionCookie.name}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT;`,
      },
    });
  }

  return session;
}

export async function getUserSession(req: Request) {
  const cookie: string = await sessionCookie.parse(req.headers.get("Cookie"));

  if (cookie === null || cookie === "") {
    return null;
  }

  const result = await db
    .select({
      user: {
        userId: userTable.id,
        email: userTable.email,
        createdAt: userTable.created_at,
      },
      session: {
        validUntil: userSessionTable.valid_until,
        unvalidatedAt: userSessionTable.unvalidated_at,
      },
    })
    .from(userSessionTable)
    .where(eq(userSessionTable.id, cookie))
    .innerJoin(userTable, eq(userTable.id, userSessionTable.userId));

  const userSession = result[0];

  if (
    userSession.session.validUntil < new Date() &&
    !!userSession.session.unvalidatedAt
  ) {
    return null;
  }

  return userSession.user;
}

export async function requireUserSession(req: Request) {
  const session = await getUserSession(req);

  if (session === null) {
    throw redirect("/login", {
      headers: {
        "Set-Cookie": `${sessionCookie.name}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT;`,
      },
    });
  }

  return session;
}

/**
 *
 */
export async function banUserSession(
  request: Request,
  path_to_redirect: string,
) {
  const cookie: string = await sessionCookie.parse(
    request.headers.get("Cookie"),
  );

  if (cookie === null) {
    return;
  }

  if (cookie === "") {
    throw redirect(request.url, {
      headers: {
        "Set-Cookie": `${sessionCookie.name}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT;`,
      },
    });
  }
  const result = await db
    .select({
      user: {
        userId: userTable.id,
        email: userTable.email,
        createdAt: userTable.created_at,
      },
      session: {
        validUntil: userSessionTable.valid_until,
        unvalidatedAt: userSessionTable.unvalidated_at,
      },
    })
    .from(userSessionTable)
    .where(eq(userSessionTable.id, cookie))
    .innerJoin(userTable, eq(userTable.id, userSessionTable.userId));

  const userSession = result[0];

  if (
    userSession.session.validUntil < new Date() &&
    !!userSession.session.unvalidatedAt
  ) {
    throw redirect(request.url, {
      headers: {
        "Set-Cookie": `${sessionCookie.name}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT;`,
      },
    });
  }
  throw redirect(path_to_redirect);
}
