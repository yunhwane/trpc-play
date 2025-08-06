import z from "zod";
import type { DBType } from "../../../db/db";
import { protectedProcedure } from "../../trpc";
import { usersTable } from "../../../db/user.schema";
import { eq } from "drizzle-orm";



/**
 * 유저 이메일 업데이트 
 */
export function updateUserAPI(db: DBType) { 
  return protectedProcedure.input(z.object({
    email: z.email()
  })).mutation(async ({ input, ctx }) => {
    const user = await db.update(usersTable).set({
      email: input.email
    }).where(eq(usersTable.id, ctx.user.id));

    return {
      status: 'success',
      data: {
        id: ctx.user.id,
        email: input.email,
        createdAt: ctx.user.createdAt,
        updatedAt: ctx.user.updatedAt,
      }
    }
  })
}
