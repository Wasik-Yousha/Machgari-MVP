"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArotdarProfile } from "@/components/arotdar-profile"
import { PriceManagementCard } from "@/components/price-management-card"
import { FishermanCard } from "@/components/fisherman-card"
import { ArotdarJeleTracking } from "@/components/arotdar-jele-tracking"
import { ArotdarTransactionsTab } from "@/components/arotdar-transactions-tab"
import { useFishData } from "@/contexts/fish-data-context"
import { Search, Filter } from "lucide-react"

// Sample আড়তদার profile data
const arotdarProfile = {
  name: "ঢাকা পূর্ব আড়ত",
  role: "আড়তদার",
  phone: "০১৭১২৩৪৫৬৭৮",
  location: "কাওরান বাজার, ঢাকা",
  experience: "১৫ বছর",
  shopName: "ঢাকা পূর্ব আড়ত এন্টারপ্রাইজ",
  license: "ট্রেড লাইসেন্স: ঢাকা-১২৩৪৫",
  joinDate: "মার্চ ২০১৮",
  totalPurchase: "৫০০০ কেজি",
  avatar: "/placeholder.svg?height=100&width=100",
}

// Sample fish price data with base prices
const fishPrices = [
  {
    id: 1,
    name: "রুই",
    basePrice: 350,
    currentPrice: 360,
    unit: "কেজি",
    lastUpdated: "২ ঘন্টা আগে",
    priceChange: 2.8,
  },
  {
    id: 2,
    name: "কাতলা",
    basePrice: 380,
    currentPrice: 375,
    unit: "কেজি",
    lastUpdated: "১ ঘন্টা আগে",
    priceChange: -1.3,
  },
  {
    id: 3,
    name: "ইলিশ",
    basePrice: 1200,
    currentPrice: 1250,
    unit: "কেজি",
    lastUpdated: "৩০ মিনিট আগে",
    priceChange: 4.2,
  },
  {
    id: 4,
    name: "পাঙ্গাস",
    basePrice: 180,
    currentPrice: 185,
    unit: "কেজি",
    lastUpdated: "১ ঘন্টা আগে",
    priceChange: 2.8,
  },
  {
    id: 5,
    name: "তেলাপিয়া",
    basePrice: 220,
    currentPrice: 210,
    unit: "কেজি",
    lastUpdated: "৪৫ মিনিট আগে",
    priceChange: -4.5,
  },
  {
    id: 6,
    name: "শিং",
    basePrice: 550,
    currentPrice: 580,
    unit: "কেজি",
    lastUpdated: "২০ মিনিট আগে",
    priceChange: 5.5,
  },
]

