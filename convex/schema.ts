import { defineEnt, defineEntSchema } from "convex-ents";
import { v } from "convex/values";

export default defineEntSchema({
  users: defineEnt({
    name: v.string(),
  }),
  billParticipants: defineEnt({
    name: v.string(),
  }),
  bills: defineEnt({
    name: v.string(),
    date: v.string(), // ISO date string
    status: v.union(v.literal("draft"), v.literal("finalised"), v.literal("settled")),
  }),
  billItems: defineEnt({
    name: v.string(),
    price: v.number(),
    billId: v.id("bills"),
  }),
  percentageSurcharges: defineEnt({
    name: v.string(),
    percentage: v.number(),
  }),
);
