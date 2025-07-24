export type Person = {
  id: string
  name: string
  color: string
  authUserId?: string
  createdAt?: Date
  updatedAt?: Date
}

export type BillItem = {
  id: string
  name: string
  price: number
  assignedUsers: Person[]
}

export type PercentageSurcharge = {
  id: string
  name: string
  percentage: number
}

export type Bill = {
  id: string
  name: string
  date: string
  items: BillItem[]
  percentageSurcharges: PercentageSurcharge[]
  amount: number
  participants?: Person[]
  status?: "draft" | "finalised" | "settled"
  createdAt: Date
  updatedAt: Date
}
