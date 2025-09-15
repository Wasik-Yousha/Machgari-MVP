"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useFishData } from "@/contexts/fish-data-context"
import { Edit, Save, X, Fish, Search, TrendingUp, TrendingDown } from "lucide-react"

const initialBasePrices = [
  { id: 1, name: "ইলিশ", currentBasePrice: 1200, unit: "কেজি", lastUpdated: "২৫/০৫/২০২৪", reason: "বাজার চাহিদা বৃদ্ধি" },
  { id: 2, name: "রুই", currentBasePrice: 350, unit: "কেজি", lastUpdated: "২২/০৫/২০২৪", reason: "উৎপাদন বৃদ্ধি" },
  { id: 3, name: "কাতলা", currentBasePrice: 380, unit: "কেজি", lastUpdated: "২২/০৫/২০২৪", reason: "উৎপাদন বৃদ্ধি" },
  { id: 4, name: "পাঙ্গাস", currentBasePrice: 180, unit: "কেজি", lastUpdated: "২০/০৫/২০২৪", reason: "ডিজিটাল বাজার" },
  { id: 5, name: "তেলাপিয়া", currentBasePrice: 220, unit: "কেজি", lastUpdated: "২১/০৫/২০২৪", reason: "রপ্তানি চাহিদা বৃদ্ধি" },
]

export function BasePriceDeterminationSection() {
  const { getMarketData, getBasePrices, updateBasePrice } = useFishData()
  const marketData = getMarketData()
  const basePrices = getBasePrices()
  
  const [editingId, setEditingId] = useState<number | null>(null)
  const [newPrice, setNewPrice] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  // Create display prices from base prices
  const createDisplayPrices = () => {
    return Object.entries(basePrices).map(([ fishName, price ], index) => {
      const marketInfo = marketData.find(m => m.fishName === fishName)
      return {
        id: index + 1,
        name: fishName,
        currentBasePrice: price,
        unit: "কেজি",
        lastUpdated: "আজ",
        reason: marketInfo?.trend === "up" ? "চাহিদা বৃদ্ধি" : marketInfo?.trend === "down" ? "সরবরাহ বৃদ্ধি" : "স্থিতিশীল বাজার",
        trend: marketInfo?.trend || "stable",
        priceChange: marketInfo?.priceChange || 0
      }
    })
  }

  const [prices, setPrices] = useState(createDisplayPrices())

  // Update prices when market data or base prices change
  useEffect(() => {
    const updatedPrices = Object.entries(basePrices).map(([ fishName, price ], index) => {
      // Find market info or use a default value
      const marketInfo = marketData.find(m => m.fishName === fishName) || {
        trend: "stable",
        priceChange: 0
      }
      
      return {
        id: index + 1,
        name: fishName,
        currentBasePrice: price,
        unit: "কেজি",
        lastUpdated: "আজ",
        reason: marketInfo.trend === "up" ? "চাহিদা বৃদ্ধি" : marketInfo.trend === "down" ? "সরবরাহ বৃদ্ধি" : "স্থিতিশীল বাজার",
        trend: marketInfo.trend || "stable",
        priceChange: marketInfo.priceChange || 0
      }
    });
    
    setPrices(updatedPrices);
  }, [marketData, basePrices])

  const handleEdit = (id: number, currentPrice: number, fishName: string) => {
    setEditingId(id)
    setNewPrice(currentPrice)
  }

  const handleSave = (id: number, fishName: string) => {
    if (newPrice !== null) {
      // Update the base price in context (real-time update)
      updateBasePrice(fishName, newPrice)
      
      // Update local display
      setPrices((prevPrices) =>
        prevPrices.map((fish) =>
          fish.id === id
            ? { 
                ...fish, 
                currentBasePrice: newPrice, 
                lastUpdated: new Date().toLocaleDateString("bn-BD"),
                reason: "সরকারি আপডেট"
              }
            : fish,
        ),
      )
      setEditingId(null)
      setNewPrice(null)
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setNewPrice(null)
  }

  const filteredPrices = prices.filter((fish) => fish.name.includes(searchTerm) || fish.reason.includes(searchTerm))

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-4">সরকার নির্ধারিত বেস মূল্য</h2>
      <p className="text-gray-600 dark:text-gray-400">
        সরকার কর্তৃক নির্ধারিত বেস মূল্য হল সেই ন্যূনতম মূল্য বা আড়তদারগণ জেলেদের কাছ থেকে মাছ ক্রয়ের সময় অবশ্যই প্রদান করবেন। এই মূল্য
        নির্ধারণের সময় নিম্নলিখিত বিষয়গুলি বিবেচনা করা হয়:
      </p>
      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 ml-4">
        <li>উৎপাদন খরচ ও জেলেদের ন্যায্য মূল্য প্রাপ্তি</li>
        <li>বাজারে চাহিদা ও সরবরাহের ভারসাম্য</li>
        <li>বিভিন্ন অঞ্চলে মাছের সরবরাহের নিয়মিততা</li>
        <li>মৌসুমী প্রভাব ও উৎপাদন পরিস্থিতি</li>
        <li>ভোক্তাদের স্বার্থ রক্ষা</li>
      </ul>

      <Card className="p-4">
        <CardContent>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="মাছের ধরন অনুসন্ধান করুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>মাছের ধরন</TableHead>
                  <TableHead className="text-right">বেস মূল্য</TableHead>
                  <TableHead className="text-right">সর্বশেষ হালনাগাদ</TableHead>
                  <TableHead>কারণ</TableHead>
                  <TableHead className="text-right">পদক্ষেপ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPrices.length > 0 ? (
                  filteredPrices.map((fish) => (
                    <TableRow key={fish.id}>
                      <TableCell className="font-medium flex items-center gap-2">
                        <Fish className="h-5 w-5 text-primary" />
                        {fish.name}
                      </TableCell>
                      <TableCell className="text-right">
                        {editingId === fish.id ? (
                          <Input
                            type="number"
                            value={newPrice !== null ? newPrice : ""}
                            onChange={(e) => setNewPrice(Number(e.target.value))}
                            className="w-24 text-right"
                          />
                        ) : (
                          `৳${fish.currentBasePrice}/${fish.unit}`
                        )}
                      </TableCell>
                      <TableCell className="text-right">{fish.lastUpdated}</TableCell>
                      <TableCell>{fish.reason}</TableCell>
                      <TableCell className="text-right">
                        {editingId === fish.id ? (
                          <div className="flex gap-2 justify-end">
                            <Button
                              size="sm"
                              onClick={() => handleSave(fish.id, fish.name)}
                              className="bg-primary hover:bg-primary/90"
                            >
                              <Save className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={handleCancel}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(fish.id, fish.currentBasePrice, fish.name)}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            মূল্য পরিবর্তন
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-gray-500">
                      কোনো তথ্য পাওয়া যায়নি।
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
