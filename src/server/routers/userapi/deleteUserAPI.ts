import { eq } from "drizzle-orm";
import type { DBType } from "../../../db/db";
import { usersTable } from "../../../db/user.schema";
import { protectedProcedure } from "../../trpc";
import { success } from "../../types/response";


export function deleteUserAPI(db: DBType) {

  return protectedProcedure.mutation(async ({ ctx }) => {
    await db.delete(usersTable).where(eq(usersTable.id, ctx.user.id));
    return success("OK");
  })
}