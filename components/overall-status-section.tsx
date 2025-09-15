"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useFishData } from "@/contexts/fish-data-context"
import { Fish, Users, Store, DollarSign, Truck, Clock, Building2 } from "lucide-react"

// Data for overview cards (from screenshot)
const overviewData = [
  { name: "সক্রিয় জেলে", value: 8, icon: Users, color: "text-blue-500", change: "+১ গত সপ্তাহের তুলনায়" },
  { name: "সক্রিয় আড়ত", value: 8, icon: Store, color: "text-green-500", change: "পরিবর্তন নেই" },
  {
    name: "মোট পরিবহন",
    value: "১,৭৫০ কেজি",
    icon: Truck,
    color: "text-orange-500",
    change: "+৫৫০ কেজি গত সপ্তাহের তুলনায়",
  },
  { name: "গড় দাম", value: "১,১৭৫ ৳", icon: DollarSign, color: "text-purple-500", change: "+২.২% গত সপ্তাহের তুলনায়" },
]

// Data for Supply Details table (from screenshot)
const supplyDetails = [
  { area: "ঢাকা", supply: "৪০%", demand: "৫০%", status: "ঘাটতি" },
  { area: "চট্টগ্রাম", supply: "২৫%", demand: "২০%", status: "উদ্বৃত্ত" },
  { area: "খুলনা", supply: "১৫%", demand: "১৫%", status: "সুষম" },
  { area: "রাজশাহী", supply: "৫%", demand: "১০%", status: "ঘাটতি" },
  { area: "সিলেট", supply: "১৫%", demand: "৫%", status: "উদ্বৃত্ত" },
]

// Data for Fish Name Analysis (from screenshot)
const fishAnalysis = [
  { name: "ইলিশ", price: "১,২০০ টাকা/কেজি", change: "+২.৫%" },
  { name: "রুই", price: "৩৫০ টাকা/কেজি", change: "-১.০%" },
  { name: "কাতলা", price: "৩৮০ টাকা/কেজি", change: "+০.৫%" },
]

// Data for Recent Activities (from screenshot)
const recentActivities = [
  { icon: Users, text: "আব্দুল করিম (জেলে) ১৫০ কেজি ইলিশ মাছ ঢাকা কাওরান বাজার আড়তে পাঠাচ্ছেন", time: "১০ মিনিট আগে" },
  { icon: Building2, text: "ঢাকা কাওরান বাজার আড়ত ইলিশ মাছের দাম ১,২০০ টাকা/কেজি নির্ধারণ করেছে", time: "৩০ মিনিট আগে" },
  { icon: Users, text: "নাজমুল হাসান (জেলে) ১৮০ কেজি কাতলা মাছ ঢাকা কাওরান বাজারে পৌঁছেছেন", time: "১ ঘন্টা আগে" },
  { icon: Truck, text: "কামরুল ইসলাম (জেলে) চট্টগ্রাম ফিশারি ঘাটে যাওয়ার পথে বিলম্বিত হয়েছেন", time: "২ ঘন্টা আগে" },
]

// Existing chart data (keeping for additional insights)
const monthlyProductionData = [
  { month: "জানু", production: 450, sales: 420 },
  { month: "ফেব্রু", production: 480, sales: 450 },
  { month: "মার্চ", production: 520, sales: 500 },
  { month: "এপ্রিল", production: 500, sales: 480 },
  { month: "মে", production: 550, sales: 530 },
  { month: "জুন", production: 580, sales: 560 },
]

const fishTypeSalesData = [
  { name: "রুই", sales: 1200 },
  { name: "কাতলা", sales: 900 },
  { name: "ইলিশ", sales: 750 },
  { name: "পাঙ্গাস", sales: 600 },
  { name: "তেলাপিয়া", sales: 500 },
  { name: "অন্যান্য", sales: 1250 },
]

