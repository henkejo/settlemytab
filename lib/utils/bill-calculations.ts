import type { Bill, Person } from "@/lib/types"

// Dummy function for now - will be replaced with Convex implementation
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function calculateUserShare(bill: Bill, userId: string): number {
  // For now, return a dummy calculation (ignoring userId)
  // Note: This will need to be updated when we implement actual Convex queries
  // that fetch related items and participants
  return 0
}

export function calculateSettlements(bill: Bill, users: Person[]) {
  // Dummy settlements for now
  const settlements: { from: string; to: string; amount: number }[] = []
  
  if (users.length >= 2) {
    // Note: This will need to be updated when we implement actual Convex queries
    // that fetch related items and participants
    settlements.push({
      from: users[0]._id,
      to: users[1]._id,
      amount: 0,
    })
  }

  return settlements
}

export function formatCurrency(amount: number): string {
  return `£${amount.toFixed(2)}`
}
