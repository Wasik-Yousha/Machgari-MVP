"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, ShoppingCart, CheckCircle } from "lucide-react"
import { SellFishModal } from "./sell-fish-modal"

interface FishCardProps {
  fish: {
    id: number
    name: string
    quantity: string
    quality: string
    description: string
    image: string
    date: string
    isSold?: boolean
    soldPrice?: number
    soldTo?: string
  }
}
export function FishCard({ fish }: FishCardProps) {
  const [showSellModal, setShowSellModal] = useState(false)
  
  return (
    <>
      <Card className={`overflow-hidden ${fish.isSold ? 'bg-gray-50 dark:bg-gray-900' : ''}`}>
        <div className="relative h-48">
          <Image 
            src={fish.image || "/placeholder.svg"} 
            alt={fish.name} 
            fill 
            className={`object-cover ${fish.isSold ? 'opacity-60' : ''}`} 
          />
          {fish.isSold && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <Badge className="bg-green-600 text-white">
                <CheckCircle className="h-4 w-4 mr-1" />
                বিক্রিত
              </Badge>
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold">{fish.name}</h3>
            <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm">{fish.quality}</span>
          </div>
          <div className="space-y-2">
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">পরিমাণ:</span> {fish.quantity}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">তারিখ:</span> {fish.date}
            </p>
            {fish.isSold && fish.soldPrice && (
              <>
                <p className="text-green-700 dark:text-green-300">
                  <span className="font-medium">বিক্রয় মূল্য:</span> ৳{fish.soldPrice}
                </p>
                {fish.soldTo && (
                  <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-medium">ক্রেতা:</span> {fish.soldTo}
                  </p>
                )}
              </>
            )}
            <p className="text-gray-700 dark:text-gray-300 line-clamp-2">{fish.description}</p>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between">
          <div className="flex gap-2">
            {!fish.isSold && (
              <Button 
                variant="default" 
                size="sm" 
                className="flex items-center gap-1 bg-green-600 hover:bg-green-700"
                onClick={() => setShowSellModal(true)}
              >
                <ShoppingCart className="h-4 w-4" />
                বিক্রয় করুন
              </Button>
            )}
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Edit className="h-4 w-4" />
              সম্পাদনা
            </Button>
          </div>
          <Button variant="outline" size="sm" className="flex items-center gap-1 text-red-500 hover:text-red-600">
            <Trash2 className="h-4 w-4" />
            মুছুন
          </Button>
        </CardFooter>
      </Card>

      <SellFishModal
        isOpen={showSellModal}
        onClose={() => setShowSellModal(false)}
        fishId={fish.id}
      />
    </>
  )
}
