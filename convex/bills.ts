import { query, mutation } from "./functions";
import { v } from "convex/values";

// Query to get a bill by ID
export const getBills = query({
  args: {},
  handler: async (ctx, args) => {
    return await ctx.table("bills").take(5);
  },
});
