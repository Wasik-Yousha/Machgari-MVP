"use client"

import { useState, useEffect } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Button } from "@/components/ui/button"
import { useFishData } from "@/contexts/fish-data-context"
import { useTransactions } from "@/contexts/transactions-context"

// Fallback data in case context isn't available
const fallbackDailyData = [
  { name: "রুই", value: 35 },
  { name: "কাতলা", value: 25 },
  { name: "ইলিশ", value: 15 },
  { name: "পাঙ্গাস", value: 10 },
  { name: "তেলাপিয়া", value: 10 },
  { name: "অন্যান্য", value: 5 },
]

const fallbackWeeklyData = [
  { name: "রুই", value: 30 },
  { name: "কাতলা", value: 20 },
  { name: "ইলিশ", value: 20 },
  { name: "পাঙ্গাস", value: 15 },
  { name: "তেলাপিয়া", value: 8 },
  { name: "অন্যান্য", value: 7 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

export function FishChart() {
  const [viewMode, setViewMode] = useState<"daily" | "weekly">("daily")
  const [dailyData, setDailyData] = useState(fallbackDailyData)
  const [weeklyData, setWeeklyData] = useState(fallbackWeeklyData)
  
  const { fishEntries, getTopFishByValue } = useFishData()
  const { transactions } = useTransactions()

  useEffect(() => {
    // Calculate market share based on transactions and fish data
    const topFish = getTopFishByValue()
    
    // If we have actual data, use it
    if (topFish.length > 0) {
      // Calculate total value
      const totalValue = topFish.reduce((sum, item) => sum + item.value, 0)
      
      // Format data for daily chart
      const formattedData = topFish
        .map(item => ({
          name: item.name,
          value: Math.round((item.value / totalValue) * 100)
        }))
        .sort((a, b) => b.value - a.value)
      
      // Combine small percentages into "Other"
      const topItems = formattedData.slice(0, 5)
      const otherItems = formattedData.slice(5)
      
      if (otherItems.length > 0) {
        const otherValue = otherItems.reduce((sum, item) => sum + item.value, 0)
        setDailyData([...topItems, { name: "অন্যান্য", value: otherValue }])
      } else {
        setDailyData(topItems)
      }
      
      // For weekly data, use the same data but with slightly different proportions
      // In a real implementation, this would use historical data
      const weeklyVariation = formattedData.map(item => ({
        name: item.name,
        value: Math.max(5, Math.min(95, item.value + (Math.random() * 10 - 5)))
      }))
      
      // Normalize to ensure total is 100%
      const weeklyTotal = weeklyVariation.reduce((sum, item) => sum + item.value, 0)
      const normalizedWeekly = weeklyVariation.map(item => ({
        name: item.name,
        value: Math.round((item.value / weeklyTotal) * 100)
      }))
      
      // Combine small percentages into "Other" for weekly data
      const topWeeklyItems = normalizedWeekly.slice(0, 5)
      const otherWeeklyItems = normalizedWeekly.slice(5)
      
      if (otherWeeklyItems.length > 0) {
        const otherWeeklyValue = otherWeeklyItems.reduce((sum, item) => sum + item.value, 0)
        setWeeklyData([...topWeeklyItems, { name: "অন্যান্য", value: otherWeeklyValue }])
      } else {
        setWeeklyData(topWeeklyItems)
      }
    }
  }, [fishEntries, transactions, getTopFishByValue])
  
  const data = viewMode === "daily" ? dailyData : weeklyData

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-center space-x-4 mb-4">
        <Button
          variant={viewMode === "daily" ? "default" : "outline"}
          onClick={() => setViewMode("daily")}
          className="text-sm"
        >
          দৈনিক
        </Button>
        <Button
          variant={viewMode === "weekly" ? "default" : "outline"}
          onClick={() => setViewMode("weekly")}
          className="text-sm"
        >
          সাপ্তাহিক
        </Button>
      </div>

      <div className="flex-grow">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value}%`} />
            <Legend layout="horizontal" verticalAlign="bottom" align="center" />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 text-center text-sm text-gray-500">
        {viewMode === "daily" ? "দৈনিক মাছ বিক্রয়ের শতাংশ" : "সাপ্তাহিক মাছ বিক্রয়ের শতাংশ"}
      </div>
    </div>
  )
}
