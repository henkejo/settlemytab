import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Query to get a bill by ID
export const getBill = query({
  args: { billId: v.id("bills") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.billId);
  },
});

// Query to get all bills
export const getBills = query({
  handler: async (ctx) => {
    return await ctx.db.query("bills").collect();
  },
});

// Query to get bill items for a specific bill
export const getBillItems = query({
  args: { billId: v.id("bills") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("billItems")
      .withIndex("by_bill", (q) => q.eq("billId", args.billId))
      .collect();
  },
});

// Query to get bill participants for a specific bill
export const getBillParticipants = query({
  args: { billId: v.id("bills") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("billParticipants")
      .withIndex("by_bill", (q) => q.eq("billId", args.billId))
      .collect();
  },
});

// Mutation to create a new bill
export const createBill = mutation({
  args: {
    name: v.string(),
    date: v.string(),
    status: v.union(v.literal("draft"), v.literal("finalised"), v.literal("settled")),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("bills", {
      name: args.name,
      date: args.date,
      status: args.status,
    });
  },
});

// Mutation to create a new bill item
export const createBillItem = mutation({
  args: {
    name: v.string(),
    price: v.number(),
    billId: v.id("bills"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("billItems", {
      name: args.name,
      price: args.price,
      billId: args.billId,
    });
  },
});

// Mutation to update a bill item
export const updateBillItem = mutation({
  args: {
    itemId: v.id("billItems"),
    name: v.string(),
    price: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.itemId, {
      name: args.name,
      price: args.price,
    });
  },
});

// Mutation to delete a bill item
export const deleteBillItem = mutation({
  args: { itemId: v.id("billItems") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.itemId);
  },
});

// Mutation to create a new person
export const createPerson = mutation({
  args: {
    name: v.string(),
    email: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("persons", {
      name: args.name,
      email: args.email,
    });
  },
});

// Mutation to add a participant to a bill
export const addBillParticipant = mutation({
  args: {
    billId: v.id("bills"),
    personId: v.id("persons"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("billParticipants", {
      billId: args.billId,
      personId: args.personId,
    });
  },
});
