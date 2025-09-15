"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useFishData } from "@/contexts/fish-data-context"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

export function PriceTable() {
  const { getMarketData, getBasePrices } = useFishData()
  const [fishData, setFishData] = useState<Array<{
    id: number;
    name: string;
    price: number;
    unit: string;
    change: number;
  }>>([])

  // Get data from context and format for display
  useEffect(() => {
    const marketData = getMarketData()
    const basePrices = getBasePrices()
    
    // Format data for the price table
    const formattedData = Object.entries(basePrices).map(([fishName, basePrice], index) => {
      const marketInfo = marketData.find(m => m.fishName === fishName)
      return {
        id: index + 1,
        name: fishName,
        price: marketInfo?.currentPrice || basePrice,
        unit: "কেজি",
        change: marketInfo?.priceChange || 0
      }
    })
    
    setFishData(formattedData)
  }, [getMarketData, getBasePrices])

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setFishData((prevData) =>
        prevData.map((fish) => {
          // Random price fluctuation between -10 and +10 taka
          const priceChange = Math.floor(Math.random() * 21) - 10
          const newPrice = Math.max(100, fish.price + priceChange)

          return {
            ...fish,
            price: newPrice,
            change: priceChange,
          }
        }),
      )
    }, 10000) // Update every 10 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>মাছের নাম</TableHead>
            <TableHead className="text-right">দাম (৳)</TableHead>
            <TableHead className="text-right">একক</TableHead>
            <TableHead className="text-right">পরিবর্তন</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fishData.map((fish) => (
            <TableRow key={fish.id}>
              <TableCell className="font-medium">{fish.name}</TableCell>
              <TableCell className="text-right">{fish.price}</TableCell>
              <TableCell className="text-right">{fish.unit}</TableCell>
              <TableCell className="text-right">
                <span
                  className={`inline-flex items-center ${
                    fish.change > 0
                      ? "text-green-500"
                      : fish.change < 0
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}
                >
                  {fish.change > 0 ? (
                    <TrendingUp className="mr-1 h-4 w-4" />
                  ) : fish.change < 0 ? (
                    <TrendingDown className="mr-1 h-4 w-4" />
                  ) : (
                    <Minus className="mr-1 h-4 w-4" />
                  )}
                  {fish.change > 0 ? "+" : ""}
                  {fish.change}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
