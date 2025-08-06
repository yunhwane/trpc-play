import z from "zod";
import type { DBType } from "../../../db/db";
import { protectedProcedure } from "../../trpc";
import { usersTable } from "../../../db/user.schema";
import { eq } from "drizzle-orm";
import { success } from "../../types/response";



/**
 * 유저 이메일 업데이트 
 */
export function updateUserAPI(db: DBType) { 
  return protectedProcedure.input(z.object({
    email: z.email()
  })).mutation(async ({ input, ctx }) => {
    const user = await db.update(usersTable).set({
      email: input.email
    }).where(eq(usersTable.id, ctx.user.id)).returning();

    return success(
      {
        id: user[0]?.id,
        email: user[0]?.email,
        createdAt: user[0]?.createdAt,
        updatedAt: user[0]?.updatedAt,
      }
    )
  })
}
