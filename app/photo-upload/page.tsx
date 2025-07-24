import { ArrowLeft, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PhotoUploadPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-sm bg-white min-h-screen shadow-lg">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 z-10">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" size="sm" className="p-2">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-lg font-medium">Upload Receipt</h1>
            <div className="w-9" /> {/* Spacer */}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center space-y-6">
            <div className="w-24 h-24 mx-auto border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center">
              <Camera className="w-8 h-8 text-gray-400" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold">AI Receipt Scanner</h2>
              <p className="text-gray-600">This feature will be available soon!</p>
              <p className="text-sm text-gray-500">
                Upload a photo of your receipt and our AI will automatically extract the items and prices.
              </p>
            </div>
            <Button asChild className="w-full max-w-xs">
              <Link href="/manual-entry">Try Manual Entry Instead</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
