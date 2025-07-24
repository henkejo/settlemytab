"use client"

import { useState } from "react"
import { ArrowLeft, Plus, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import type { Bill, BillItem, User as UserType } from "@/lib/types"
import { useRouter } from "next/navigation"
import { EditItemModal } from "@/components/edit-item-modal"

// Mock data for demonstration
const mockUsers: UserType[] = [
  { id: "1", name: "Harry", initials: "H", color: "#000" },
  { id: "2", name: "Zoe", initials: "Z", color: "#000" },
]

export default function ManualEntryPage() {
  const router = useRouter()

  const [bill, setBill] = useState<Bill>({
    id: "1",
    restaurantName: "Mario's Pizzeria",
    date: "23 July 2025",
    items: [
    ],
    totalAmount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  const [newItemName, setNewItemName] = useState("")
  const [newItemPrice, setNewItemPrice] = useState("")
  const [isAddingItem, setIsAddingItem] = useState(false)
  const [editingItem, setEditingItem] = useState<BillItem | null>(null)

  const addNewItem = () => {
    if (!newItemName.trim()) {
      alert("Please enter an item name")
      return
    }
    
    const price = Number.parseFloat(newItemPrice)
    if (isNaN(price) || price <= 0) {
      alert("Please enter a valid price")
      return
    }

    const newItem: BillItem = {
      id: Date.now().toString(),
      name: newItemName.trim(),
      price: price,
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

  const handleSaveEdit = (name: string, price: number) => {
    if (!editingItem) return

    setBill((prev) => {
      const oldPrice = editingItem.price
      const newItems = prev.items.map(item => 
        item.id === editingItem.id 
          ? { ...item, name, price }
          : item
      )
      
      return {
        ...prev,
        items: newItems,
        totalAmount: prev.totalAmount - oldPrice + price,
      }
    })

    setEditingItem(null)
  }

  const deleteItem = (itemId: string) => {
    setBill((prev) => {
      const itemToDelete = prev.items.find(item => item.id === itemId)
      if (!itemToDelete) return prev

      return {
        ...prev,
        items: prev.items.filter(item => item.id !== itemId),
        totalAmount: prev.totalAmount - itemToDelete.price,
      }
    })
    setEditingItem(null)
  }

  const getUserInitials = (userIds: string[]) => {
    return userIds.map((id) => mockUsers.find((u) => u.id === id)?.initials).filter(Boolean)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-sm bg-white min-h-screen shadow-lg">
        {/* Back Button */}
        <div className="p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/")}
            className="hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>

        {/* Receipt Container */}
        <div className="bg-white mx-4 border-2 border-black rounded-lg overflow-hidden shadow-sm">
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
                    <div 
                      className="px-6 py-2 hover:bg-gray-50 cursor-pointer transition-colors border-b border-dotted border-gray-200 last:border-b-0"
                      onClick={() => setEditingItem(item)}
                    >
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
                          </div>
                        </div>
                        <span className="font-bold tabular-nums">£{item.price.toFixed(2)}</span>
                      </div>
                    </div>
                  </DialogTrigger>
                  <EditItemModal
                    item={editingItem}
                    isOpen={editingItem?.id === item.id}
                    onClose={() => setEditingItem(null)}
                    onSave={handleSaveEdit}
                    onDelete={deleteItem}
                  />
                </Dialog>
              ))}
              
              {/* Add Item Button (always visible) */}
              <div 
                onClick={() => setIsAddingItem(true)}
                className="px-6 py-2 hover:bg-gray-50 cursor-pointer transition-colors border-b border-dotted border-gray-200 last:border-b-0"
              >
                <div className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors animate-pulse">
                  <Plus className="w-4 h-4" />
                  <span className="font-medium">Add new item...</span>
                </div>
              </div>
            </div>

            {/* Receipt Total (always visible) */}
            <div className="px-6 py-4 border-t-2 border-dashed border-gray-400 bg-gray-50">
              <div className="flex justify-between items-center font-mono">
                <span className="text-lg font-bold uppercase">Total:</span>
                <span className="text-xl font-bold tabular-nums">£{bill.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Add Item Dialog */}
          <Dialog open={isAddingItem} onOpenChange={setIsAddingItem}>
            <DialogContent className="max-w-sm rounded-xl">
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
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddingItem(false)}>
                    Cancel
                  </Button>
                  <Button
                    variant="outline"
                    onClick={addNewItem}
                    className="bg-secondary text-white"
                  >
                    Add
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
