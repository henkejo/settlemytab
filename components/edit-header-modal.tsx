import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface EditHeaderModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (restaurantName: string, date: string) => void
  restaurantName: string
  date: string
}

export function EditHeaderModal({
  isOpen,
  onClose,
  onSave,
  restaurantName,
  date,
}: EditHeaderModalProps) {
  const [name, setName] = useState(restaurantName)
  const [billDate, setBillDate] = useState(date)

  const handleSave = () => {
    if (!name.trim()) {
      alert("Please enter a restaurant name")
      return
    }
    onSave(name.trim(), billDate)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm rounded-xl">
        <DialogHeader>
          <DialogTitle>Edit Bill Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Restaurant Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Mario's Pizzeria"
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Date</label>
            <Input
              value={billDate}
              onChange={(e) => setBillDate(e.target.value)}
              placeholder="e.g., 23 July 2025"
              className="mt-1"
            />
          </div>
          <div className="flex justify-end gap-2">
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
      </DialogContent>
    </Dialog>
  )
} 