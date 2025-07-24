import type { Bill, Person } from "@/lib/types"

export function calculateUserShare(bill: Bill, userId: string): number {
  const userItems = bill.items.filter((item) => item.assignedUsers.includes(userId))

  let totalShare = 0

  userItems.forEach((item) => {
    const sharePerPerson = item.price / item.assignedUsers.length
    totalShare += sharePerPerson
  })

  return totalShare
}

export function calculateSettlements(bill: Bill, users: Person[]) {
  const settlements: { from: string; to: string; amount: number }[] = []
  const userShares: { [userId: string]: number } = {}

  // Calculate what each user owes
  users.forEach((user) => {
    userShares[user.id] = calculateUserShare(bill, user.id)
  })

  const totalBill = bill.amount
  const averageShare = totalBill / users.length

  // Calculate who owes whom
  const balances: { [userId: string]: number } = {}
  users.forEach((user) => {
    balances[user.id] = userShares[user.id] - averageShare
  })

  // Create settlements (simplified algorithm)
  const debtors = Object.entries(balances).filter(([, balance]) => balance > 0)
  const creditors = Object.entries(balances).filter(([, balance]) => balance < 0)

  debtors.forEach(([debtorId, debt]) => {
    creditors.forEach(([creditorId, credit]) => {
      if (debt > 0 && credit < 0) {
        const settlementAmount = Math.min(debt, Math.abs(credit))
        settlements.push({
          from: debtorId,
          to: creditorId,
          amount: settlementAmount,
        })

        balances[debtorId] -= settlementAmount
        balances[creditorId] += settlementAmount
      }
    })
  })

  return settlements
}

export function formatCurrency(amount: number): string {
  return `£${amount.toFixed(2)}`
}
