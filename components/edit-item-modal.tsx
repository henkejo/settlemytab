import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { BillItem } from "@/lib/types"

interface EditItemModalProps {
  item: BillItem | null
  isOpen: boolean
  onClose: () => void
  onSave: (name: string, price: number) => void
  onDelete: (itemId: string) => void
}

export function EditItemModal({ 
  item, 
  isOpen, 
  onClose, 
  onSave, 
  onDelete 
}: EditItemModalProps) {
  const [editItemName, setEditItemName] = useState(item?.name ?? "")
  const [editItemPrice, setEditItemPrice] = useState(item?.price.toString() ?? "")

  // Reset form when item changes
  useEffect(() => {
    setEditItemName(item?.name ?? "")
    setEditItemPrice(item?.price.toString() ?? "")
  }, [item])

  const handleSave = () => {
    if (!item) return

    if (!editItemName.trim()) {
      alert("Please enter an item name")
      return
    }
    
    const price = Number.parseFloat(editItemPrice)
    if (isNaN(price) || price <= 0) {
      alert("Please enter a valid price")
      return
    }

    onSave(editItemName.trim(), price)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm rounded-xl">
        <DialogHeader>
          <DialogTitle>Edit Item</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Item Name</label>
            <Input
              value={editItemName}
              onChange={(e) => setEditItemName(e.target.value)}
              placeholder="e.g., Margherita Pizza"
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Price (£)</label>
            <Input
              type="number"
              step="0.01"
              value={editItemPrice}
              onChange={(e) => setEditItemPrice(e.target.value)}
              placeholder="0.00"
              className="mt-1"
            />
          </div>
          <div className="flex justify-between">
            <Button
              variant="destructive"
              onClick={() => item && onDelete(item._id)}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              Delete
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                variant="outline"
                onClick={handleSave}
                className="bg-secondary text-white"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}