export function OverallStatusSection() {
  const { 
    getFishermenData, 
    getTotalFishCount, 
    getTotalQuantity, 
    getTotalMarketValue,
    getAveragePrice,
    getTopFishByValue,
    getLocationStats,
    getMarketData
  } = useFishData()
  
  const fishermenData = getFishermenData()
  const marketData = getMarketData()
  const topFish = getTopFishByValue()
  const locationStats = getLocationStats()
  const totalValue = getTotalMarketValue()
  const avgPrice = getAveragePrice()
  
  // Dynamic overview data based on real fish data
  const dynamicOverviewData = [
    { 
      name: "সক্রিয় জেলে", 
      value: fishermenData.length, 
      icon: Users, 
      color: "text-blue-500", 
      change: fishermenData.length > 0 ? `${fishermenData.length} জন সক্রিয়` : "কোন জেলে নেই" 
    },
    { 
      name: "সক্রিয় আড়ত", 
      value: 8, 
      icon: Store, 
      color: "text-green-500", 
      change: "পরিবর্তন নেই" 
    },
    {
      name: "মোট পরিবহন",
      value: getTotalQuantity(),
      icon: Truck,
      color: "text-orange-500",
      change: `${getTotalFishCount()} প্রকার মাছ`,
    },
    { 
      name: "গড় দাম", 
      value: `${avgPrice} ৳/কেজি`, 
      icon: DollarSign, 
      color: "text-purple-500", 
      change: `মোট মূল্য: ${Math.round(totalValue).toLocaleString()} ৳` 
    },
  ]

  // Dynamic supply details based on location stats
  const dynamicSupplyDetails = locationStats.length > 0 ? locationStats.map(location => ({
    area: location.location,
    supply: `${Math.round((location.totalValue / totalValue) * 100)}%`,
    demand: `${Math.round((location.fishermen / fishermenData.length) * 100)}%`,
    status: location.totalValue > (totalValue / locationStats.length) ? "উদ্বৃত্ত" : "ঘাটতি"
  })) : supplyDetails

  // Dynamic fish analysis based on top fish
  const dynamicFishAnalysis = topFish.length > 0 ? topFish.slice(0, 3).map(fish => {
    const marketInfo = marketData.find(m => m.fishName === fish.name)
    return {
      name: fish.name,
      price: `${marketInfo?.currentPrice || 0} টাকা/কেজি`,
      change: marketInfo ? `${marketInfo.priceChange > 0 ? '+' : ''}${marketInfo.priceChange}%` : "+০%"
    }
  }) : fishAnalysis

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold mb-4">সামগ্রিক অবস্থা</h2>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dynamicOverviewData.map((item, index) => (
          <Card key={index} className="p-4 flex items-center gap-4">
            <div className={`p-3 rounded-full ${item.color} bg-opacity-10 dark:bg-opacity-20`}>
              <item.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{item.name}</p>
              <h3 className="text-2xl font-bold">{item.value}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">{item.change}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Supply Details Table */}
        <Card className="p-4">
          <CardHeader>
            <CardTitle>সরবরাহ বিবরণ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>এলাকা</TableHead>
                    <TableHead>সরবরাহ</TableHead>
                    <TableHead>চাহিদা</TableHead>
                    <TableHead>অবস্থা</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dynamicSupplyDetails.map((detail, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{detail.area}</TableCell>
                      <TableCell>{detail.supply}</TableCell>
                      <TableCell>{detail.demand}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            detail.status === "ঘাটতি"
                              ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-500"
                              : detail.status === "উদ্বৃত্ত"
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-500"
                                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-500"
                          }`}
                        >
                          {detail.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Fish Name Analysis */}
        <Card className="p-4">
          <CardHeader>
            <CardTitle>মাছের নাম বিশ্লেষণ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dynamicFishAnalysis.map((fish, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-2 last:border-b-0 last:pb-0">
                  <div className="flex items-center gap-2">
                    <Fish className="h-5 w-5 text-primary" />
                    <span className="font-medium">{fish.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{fish.price}</p>
                    <p className={`text-sm ${fish.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                      {fish.change}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-right">
              <a href="#" className="text-primary hover:underline text-sm">
                সব দেখুন
              </a>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card className="p-4">
        <CardHeader>
          <CardTitle>সাম্প্রতিক কার্যক্রম</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                  <activity.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 dark:text-gray-200">{activity.text}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Existing Charts (kept for additional insights) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4">
          <CardHeader>
            <CardTitle>মাসিক উৎপাদন ও বিক্রয় (টন)</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                production: {
                  label: "উৎপাদন",
                  color: "hsl(var(--chart-1))",
                },
                sales: {
                  label: "বিক্রয়",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyProductionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line type="monotone" dataKey="production" stroke="var(--color-production)" name="উৎপাদন" />
                  <Line type="monotone" dataKey="sales" stroke="var(--color-sales)" name="বিক্রয়" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardHeader>
            <CardTitle>মাছের ধরন অনুযায়ী বিক্রয়</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                sales: {
                  label: "বিক্রয়",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={fishTypeSalesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="sales" fill="var(--color-sales)" name="বিক্রয়" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