export default function ArotdardPage() {
  const { getFishermenData } = useFishData()
  const fishermenData = getFishermenData()
  const [showProfile, setShowProfile] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterArea, setFilterArea] = useState("সব এলাকা")
  const [filterFish, setFilterFish] = useState("সব মাছ")
  const [filteredFishermen, setFilteredFishermen] = useState(fishermenData)

  // Update filtered fishermen when data changes
  useEffect(() => {
    const currentFishermenData = getFishermenData()
    setFilteredFishermen(currentFishermenData)
  }, [getFishermenData])

  // Filter fishermen based on search and filters
  const handleSearch = () => {
    const currentFishermenData = getFishermenData()
    let filtered = currentFishermenData

    if (searchTerm) {
      filtered = filtered.filter(
        (fisherman) =>
          fisherman.name.includes(searchTerm) ||
          fisherman.id.includes(searchTerm) ||
          fisherman.location.includes(searchTerm),
      )
    }

    if (filterArea !== "সব এলাকা") {
      filtered = filtered.filter((fisherman) => fisherman.location === filterArea)
    }

    if (filterFish !== "সব মাছ") {
      filtered = filtered.filter((fisherman) => fisherman.catches.some((catch_) => catch_.fish === filterFish))
    }

    setFilteredFishermen(filtered)
  }

  const handlePriceUpdate = (fishId: number, newPrice: number) => {
    // Handle price update logic here
    console.log(`Updating price for fish ${fishId} to ${newPrice}`)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-background">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">আড়তদার ড্যাশবোর্ড</h1>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => setShowProfile(!showProfile)} className="flex items-center gap-2">
              <Image
                src={arotdarProfile.avatar || "/placeholder.svg"}
                alt="Profile"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span>{arotdarProfile.name}</span>
            </Button>
          </div>
        </div>

        {showProfile && (
          <Card className="mb-8">
            <CardContent className="pt-6">
              <ArotdarProfile user={arotdarProfile} />
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="transactions" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="transactions" className="text-lg py-3">
              লেনদেন ব্যবস্থাপনা
            </TabsTrigger>
            <TabsTrigger value="my-prices" className="text-lg py-3">
              আমার আড়তের দর
            </TabsTrigger>
            <TabsTrigger value="available-fish" className="text-lg py-3">
              বিক্রয়ের জন্য উপলব্ধ মাছ
            </TabsTrigger>
            <TabsTrigger value="jele-tracking" className="text-lg py-3">
              জেলে ট্র্যাকিং
            </TabsTrigger>
          </TabsList>

          <TabsContent value="transactions">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold">লেনদেন ব্যবস্থাপনা</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                জেলেদের বিক্রয় প্রস্তাব দেখুন, দর-কষাকষি করুন এবং লেনদেন সম্পন্ন করুন
              </p>
            </div>
            <ArotdarTransactionsTab />
          </TabsContent>

          <TabsContent value="my-prices">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">আমার আড়তের দর</h2>
              <p className="text-gray-600 dark:text-gray-400">
                মৎস্য অধিদপ্তরের নির্ধারিত মূল্য থেকে ১৫% পর্যন্ত কম বা বেশি দাম নির্ধারণ করতে পারবেন
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fishPrices.map((fish) => (
                <PriceManagementCard key={fish.id} fish={fish} onPriceUpdate={handlePriceUpdate} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="available-fish">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">বিক্রয়ের জন্য উপলব্ধ মাছ</h2>

              {/* Search and Filter Section */}
              <Card className="p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="জেলের নাম, আইডি বা এলাকা দিয়ে খুঁজুন"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <Select value={filterArea} onValueChange={setFilterArea}>
                      <SelectTrigger>
                        <SelectValue placeholder="এলাকা নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="সব এলাকা">সব এলাকা</SelectItem>
                        <SelectItem value="চাঁদপুর">চাঁদপুর</SelectItem>
                        <SelectItem value="বরিশাল">বরিশাল</SelectItem>
                        <SelectItem value="খুলনা">খুলনা</SelectItem>
                        <SelectItem value="সিলেট">সিলেট</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Select value={filterFish} onValueChange={setFilterFish}>
                      <SelectTrigger>
                        <SelectValue placeholder="মাছের ধরন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="সব মাছ">সব মাছ</SelectItem>
                        <SelectItem value="রুই">রুই</SelectItem>
                        <SelectItem value="কাতলা">কাতলা</SelectItem>
                        <SelectItem value="ইলিশ">ইলিশ</SelectItem>
                        <SelectItem value="পাঙ্গাস">পাঙ্গাস</SelectItem>
                        <SelectItem value="তেলাপিয়া">তেলাপিয়া</SelectItem>
                        <SelectItem value="শিং">শিং</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="mt-4">
                  <Button onClick={handleSearch} className="bg-primary hover:bg-primary/90">
                    <Filter className="mr-2 h-4 w-4" />
                    খুঁজুন
                  </Button>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredFishermen.map((fisherman) => (
                <FishermanCard key={fisherman.id} fisherman={fisherman} />
              ))}
            </div>

            {filteredFishermen.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 text-lg">কোন জেলে পাওয়া যায়নি</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="jele-tracking">
            <ArotdarJeleTracking />
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}
