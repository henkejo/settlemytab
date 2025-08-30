import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Query to get a bill by ID
export const getBill = query({
  args: { billId: v.id("bills") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.billId);
  },
});
