import { userSessionTable } from "@backend/composables/db/schema";

interface CreateUserSessionInput {
  userId: string;
}

export async function createUserSession(props: CreateUserSessionInput) {
  const currentDate = new Date();

  const validUntil = new Date(currentDate);
  validUntil.setDate(currentDate.getDate() + 1);

  const userSessionResult = await db
    .insert(userSessionTable)
    .values({
      userId: props.userId,

      created_at: currentDate,
      valid_until: validUntil,
      unvalidated_at: null,
    })
    .returning({
      id: userSessionTable.id,
    });

  return userSessionResult[0];
}
