import { initTRPC, TRPCError } from "@trpc/server";
import { isAuth } from "./auth";


function createContext() {
  return {
    userId: null,
  }
};

const t = initTRPC.context<typeof createContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(function isAuthenticated(opts) {
  const loginedUserId = opts.ctx.userId;

  if(!loginedUserId) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Missing user ID' });
  }

  return opts.next ({
    ctx: {
      user: {
        id: loginedUserId,
      }
    }
  })
});
