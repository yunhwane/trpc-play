import type { DBType } from "../../../db/db";
import { usersTable } from "../../../db/user.schema";
import { protectedProcedure } from "../../trpc";
import { eq } from 'drizzle-orm';
import { error, success } from "../../types/response";


/**
 * 유저 정보 조회 API 
 */
export function getUserAPI(db: DBType) {
  return protectedProcedure.query(async ({ ctx }) => {

    const [user] = await db.select().from(usersTable).where(eq(usersTable.id, ctx.user.id));

    if(!user) {
      return error("USER_NOT_FOUND" as const);
    }
    
    return success(
      {
        id: user?.id,
        email: user?.email,
        createdAt: user?.createdAt,
        updatedAt: user?.updatedAt,
      }
    )
  });
}