import Link from "next/link"
import { Camera, Edit3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { redirect } from 'next/navigation'
import { createServerCaller } from '@/lib/trpc/server-caller'
import { createClient } from '@/lib/supabase/server'

async function createBill() {
  'use server'
  
  const supabase = await createClient()
  
  // Check if we already have a session
  const { data: { session } } = await supabase.auth.getSession()
  
  // If no session, sign in anonymously
  if (!session) {
    const { data, error } = await supabase.auth.signInAnonymously()
    
    if (error) {
      console.error('Error signing in anonymously:', error)
      throw new Error('Failed to authenticate')
    }
  }
  
  // Create the bill using server-side tRPC
  const caller = await createServerCaller()
  const bill = await caller.bill.create({})
  
  // Redirect to the bill page
  redirect(`/bill/${bill.id}`)
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm mx-auto space-y-8">
        {/* Main options */}
        <div className="space-y-6">
          <div className="text-center font-medium">
            <h1 className="text-xl">settlemytab.com</h1>
          </div>

          <Button
            asChild
            variant="outline"
            className="w-48 mx-auto block h-20 text-lg font-medium border-2 border-black rounded-3xl hover:bg-gray-50 transition-colors bg-transparent"
          >
            <Link href="/photo-upload" className="flex flex-col items-center justify-center">
              <Camera className="size-6 mb-1" />
              <span>Use AI on a photo</span>
            </Link>
          </Button>

          <div className="text-center text-gray-400 font-medium">or</div>

          <form action={createBill}>
            <Button
              type="submit"
              variant="outline"
              className="
                w-48 mx-auto block h-20 text-lg font-medium
                border-2 border-black rounded-3xl hover:bg-gray-50 transition-colors bg-transparent
              "
            >
              <div className="flex flex-col items-center justify-center">
                <Edit3 className="size-6 mb-1" />
                <span>Enter manually</span>
              </div>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
