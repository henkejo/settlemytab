import type { Bill, Person } from "@/lib/types"

// Dummy function for now - will be replaced with Convex implementation
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function calculateUserShare(bill: Bill, userId: string): number {
  // For now, return a dummy calculation (ignoring userId)
  const totalBill = bill.items.reduce((sum, item) => sum + item.price, 0)
  const participantCount = bill.participants.length
  return participantCount > 0 ? totalBill / participantCount : 0
}

export function calculateSettlements(bill: Bill, users: Person[]) {
  // Dummy settlements for now
  const settlements: { from: string; to: string; amount: number }[] = []
  
  if (users.length >= 2) {
    const totalBill = bill.items.reduce((sum, item) => sum + item.price, 0)
    const averageShare = totalBill / users.length
    
    // Create a simple settlement where the first person pays the second
    settlements.push({
      from: users[0].id,
      to: users[1].id,
      amount: averageShare / 2,
    })
  }

  return settlements
}

export function formatCurrency(amount: number): string {
  return `£${amount.toFixed(2)}`
}
