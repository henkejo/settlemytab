import { initTRPC } from '@trpc/server';
import { createClient } from '@/lib/supabase/server';
import type { Context } from './context';

const t = initTRPC.context<Context>().create();

const isAuthed = t.middleware(async ({ next }) => {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session?.user) {
    throw new Error('Not authenticated');
  }
  
  return next({
    ctx: {
      user: session.user,
      supabase,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed); 