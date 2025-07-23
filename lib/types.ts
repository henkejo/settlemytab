export interface User {
  id: string
  name: string
  initials: string
  color: string
  email?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface BillItem {
  id: string
  name: string
  price: number
  assignedUsers: string[] // Array of user IDs
  quantity?: number
  category?: string
  notes?: string
}

export interface Bill {
  id: string
  restaurantName: string
  date: string
  items: BillItem[]
  totalAmount: number
  tax?: number
  tip?: number
  participants?: string[] // Array of user IDs
  createdBy?: string // User ID
  status?: "draft" | "finalized" | "settled"
  createdAt: Date
  updatedAt: Date
}

export interface Settlement {
  id: string
  billId: string
  fromUserId: string
  toUserId: string
  amount: number
  status: "pending" | "completed"
  createdAt: Date
  settledAt?: Date
}
