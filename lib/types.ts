// Basic types for the application
export interface Person {
  id: string
  name: string
  email?: string
  createdAt: Date
  updatedAt: Date
}

export interface BillItem {
  id: string
  name: string
  price: number
  billId: string
  createdAt: Date
  updatedAt: Date
}

export interface PercentageSurcharge {
  id: string
  name: string
  percentage: number
  billId: string
  createdAt: Date
  updatedAt: Date
}

export interface BillParticipant {
  id: string
  billId: string
  personId: string
  person: Person
  createdAt: Date
  updatedAt: Date
}

export interface BillItemAssignment {
  id: string
  billItemId: string
  personId: string
  person: Person
  createdAt: Date
  updatedAt: Date
}

export interface Bill {
  id: string
  name: string
  date: Date
  items: BillItem[]
  percentageSurcharges: PercentageSurcharge[]
  participants: BillParticipant[]
  status: "draft" | "finalised" | "settled"
  createdAt: Date
  updatedAt: Date
}

// Extended types with relations
export interface BillWithDetails extends Bill {
  items: (BillItem & {
    assignments: BillItemAssignment[]
  })[]
  participants: BillParticipant[]
}

export interface BillItemWithAssignments extends BillItem {
  assignments: BillItemAssignment[]
}

// Legacy type compatibility (for gradual migration)
export interface LegacyBillItem {
  id: string
  name: string
  price: number
  assignedUsers: Person[]
}

export interface LegacyBill {
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
