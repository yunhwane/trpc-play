import z from "zod"
import { publicProcedure } from "../../trpc"
import type { DBType } from "../../../db/db"
import { usersTable } from "../../../db/user.schema"
import { success } from "../../types/response"

/**
 * 유저 생성 API 
 */
export function createUserAPI(db: DBType) {
  
  return publicProcedure.input(z.object({
    email: z.email(),
    password: z.string().min(8),
  })).mutation(async ({ input }) => {
    
    
    const user = await db
      .insert(usersTable)
      .values({
        email: input.email,
        password: input.password,
      })
      .returning();
      
    return success(
      {
        id: user[0]?.id!,
        email: user[0]?.email!,
        createdAt: user[0]?.createdAt!,
        updatedAt: user[0]?.updatedAt!,
      }
    )
  })
}