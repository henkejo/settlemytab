import { router } from '../server';
import { billRouter } from './bill';

export const appRouter = router({
  bill: billRouter,
});

export type AppRouter = typeof appRouter; 