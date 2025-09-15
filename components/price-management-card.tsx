"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TrendingUp, TrendingDown, Edit, Save, X } from "lucide-react"

interface PriceManagementCardProps {
  fish: {
    id: number
    name: string
    basePrice: number
    currentPrice: number
    unit: string
    lastUpdated: string
    priceChange: number
  }
  onPriceUpdate: (fishId: number, newPrice: number) => void
}

export function PriceManagementCard({ fish, onPriceUpdate }: PriceManagementCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [newPrice, setNewPrice] = useState(fish.currentPrice)

  const minPrice = Math.round(fish.basePrice * 0.85)
  const maxPrice = Math.round(fish.basePrice * 1.15)

  const handleSave = () => {
    if (newPrice >= minPrice && newPrice <= maxPrice) {
      onPriceUpdate(fish.id, newPrice)
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setNewPrice(fish.currentPrice)
    setIsEditing(false)
  }

  const priceChangeColor =
    fish.priceChange > 0 ? "text-green-600" : fish.priceChange < 0 ? "text-red-600" : "text-gray-500"
  const priceChangeIcon =
    fish.priceChange > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex justify-between items-center">
          <span className="text-xl">{fish.name}</span>
          <div className={`flex items-center gap-1 ${priceChangeColor}`}>
            {priceChangeIcon}
            <span className="text-sm">
              {fish.priceChange > 0 ? "+" : ""}
              {fish.priceChange.toFixed(1)}%
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500 dark:text-gray-400">বেস দাম</p>
            <p className="font-medium">
              ৳{fish.basePrice}/{fish.unit}
            </p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">বর্তমান দাম</p>
            <p className="font-medium text-lg">
              ৳{fish.currentPrice}/{fish.unit}
            </p>
          </div>
        </div>

        <div className="text-xs text-gray-500 dark:text-gray-400">সর্বশেষ আপডেট: {fish.lastUpdated}</div>

        <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">দাম পরিসীমা:</p>
          <p className="text-sm">
            <span className="text-red-600">সর্বনিম্ন: ৳{minPrice}</span> -{" "}
            <span className="text-green-600">সর্বোচ্চ: ৳{maxPrice}</span>
          </p>
        </div>

        {isEditing && (
          <div className="space-y-2">
            <Label htmlFor={`price-${fish.id}`} className="text-sm">
              নতুন দাম (৳/{fish.unit})
            </Label>
            <Input
              id={`price-${fish.id}`}
              type="number"
              value={newPrice}
              onChange={(e) => setNewPrice(Number(e.target.value))}
              min={minPrice}
              max={maxPrice}
              className="text-center"
            />
            {(newPrice < minPrice || newPrice > maxPrice) && (
              <p className="text-red-500 text-xs">
                দাম ৳{minPrice} থেকে ৳{maxPrice} এর মধ্যে হতে হবে
              </p>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0">
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} className="w-full" variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            দাম পরিবর্তন করুন
          </Button>
        ) : (
          <div className="flex gap-2 w-full">
            <Button
              onClick={handleSave}
              disabled={newPrice < minPrice || newPrice > maxPrice}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              <Save className="mr-2 h-4 w-4" />
              সংরক্ষণ
            </Button>
            <Button onClick={handleCancel} variant="outline" className="flex-1">
              <X className="mr-2 h-4 w-4" />
              বাতিল
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
