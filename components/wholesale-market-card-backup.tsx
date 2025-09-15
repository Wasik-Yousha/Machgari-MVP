"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Star } from "lucide-react"
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from "react"
import { SellFishModal } from "./sell-fish-modal"

interface WholesaleMarketCardProps {
  market: {
    id: number
    name: string
    location: string
    distance: string
    prices: Array<{ fish: string; price: string }>
    rating: number
    contact: string
  }
  onGoToMarket?: (marketId: number) => void
}

export function WholesaleMarketCard({ market, onGoToMarket }: WholesaleMarketCardProps) {
  const [showSellModal, setShowSellModal] = useState(false)

  const handleGoToMarket = () => {
    if (onGoToMarket) {
      onGoToMarket(market.id)
    }
  }

  const handleSellFish = () => {
    setShowSellModal(true)
  }

  return (
    <>
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold">{market.name}</h3>
            <div className="flex items-center bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-500 px-2 py-1 rounded-full">
              <Star className="h-4 w-4 mr-1 fill-yellow-500" />
              <span>{market.rating}</span>
            </div>
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <MapPin className="h-4 w-4 mr-2" />
              <span>
                {market.location} • দূরত্ব: {market.distance}
              </span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Phone className="h-4 w-4 mr-2" />
              <span>{market.contact}</span>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="font-medium mb-2">বর্তমান দর:</h4>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b dark:border-gray-700">
                    <th className="text-left pb-2">মাছের নাম</th>
                    <th className="text-right pb-2">দাম</th>
                  </tr>
                </thead>
                <tbody>
                  {market.prices.map((item: { fish: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; price: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined }, index: Key | null | undefined) => (
                    <tr key={index} className={index !== market.prices.length - 1 ? "border-b dark:border-gray-700" : ""}>
                      <td className="py-2">{item.fish}</td>
                      <td className="text-right py-2">{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
        <CardFooter className="px-6 pb-6 pt-0">
          <Button 
            className="w-full bg-primary hover:bg-primary/90"
            onClick={handleSellFish}
          >
            এই আড়তে যেতে চাই
          </Button>
        </CardFooter>
      </Card>

      <SellFishModal
        isOpen={showSellModal}
        onClose={() => setShowSellModal(false)}
        preselectedMarket={`আড়ত-${market.id.toString().padStart(3, '0')}`}
      />
    </>
  )
}
