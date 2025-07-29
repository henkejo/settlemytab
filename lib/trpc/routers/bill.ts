import { z } from 'zod';
import { router, publicProcedure } from '../server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY!,
  {
    auth: {
      persistSession: false // This is important
    }
  }
);

export const billRouter = router({
  create: publicProcedure
    .input(z.object({
      name: z.string().default('Untitled Bill'),
      date: z.string().default(() => new Date().toISOString().split('T')[0]),
    }))
    .mutation(async ({ input }) => {
      try {
        const { data: bill, error } = await supabase
          .from('bills')
          .insert({
            name: input.name,
            date: input.date,
            amount: 0,
            status: 'draft',
          })
          .select()
          .single();

        if (error) {
          throw error;
        }
        return bill;
      } catch (err) {
        console.error('Create bill error:', err);
        throw err;
      }
    }),
}); 