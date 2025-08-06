import type { DBType } from "../../../db/db";
import { usersTable } from "../../../db/user.schema";
import { protectedProcedure } from "../../trpc";
import { eq } from 'drizzle-orm';


/**
 * 유저 정보 조회 API 
 */
export function getUserAPI() {
  return protectedProcedure.query(async ({ ctx }) => {
    return {
      status: 'success',
      data: {
        id: ctx.user.id,
        email: ctx.user.email,
        createdAt: ctx.user.createdAt,
        updatedAt: ctx.user.updatedAt,
      }
    }
  });
}