"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function GovernmentRedirectPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the correct government dashboard route
    router.replace("/government-dashboard")
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-4">পুনর্নির্দেশনা...</h1>
        <p className="text-gray-600">আপনাকে সঠিক পৃষ্ঠায় পুনর্নির্দেশনা করা হচ্ছে।</p>
      </div>
    </div>
  )
}
