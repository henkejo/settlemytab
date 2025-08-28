"use client"

import { useState } from "react"
import { ArrowLeft, Plus, Percent } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import type { Bill, BillItem, Person } from "@/lib/types"
import { useRouter } from "next/navigation"
import { EditItemModal } from "@/components/edit-item-modal"
import { EditHeaderModal } from "@/components/edit-header-modal"

// Dummy data
const dummyPeople: Person[] = [
  { id: "1", name: "Alice", email: "alice@example.com", createdAt: new Date(), updatedAt: new Date() },
  { id: "2", name: "Bob", email: "bob@example.com", createdAt: new Date(), updatedAt: new Date() },
  { id: "3", name: "Charlie", email: "charlie@example.com", createdAt: new Date(), updatedAt: new Date() },
]

const dummyItems: BillItem[] = [
  { id: "1", name: "Margherita Pizza", price: 12.99, billId: "1", createdAt: new Date(), updatedAt: new Date() },
  { id: "2", name: "Pepperoni Pizza", price: 14.99, billId: "1", createdAt: new Date(), updatedAt: new Date() },
  { id: "3", name: "Garlic Bread", price: 4.99, billId: "1", createdAt: new Date(), updatedAt: new Date() },
  { id: "4", name: "Coke", price: 2.99, billId: "1", createdAt: new Date(), updatedAt: new Date() },
]

export default function ManualEntryPage() {
  const router = useRouter()

  const [bill, setBill] = useState<Bill>({
    id: "1",
    name: "Mario's Pizzeria",
    date: new Date("2025-07-23"),
    items: dummyItems,
    percentageSurcharges: [],
    participants: dummyPeople.map(person => ({
      id: person.id,
      billId: "1",
      personId: person.id,
      person,
      createdAt: new Date(),
      updatedAt: new Date()
    })),
    status: "draft",
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  const [tipPercentage, setTipPercentage] = useState(0)
  const [isAddingTip, setIsAddingTip] = useState(false)
  const [newItemName, setNewItemName] = useState("")
  const [newItemPrice, setNewItemPrice] = useState("")
  const [isAddingItem, setIsAddingItem] = useState(false)
  const [editingItem, setEditingItem] = useState<BillItem | null>(null)
  const [isEditingHeader, setIsEditingHeader] = useState(false)

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
      billId: bill.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    setBill((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }))

    setNewItemName("")
    setNewItemPrice("")
    setIsAddingItem(false)
  }

  const handleSaveEdit = (name: string, price: number) => {
    if (!editingItem) return

    setBill((prev) => {
      const newItems = prev.items.map(item => 
        item.id === editingItem.id 
          ? { ...item, name, price }
          : item
      )
      
      return {
        ...prev,
        items: newItems,
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
      }
    })
    setEditingItem(null)
  }

  const handleSaveHeader = (restaurantName: string, date: string) => {
    setBill((prev) => ({
      ...prev,
      name: restaurantName,
      date: new Date(date),
    }))
  }

  const subtotal = bill.items.reduce((sum, item) => sum + item.price, 0)
  const tipAmount = (subtotal * tipPercentage) / 100
  const total = subtotal + tipAmount

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
          <div 
            className="bg-white p-6 text-center border-b border-dashed border-gray-400 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => setIsEditingHeader(true)}
          >
            <h2 className="text-2xl font-bold uppercase tracking-wide truncate">
              {bill.name}
            </h2>
            <p className="text-sm text-gray-600 mt-1">{bill.date.toLocaleDateString()}</p>
          </div>

          {/* Receipt Items */}
          <div className="bg-white">
            {/* Items Header */}
            <div className="px-6 py-3 border-b border-dashed border-gray-300 text-xs font-mono uppercase tracking-wider text-gray-600">
              <div className="flex justify-between">
                <span>Item</span>
                <div className="text-right">
                  <span>Price</span>
                  {tipPercentage > 0 && (
                    <div className="text-[10px] text-gray-400 uppercase">
                      (+tip)
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Items List */}
            <div className="font-mono text-sm">
              {bill.items.map((item) => {
                const itemTipAmount = tipPercentage > 0 ? (item.price * tipPercentage) / 100 : 0
                const totalItemPrice = item.price + itemTipAmount

                return (
                  <Dialog key={item.id}>
                    <DialogTrigger asChild>
                      <div 
                        className="px-6 py-2 hover:bg-gray-50 cursor-pointer transition-colors border-b border-dotted border-gray-200 last:border-b-0"
                        onClick={() => setEditingItem(item)}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2 flex-1">
                            <span className="font-medium truncate max-w-[200px]">{item.name}</span>
                            <div className="flex gap-1">
                              {/* Dummy user assignments */}
                              <div className="w-5 h-5 rounded-full border border-black flex items-center justify-center text-xs font-bold bg-white">
                                A
                              </div>
                              <div className="w-5 h-5 rounded-full border border-black flex items-center justify-center text-xs font-bold bg-white">
                                B
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="font-bold tabular-nums">£{totalItemPrice.toFixed(2)}</span>
                            {tipPercentage > 0 && (
                              <div className="text-[10px] text-gray-400">
                                (£{item.price.toFixed(2)} + {tipPercentage}%)
                              </div>
                            )}
                          </div>
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
                )
              })}
              
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
            <div className="px-6 py-4 border-t-2 border-dashed border-gray-400 bg-gray-50 space-y-2">
              {/* Add Tip Button */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center font-mono">
                  <span className="text-lg font-bold uppercase flex items-center">Total:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold tabular-nums">£{total.toFixed(2)}</span>
                  </div>
                </div>
                {tipPercentage > 0 && (
                  <div className="flex justify-end">
                    <div className="text-xs font-mono tabular-nums text-gray-600">
                      (£{tipAmount.toFixed(2)} tip)
                    </div>
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsAddingTip(true)}
                  className="flex items-center gap-2 text-gray-600 hover:text-black !px-0"
                >
                  <Percent className="w-4 h-4" />
                  {tipPercentage > 0 ? `Tip (${tipPercentage}%)` : 'Add tip'}
                </Button>
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

          {/* Add Tip Dialog */}
          <Dialog open={isAddingTip} onOpenChange={setIsAddingTip}>
            <DialogContent className="max-w-sm rounded-xl">
              <DialogHeader>
                <DialogTitle>Add Tip</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Tip Percentage (%)</label>
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    value={tipPercentage}
                    onChange={(e) => setTipPercentage(Number(e.target.value))}
                    placeholder="0"
                    className="mt-1"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setTipPercentage(0)
                      setIsAddingTip(false)
                    }}
                  >
                    Remove Tip
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsAddingTip(false)}
                    className="bg-secondary text-white"
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Add EditHeaderModal */}
          <EditHeaderModal
            isOpen={isEditingHeader}
            onClose={() => setIsEditingHeader(false)}
            onSave={handleSaveHeader}
            restaurantName={bill.name}
            date={bill.date.toISOString().split('T')[0]}
          />
        </div>
      </div>
    </div>
  )
}
