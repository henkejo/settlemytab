import { Prisma } from '@prisma/client'

// Prisma-generated types
export type Person = Prisma.PersonGetPayload<{}>
export type Bill = Prisma.BillGetPayload<{}>
export type BillItem = Prisma.BillItemGetPayload<{}>
export type PercentageSurcharge = Prisma.PercentageSurchargeGetPayload<{}>
export type BillParticipant = Prisma.BillParticipantGetPayload<{}>
export type BillItemAssignment = Prisma.BillItemAssignmentGetPayload<{}>

// Extended types with relations
export type BillWithDetails = Prisma.BillGetPayload<{
  include: {
    items: {
      include: {
        assignments: {
          include: {
            person: true
          }
        }
      }
    }
    percentageSurcharges: true
    participants: {
      include: {
        person: true
      }
    }
  }
}>

export type BillItemWithAssignments = Prisma.BillItemGetPayload<{
  include: {
    assignments: {
      include: {
        person: true
      }
    }
  }
}>

// Legacy type compatibility (for gradual migration)
export type LegacyBillItem = {
  id: string
  name: string
  price: number
  assignedUsers: Person[]
}

export type LegacyBill = {
  id: string
  name: string
  date: string
  items: LegacyBillItem[]
  percentageSurcharges: PercentageSurcharge[]
  amount: number
  participants?: Person[]
  status?: "draft" | "finalised" | "settled"
  createdAt: Date
  updatedAt: Date
}
