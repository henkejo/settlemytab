"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LogIn, LogOut, User } from "lucide-react"
import Link from "next/link"

export function AuthButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  if (isLoggedIn) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/protected">
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Profile
          </Button>
        </Link>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsLoggedIn(false)}
          className="flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    )
  }

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={() => setIsLoggedIn(true)}
      className="flex items-center gap-2"
    >
      <LogIn className="w-4 h-4" />
      Login
    </Button>
  )
}
