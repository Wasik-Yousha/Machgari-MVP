"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useFishData } from "@/contexts/fish-data-context"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { TrendingUp, TrendingDown, DollarSign, Fish, Users, Package } from "lucide-react"

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d']

export function MarketAnalyticsSection() {
  const { 
    getMarketData, 
    getTopFishByValue, 
    getLocationStats,
    getTotalMarketValue,
    getAveragePrice,
    getFishermenData,
    getTotalFishCount
  } = useFishData()

  const marketData = getMarketData()
  const topFish = getTopFishByValue()
  const locationStats = getLocationStats()
  const totalValue = getTotalMarketValue()
  const avgPrice = getAveragePrice()
  const fishermenData = getFishermenData()
  const totalFish = getTotalFishCount()

  // Prepare chart data
  const priceChartData = marketData.map(fish => ({
    name: fish.fishName,
    basePrice: fish.basePrice,
    currentPrice: fish.currentPrice,
    change: fish.priceChange
  }))

  const volumeChartData = topFish.map(fish => ({
    name: fish.name,
    quantity: fish.quantity,
    value: fish.value
  }))

  const locationChartData = locationStats.map(location => ({
    name: location.location,
    value: location.totalValue,
    fishermen: location.fishermen
  }))

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold mb-4">বাজার বিশ্লেষণ</h2>

      {/* Market Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30">
              <DollarSign className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">মোট বাজার মূল্য</p>
              <p className="text-xl font-bold">{Math.round(totalValue).toLocaleString()} ৳</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/30">
              <Fish className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">গড় মূল্য</p>
              <p className="text-xl font-bold">{avgPrice} ৳/কেজি</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/30">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">সক্রিয় জেলে</p>
              <p className="text-xl font-bold">{fishermenData.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-orange-100 dark:bg-orange-900/30">
              <Package className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">মাছের ধরন</p>
              <p className="text-xl font-bold">{marketData.length}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Price Comparison Chart */}
        <Card>
          <CardHeader>
            <CardTitle>দামের তুলনা (বেস বনাম বর্তমান)</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                basePrice: { label: "বেস প্রাইস", color: "#8884d8" },
                currentPrice: { label: "বর্তমান প্রাইস", color: "#82ca9d" },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={priceChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="basePrice" fill="#8884d8" name="বেস প্রাইস" />
                  <Bar dataKey="currentPrice" fill="#82ca9d" name="বর্তমান প্রাইস" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Volume by Fish Type */}
        <Card>
          <CardHeader>
            <CardTitle>মাছের ধরন অনুযায়ী পরিমাণ</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: { label: "মূল্য", color: "#0088FE" },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={volumeChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="quantity"
                  >
                    {volumeChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Market Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>বিস্তারিত বাজার তথ্য</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>মাছের নাম</TableHead>
                  <TableHead>বেস প্রাইস</TableHead>
                  <TableHead>বর্তমান প্রাইস</TableHead>
                  <TableHead>পরিবর্তন</TableHead>
                  <TableHead>চাহিদা</TableHead>
                  <TableHead>সরবরাহ</TableHead>
                  <TableHead>ট্রেন্ড</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {marketData.map((fish, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{fish.fishName}</TableCell>
                    <TableCell>{fish.basePrice} ৳</TableCell>
                    <TableCell>{fish.currentPrice} ৳</TableCell>
                    <TableCell>
                      <span className={`flex items-center gap-1 ${
                        fish.priceChange > 0 ? 'text-green-600' : fish.priceChange < 0 ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {fish.priceChange > 0 ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : fish.priceChange < 0 ? (
                          <TrendingDown className="h-3 w-3" />
                        ) : null}
                        {fish.priceChange > 0 ? '+' : ''}{fish.priceChange}%
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        fish.demandLevel === 'high' ? 'bg-red-100 text-red-800' :
                        fish.demandLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {fish.demandLevel === 'high' ? 'উচ্চ' : fish.demandLevel === 'medium' ? 'মাঝারি' : 'কম'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        fish.supplyLevel === 'high' ? 'bg-green-100 text-green-800' :
                        fish.supplyLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {fish.supplyLevel === 'high' ? 'উচ্চ' : fish.supplyLevel === 'medium' ? 'মাঝারি' : 'কম'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className={`flex items-center gap-1 ${
                        fish.trend === 'up' ? 'text-green-600' : 
                        fish.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {fish.trend === 'up' ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : fish.trend === 'down' ? (
                          <TrendingDown className="h-4 w-4" />
                        ) : (
                          <div className="h-1 w-4 bg-gray-400 rounded"></div>
                        )}
                        <span className="text-xs">
                          {fish.trend === 'up' ? 'ঊর্ধ্বমুখী' : 
                           fish.trend === 'down' ? 'নিম্নমুখী' : 'স্থিতিশীল'}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Location Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>অঞ্চলভিত্তিক পরিসংখ্যান</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>অঞ্চল</TableHead>
                  <TableHead>জেলের সংখ্যা</TableHead>
                  <TableHead>মোট মূল্য</TableHead>
                  <TableHead>গড় মূল্য</TableHead>
                  <TableHead>অংশীদারিত্ব</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {locationStats.map((location, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{location.location}</TableCell>
                    <TableCell>{location.fishermen}</TableCell>
                    <TableCell>{location.totalValue.toLocaleString()} ৳</TableCell>
                    <TableCell>{location.avgValue.toLocaleString()} ৳</TableCell>
                    <TableCell>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{width: `${(location.totalValue / totalValue) * 100}%`}}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 mt-1">
                        {Math.round((location.totalValue / totalValue) * 100)}%
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
