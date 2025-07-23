"use client"

import { useState } from "react"
import { ArrowLeft, Plus, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import type { Bill, BillItem, User as UserType } from "@/lib/types"

// Mock data for demonstration
const mockUsers: UserType[] = [
  { id: "1", name: "Harry", initials: "H", color: "#000" },
  { id: "2", name: "Zoe", initials: "Z", color: "#000" },
]

export default function ManualEntryPage() {
  const [bill, setBill] = useState<Bill>({
    id: "1",
    restaurantName: "Mario's Pizzeria",
    date: "23 July 2025",
    items: [
      { id: "1", name: "Margherita", price: 12.99, assignedUsers: ["1"] },
      { id: "2", name: "Margherita", price: 12.99, assignedUsers: ["2"] },
      { id: "3", name: "Margherita", price: 12.99, assignedUsers: ["1"] },
      { id: "4", name: "Margherita", price: 12.99, assignedUsers: ["2"] },
      { id: "5", name: "Margherita", price: 12.99, assignedUsers: ["2"] },
      { id: "6", name: "Margherita", price: 12.99, assignedUsers: ["2"] },
      { id: "7", name: "Margherita", price: 12.99, assignedUsers: ["2"] },
      { id: "8", name: "Margherita", price: 12.99, assignedUsers: ["2"] },
      { id: "9", name: "Margherita", price: 12.99, assignedUsers: ["2"] },
      { id: "10", name: "Margherita", price: 12.99, assignedUsers: [] },
    ],
    totalAmount: 129.9,
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  const [newItemName, setNewItemName] = useState("")
  const [newItemPrice, setNewItemPrice] = useState("")
  const [isAddingItem, setIsAddingItem] = useState(false)

  const addNewItem = () => {
    if (newItemName && newItemPrice) {
      const newItem: BillItem = {
        id: Date.now().toString(),
        name: newItemName,
        price: Number.parseFloat(newItemPrice),
        assignedUsers: [],
      }

      setBill((prev) => ({
        ...prev,
        items: [...prev.items, newItem],
        totalAmount: prev.totalAmount + newItem.price,
      }))

      setNewItemName("")
      setNewItemPrice("")
      setIsAddingItem(false)
    }
  }

  const getUserInitials = (userIds: string[]) => {
    return userIds.map((id) => mockUsers.find((u) => u.id === id)?.initials).filter(Boolean)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-sm bg-white min-h-screen shadow-lg">
        {/* Receipt Container */}
        <div className="bg-white mx-4 my-6 border-2 border-black rounded-lg overflow-hidden shadow-sm">
          {/* Receipt Header */}
          <div className="bg-white p-6 text-center border-b border-dashed border-gray-400">
            <h2 className="text-2xl font-bold uppercase tracking-wide">{bill.restaurantName}</h2>
            <p className="text-sm text-gray-600 mt-1">{bill.date}</p>
            <div className="mt-3 text-xs text-gray-500">
              <p>Receipt #001</p>
            </div>
          </div>

          {/* Receipt Items */}
          <div className="bg-white">
            {bill.items.length === 0 ? (
              <div className="p-6">
                <Button
                  onClick={() => setIsAddingItem(true)}
                  variant="outline"
                  className="w-full h-12 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-black hover:text-black transition-colors"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add first item
                </Button>
              </div>
            ) : (
              <>
                {/* Items Header */}
                <div className="px-6 py-3 border-b border-dashed border-gray-300 text-xs font-mono uppercase tracking-wider text-gray-600">
                  <div className="flex justify-between">
                    <span>Item</span>
                    <span>Price</span>
                  </div>
                </div>

                {/* Items List */}
                <div className="font-mono text-sm">
                  {bill.items.map((item, index) => (
                    <Dialog key={item.id}>
                      <DialogTrigger asChild>
                        <div className="px-6 py-2 hover:bg-gray-50 cursor-pointer transition-colors border-b border-dotted border-gray-200 last:border-b-0">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2 flex-1">
                              <span className="font-medium">{item.name}</span>
                              <div className="flex gap-1">
                                {getUserInitials(item.assignedUsers).map((initials, i) => (
                                  <div
                                    key={i}
                                    className="w-5 h-5 rounded-full border border-black flex items-center justify-center text-xs font-bold bg-white"
                                  >
                                    {initials}
                                  </div>
                                ))}
                                {item.assignedUsers.length === 0 && (
                                  <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center bg-gray-50">
                                    <User className="w-3 h-3 text-gray-400" />
                                  </div>
                                )}
                              </div>
                            </div>
                            <span className="font-bold tabular-nums">£{item.price.toFixed(2)}</span>
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-sm bg-opacity-100 bg-white">
                        <DialogHeader>
                          <DialogTitle>Edit Item</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <p className="text-sm text-gray-600">
                            This modal will allow editing of the bill item in future updates.
                          </p>
                          <div className="space-y-2">
                            <p>
                              <strong>Item:</strong> {item.name}
                            </p>
                            <p>
                              <strong>Price:</strong> £{item.price.toFixed(2)}
                            </p>
                            <p>
                              <strong>Assigned to:</strong>{" "}
                              {item.assignedUsers.length > 0
                                ? getUserInitials(item.assignedUsers).join(", ")
                                : "Unassigned"}
                            </p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>

                {/* Receipt Total */}
                <div className="px-6 py-4 border-t-2 border-dashed border-gray-400 bg-gray-50">
                  <div className="flex justify-between items-center font-mono">
                    <span className="text-lg font-bold uppercase">Total:</span>
                    <span className="text-xl font-bold tabular-nums">£{bill.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </>
            )}

            {/* Add Item Button */}
            <div className="p-4 border-t border-dashed border-gray-300">
              <Button
                onClick={() => setIsAddingItem(true)}
                variant="outline"
                className="w-full h-10 border border-dashed border-gray-400 rounded text-gray-600 hover:border-black hover:text-black transition-colors text-sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add item
              </Button>
            </div>
          </div>
        </div>

        {/* Add Item Dialog */}
        <Dialog open={isAddingItem} onOpenChange={setIsAddingItem}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>Add New Item</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Item Name</label>
                <Input
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="e.g., Margherita Pizza"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Price (£)</label>
                <Input
                  type="number"
                  step="0.01"
                  value={newItemPrice}
                  onChange={(e) => setNewItemPrice(e.target.value)}
                  placeholder="0.00"
                  className="mt-1"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={addNewItem} className="flex-1">
                  Add Item
                </Button>
                <Button variant="outline" onClick={() => setIsAddingItem(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
