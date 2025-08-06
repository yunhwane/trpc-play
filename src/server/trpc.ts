import { initTRPC } from "@trpc/server";
import { isAuth } from "./auth";


function createContext() {
  return {
    userId: null,
  }
};

const t = initTRPC.context<typeof createContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuth);

export const middleware = t.middleware;