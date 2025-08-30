"use client"

import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ConvexExample() {
  const [newBillName, setNewBillName] = useState("");
  const [newBillDate, setNewBillDate] = useState("");

  // Queries
  const bills = useQuery(api.bills.getBills);
  const createBillMutation = useMutation(api.bills.createBill);

  // Console log to fetch and display bills
  useEffect(() => {
    if (bills) {
      console.log("Fetched bills from database:", bills);
      console.log("Total bills:", bills.length);
    }
  }, [bills]);

  const handleCreateBill = async () => {
    if (!newBillName.trim() || !newBillDate) return;
    
    await createBillMutation({
      name: newBillName.trim(),
      date: newBillDate,
      status: "draft",
    });
    
    setNewBillName("");
    setNewBillDate("");
  };

  if (bills === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Convex Integration Example</h2>
      
      {/* Create new bill form */}
      <div className="space-y-2">
        <h3 className="font-semibold">Create New Bill</h3>
        <div className="flex gap-2">
          <Input
            placeholder="Bill name"
            value={newBillName}
            onChange={(e) => setNewBillName(e.target.value)}
          />
          <Input
            type="date"
            value={newBillDate}
            onChange={(e) => setNewBillDate(e.target.value)}
          />
          <Button onClick={handleCreateBill}>Create Bill</Button>
        </div>
      </div>

      {/* Display bills */}
      <div className="space-y-2">
        <h3 className="font-semibold">Bills ({bills.length})</h3>
        {bills.map((bill) => (
          <div key={bill._id} className="p-3 border rounded">
            <div className="font-medium">{bill.name}</div>
            <div className="text-sm text-gray-600">
              Date: {new Date(bill.date).toLocaleDateString()}
            </div>
            <div className="text-sm text-gray-600">
              Status: {bill.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
