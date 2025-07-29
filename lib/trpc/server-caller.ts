import { appRouter } from './routers/_app';
import { createContext } from './context';

export const createServerCaller = async () => {
  const ctx = await createContext();
  return appRouter.createCaller(ctx);
}; 