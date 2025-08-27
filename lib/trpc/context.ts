import { createClient } from '@/lib/supabase/server';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { prisma } from '@/lib/prisma';

export async function createContext() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  // If no session, use a public client instead
  if (!session) {
    return {
      supabase: createSupabaseClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY!
      ),
      session: null,
      prisma,
    };
  }

  return {
    supabase,
    session,
    prisma,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>; 