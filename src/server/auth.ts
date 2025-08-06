import { TRPCError } from "@trpc/server";
import { middleware } from "./trpc";
import { db } from "../db/db";
import { usersTable } from "../db/user.schema";
import { eq } from "drizzle-orm";


export const isAuth = middleware(async ({ ctx, next }) => {
  const userId = ctx.userId

  if (!userId) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Missing user ID' });
  }

  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, userId))
    .limit(1);

  if (!user) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'User not found' });
  }

  return next({
    ctx: {
      user, 
    },
  });
});