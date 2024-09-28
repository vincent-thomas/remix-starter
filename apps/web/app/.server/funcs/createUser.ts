import { userTable } from "@backend/composables/db/schema";
import { stripeSdk } from "@backend/sdk/stripe";
import { hash } from "argon2";
import { eq } from "drizzle-orm";

interface CreateUserInput {
  email: string;
  name: string;
  password: string;
}

type CreateUserOutputs =
  | {
      type: "success";
      userId: string;
      customerId: string;
    }
  | {
      type: "error";
    };

export async function createUser(
  props: CreateUserInput,
): Promise<CreateUserOutputs> {
  const database = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, props.email));

  if (database.length !== 0) {
    return { type: "error" as const };
  }

  const customer = await stripeSdk.customers.create({
    email: props.email,
  });

  const password = await hash(props.password);

  const user = await db
    .insert(userTable)
    .values({
      email: props.email,
      password,

      customerId: customer.id,
      created_at: new Date(),
    })
    .returning({ userId: userTable.id });

  return {
    type: "success",
    customerId: customer.id,
    userId: user[0].userId,
  };
}
