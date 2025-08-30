import { defineEnt, defineEntSchema, defineEntsFromTables, getEntDefinitions } from "convex-ents";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const schema = defineEntSchema({
  ...defineEntsFromTables(authTables),

  users: defineEnt({
    phone: v.string(),
  })
  .edges("billParticipants", { ref: true }),

  billParticipants: defineEnt({
    name: v.string(),
  })
  .edge("user")
  .edge("bill"),

  bills: defineEnt({
    name: v.string(),
    date: v.string(), // ISO date string
    status: v.union(
      v.literal("draft"), 
      v.literal("finalised"), 
      v.literal("settled")
    ),
  })
  .edges("billParticipants", { ref: true })
  .edges("billItems", { ref: true })
  .edges("percentageSurcharges", { ref: true }),


  billItems: defineEnt({
    name: v.string(),
    price: v.number(),
  })
  .edge("bill"),


  percentageSurcharges: defineEnt({
    name: v.string(),
    percentage: v.number(),
  })
  .edge("bill"),
  

});
export default schema;

export const entDefinitions = getEntDefinitions(schema);

