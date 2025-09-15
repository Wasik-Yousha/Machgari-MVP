"use client"

import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Star, Clock, Fish } from "lucide-react"

interface FishermanCardProps {
  fisherman: {
    id: string
    name: string
    location: string
    distance: string
    phone: string
    catches: Array<{ 
      fish: string
      quantity: string
      quality: string
      estimatedPrice?: number
      totalValue?: number
    }>
    totalCatch: string
    catchDate: string
    rating: number
    avatar: string
    totalValue?: number
  }
}

export function FishermanCard({ fisherman }: FishermanCardProps) {
  const handleContact = () => {
    // Handle contact logic here
    console.log(`Contacting ${fisherman.name} at ${fisherman.phone}`)
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="relative w-16 h-16">
            <Image
              src={fisherman.avatar || "/placeholder.svg"}
              alt={fisherman.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-xl font-bold">{fisherman.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">জেলে আইডি: {fisherman.id}</p>
              </div>
              <div className="flex items-center bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-500 px-2 py-1 rounded-full">
                <Star className="h-3 w-3 mr-1 fill-yellow-500" />
                <span className="text-sm">{fisherman.rating}</span>
              </div>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <MapPin className="h-4 w-4 mr-2" />
                <span>
                  {fisherman.location} • {fisherman.distance}
                </span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Clock className="h-4 w-4 mr-2" />
                <span>{fisherman.catchDate}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium flex items-center gap-1">
              <Fish className="h-4 w-4" />
              ধরা মাছের তালিকা
            </h4>
            <div className="text-right">
              <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm">
                মোট: {fisherman.totalCatch}
              </span>
              {fisherman.totalValue && (
                <p className="text-xs text-green-600 font-medium mt-1">
                  মূল্য: {Math.round(fisherman.totalValue).toLocaleString()} ৳
                </p>
              )}
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
            <div className="space-y-2">
              {fisherman.catches.map((catch_, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{catch_.fish}</span>
                    <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-xs">{catch_.quality}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{catch_.quantity}</span>
                    {catch_.estimatedPrice && (
                      <p className="text-xs text-green-600">
                        {catch_.estimatedPrice} ৳/কেজি
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0 flex gap-3">
        <Button variant="outline" className="flex-1 flex items-center gap-1">
          <Phone className="h-4 w-4" />
          {fisherman.phone}
        </Button>
        <Button onClick={handleContact} className="flex-1 bg-primary hover:bg-primary/90">
          যোগাযোগ করুন
        </Button>
      </CardFooter>
    </Card>
  )
}
