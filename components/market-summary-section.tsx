"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useFishData } from "@/contexts/fish-data-context"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { FishChart } from "@/components/fish-chart"

export function MarketSummarySection() {
  const { getMarketData, getBasePrices } = useFishData()
  const [topFish, setTopFish] = useState<Array<{
    name: string;
    price: number;
    unit: string;
    change: number;
  }>>([])

  // Update market data
  useEffect(() => {
    // Get top fish data
    const marketData = getMarketData()
    const basePrices = getBasePrices()
    
    // Format and sort by price change (most change first)
    const formattedData = Object.entries(basePrices)
      .map(([fishName, basePrice]) => {
        const marketInfo = marketData.find(m => m.fishName === fishName)
        return {
          name: fishName,
          price: marketInfo?.currentPrice || basePrice,
          unit: "কেজি",
          change: marketInfo?.priceChange || 0
        }
      })
      .sort((a, b) => Math.abs(b.change) - Math.abs(a.change))
      .slice(0, 5) // Top 5 fish with most price change
    
    setTopFish(formattedData)
  }, [getMarketData, getBasePrices])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Top Price Changes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">সর্বশেষ দাম পরিবর্তন</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>মাছের নাম</TableHead>
                <TableHead className="text-right">দাম (৳)</TableHead>
                <TableHead className="text-right">পরিবর্তন</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topFish.map((fish, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{fish.name}</TableCell>
                  <TableCell className="text-right">{fish.price}/{fish.unit}</TableCell>
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
                      {fish.change.toFixed(1)}%
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Market Share Analysis */}
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-xl">মাছের বাজার বিশ্লেষণ</CardTitle>
        </CardHeader>
        <CardContent className="h-[450px]">
          <FishChart />
        </CardContent>
      </Card>
    </div>
  )
}