"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, AreaChart, Area } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const fishPriceTrends = {
  রুই: [
    { month: "জানু", price: 350 },
    { month: "ফেব্রু", price: 360 },
    { month: "মার্চ", price: 345 },
    { month: "এপ্রিল", price: 355 },
    { month: "মে", price: 370 },
    { month: "জুন", price: 365 },
  ],
  ইলিশ: [
    { month: "জানু", price: 1200 },
    { month: "ফেব্রু", price: 1180 },
    { month: "মার্চ", price: 1250 },
    { month: "এপ্রিল", price: 1300 },
    { month: "মে", price: 1280 },
    { month: "জুন", price: 1350 },
  ],
  কাতলা: [
    { month: "জানু", price: 380 },
    { month: "ফেব্রু", price: 375 },
    { month: "মার্চ", price: 390 },
    { month: "এপ্রিল", price: 385 },
    { month: "মে", price: 400 },
    { month: "জুন", price: 395 },
  ],
}

const marketPriceComparison = [
  { market: "কাওরান বাজার", রুই: 350, ইলিশ: 1200, কাতলা: 380 },
  { market: "চট্টগ্রাম", রুই: 360, ইলিশ: 1250, কাতলা: 390 },
  { market: "খুলনা", রুই: 340, ইলিশ: 1180, কাতলা: 370 },
]

export function PriceAnalysisSection() {
  const [selectedFish, setSelectedFish] = useState("রুই")

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold mb-4">দাম বিশ্লেষণ</h2>
      <p className="text-gray-600 dark:text-gray-400">বিভিন্ন মাছের বাজার মূল্য প্রবণতা এবং আড়ত অনুযায়ী দামের তুলনা বিশ্লেষণ করুন।</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4">
          <CardHeader>
            <CardTitle>মাছের দামের প্রবণতা</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Select value={selectedFish} onValueChange={setSelectedFish}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="মাছ নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(fishPriceTrends).map((fishName) => (
                    <SelectItem key={fishName} value={fishName}>
                      {fishName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <ChartContainer
              config={{
                price: {
                  label: "দাম (৳)",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={fishPriceTrends[selectedFish as keyof typeof fishPriceTrends]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line type="monotone" dataKey="price" stroke="var(--color-price)" name="দাম" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardHeader>
            <CardTitle>আড়ত অনুযায়ী দামের তুলনা</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                রুই: {
                  label: "রুই",
                  color: "hsl(var(--chart-1))",
                },
                ইলিশ: {
                  label: "ইলিশ",
                  color: "hsl(var(--chart-2))",
                },
                কাতলা: {
                  label: "কাতলা",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={marketPriceComparison}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="market" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Area type="monotone" dataKey="রুই" stroke="var(--color-রুই)" fill="var(--color-রুই)" name="রুই" />
                  <Area
                    type="monotone"
                    dataKey="ইলিশ"
                    stroke="var(--color-ইলিশ)"
                    fill="var(--color-ইলিশ)"
                    name="ইলিশ"
                  />
                  <Area type="monotone" dataKey="কাতলা" stroke="var(--color-কাতলা)" fill="var(--color-কাতলা)" name="কাতলা" />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
// This component provides a detailed analysis of fish prices, including trends and market comparisons.
// It allows users to select different fish types and view their price trends over time, as well as compare prices across different markets.
// The component uses responsive charts to visualize the data effectively.      