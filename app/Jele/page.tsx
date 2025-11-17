"use client"

import { useState } from "react"
import Image from "next/image"
// import { useSession } from "next-auth/react" // Commented out
// import { redirect } from "next/navigation" // Commented out
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FishEntryForm } from "@/components/fish-entry-form"
import { FishCard } from "@/components/fish-card"
import { WholesaleMarketCard } from "@/components/wholesale-market-card"
import { UserProfile } from "@/components/user-profile"
import { FarmingProfileManager } from "@/components/farming-profile-manager"
import { JeleTransactionsTab } from "@/components/jele-transactions-tab"
import { useFishData } from "@/contexts/fish-data-context"
import { Plus } from "lucide-react"

// Sample wholesale market data
const wholesaleMarkets = [
  {
    id: 1,
    name: "কাওরান বাজার আড়ত",
    location: "ঢাকা",
    distance: "৫ কিমি",
    prices: [
      { fish: "রুই", price: "৩৫০ টাকা/কেজি" },
      { fish: "কাতলা", price: "৩৮০ টাকা/কেজি" },
      { fish: "ইলিশ", price: "১২০০ টাকা/কেজি" },
    ],
    rating: 4.5,
    contact: "০১৭১২৩৪৫৬৭৮",
  },
  {
    id: 2,
    name: "চট্টগ্রাম মৎস্য আড়ত",
    location: "চট্টগ্রাম",
    distance: "১২০ কিমি",
    prices: [
      { fish: "রুই", price: "৩৬০ টাকা/কেজি" },
      { fish: "কাতলা", price: "৩৯০ টাকা/কেজি" },
      { fish: "ইলিশ", price: "১২৫০ টাকা/কেজি" },
    ],
    rating: 4.2,
    contact: "০১৮১২৩৪৫৬৭৮",
  },
  {
    id: 3,
    name: "খুলনা মৎস্য বাজার",
    location: "খুলনা",
    distance: "৮০ কিমি",
    prices: [
      { fish: "রুই", price: "৩৪০ টাকা/কেজি" },
      { fish: "কাতলা", price: "৩৭০ টাকা/কেজি" },
      { fish: "ইলিশ", price: "১১৮০ টাকা/কেজি" },
    ],
    rating: 4.7,
    contact: "০১৯১২৩৪৫৬৭৮",
  },
]

// User profile data - Now using a static profile for direct access
const staticUserProfile = {
  name: "আব্দুল করিম (জেলে)",
  role: "জেলে",
  phone: "০১৭১২৩৪৫৬৭৮",
  location: "চাঁদপুর",
  experience: "১০ বছর",
  boatName: "মা ইলিশ-১",
  joinDate: "জানুয়ারি ২০২০",
  totalCatch: "১২০০ কেজি",
  avatar: "/placeholder-user.jpg", // Using a placeholder image
}

export default function jelePage() {
  // const { data: session, status } = useSession() // Commented out
  const { fishEntries, addFishEntry } = useFishData()
  const [showAddForm, setShowAddForm] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [activeTab, setActiveTab] = useState("my-fish")
  const [selectedMarket, setSelectedMarket] = useState<any>(null)

  const handleAddFish = (newFish: any) => {
    addFishEntry(newFish)
    setShowAddForm(false)
  }

  const handleGoToMarket = (marketId: number) => {
    // Find the selected market
    const market = wholesaleMarkets.find(m => m.id === marketId)
    setSelectedMarket(market)
    // Switch to transactions tab when user wants to go to a market
    setActiveTab("transactions")
  }

  // Commented out session handling and route protection
  // if (status === "loading") {
  //   return <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-background"><p>Loading session...</p></div>;
  // }
  //
  // if (status === "unauthenticated" || !session || !session.user || session.user.role !== "জেলে") {
  //   redirect("/login");
  //   return null; 
  // }

  // Using static user profile directly
  const userProfileToDisplay = staticUserProfile;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-background">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">জেলে ড্যাশবোর্ড</h1>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => setShowProfile(!showProfile)} className="flex items-center gap-2">
              <Image
                src={userProfileToDisplay.avatar} // Changed to use static profile
                alt="Profile"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span>{userProfileToDisplay.name}</span> {/* Changed to use static profile */}
            </Button>
          </div>
        </div>

        {showProfile && (
          <Card className="mb-8">
            <CardContent className="pt-6">
            <UserProfile user={userProfileToDisplay} /> {/* Changed to use static profile */}
            </CardContent>
          </Card>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8 h-auto">
            <TabsTrigger value="my-fish" className="text-lg py-3">
              আমার ধরা মাছ
            </TabsTrigger>
            <TabsTrigger value="wholesale" className="text-lg py-3">
              আড়তের দর
            </TabsTrigger>
            <TabsTrigger value="transactions" className="text-lg py-3">
              লেনদেন
            </TabsTrigger>
            <TabsTrigger value="farming-profile" className="text-lg py-3">
              চাষের প্রোফাইল
            </TabsTrigger>
          </TabsList>

          <TabsContent value="my-fish">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-semibold">আমার ধরা মাছ</h2>
              <Button onClick={() => setShowAddForm(!showAddForm)} className="bg-primary hover:bg-primary/90">
                <Plus className="mr-2 h-4 w-4" /> নতুন মাছ যোগ করুন
              </Button>
            </div>

            {showAddForm && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>নতুন মাছের তথ্য যোগ করুন</CardTitle>
                </CardHeader>
                <CardContent>
                  <FishEntryForm onSubmit={handleAddFish} onCancel={() => setShowAddForm(false)} />
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fishEntries.map((fish) => (
                <FishCard key={fish.id} fish={fish} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="wholesale">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold">আড়তের দর</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                নিকটবর্তী আড়তগুলোর দাম দেখুন এবং আপনার পছন্দের আড়তে মাছ বিক্রি করুন
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {wholesaleMarkets.map((market) => (
                <WholesaleMarketCard 
                  key={market.id} 
                  market={market} 
                  onGoToMarket={handleGoToMarket}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="transactions">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold">মাছ বিক্রয় ও লেনদেন</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                আপনার মাছ বিক্রয় প্রস্তাব, দর-কষাকষি এবং লেনদেন ব্যবস্থাপনা করুন
              </p>
              {selectedMarket && (
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-blue-700 dark:text-blue-300 font-medium">
                    🎯 আপনি <strong>{selectedMarket.name}</strong> আড়তে যেতে চেয়েছেন।
                  </p>
                  <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                    এখানে আপনি এই আড়তে মাছ বিক্রয়ের জন্য লেনদেন শুরু করতে পারেন।
                  </p>
                </div>
              )}
            </div>
            <JeleTransactionsTab />
          </TabsContent>

          <TabsContent value="farming-profile">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold">চাষের প্রোফাইল</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                আপনার মাছ চাষের বিস্তারিত তথ্য যোগ করুন। এই তথ্যের ভিত্তিতে আপনি ব্যক্তিগতকৃত পরামর্শ পাবেন।
              </p>
            </div>
            <FarmingProfileManager />
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}
