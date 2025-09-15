"use client"

import { useState } from "react"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GovernmentProfile } from "@/components/government-profile"
import { OverallStatusSection } from "@/components/overall-status-section"
import { BasePriceDeterminationSection } from "@/components/base-price-determination-section"
import { FishermanTrackingSection } from "@/components/fisherman-tracking-section"
import { ArotdarMonitoringSection } from "@/components/arotdar-monitoring-section"
import { PriceAnalysisSection } from "@/components/price-analysis-section"
import { MarketAnalyticsSection } from "@/components/market-analytics-section"

// Sample Government Officer profile data
const governmentProfile = {
  name: "ড. ফাহমিদা বেগম",
  role: "মৎস্য কর্মকর্তা",
  department: "মৎস্য অধিদপ্তর",
  phone: "০১৭০০০০০০০০",
  email: "fahmidabegum@fisheries.gov.bd",
  joinDate: "জানুয়ারি ২০১৫",
  areaOfResponsibility: "ঢাকা বিভাগ",
  avatar: "/placeholder.svg?height=100&width=100",
}

export default function GovernmentDashboardPage() {
  const [showProfile, setShowProfile] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-background">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">সরকারি ড্যাশবোর্ড</h1>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => setShowProfile(!showProfile)} className="flex items-center gap-2">
              <Image
                src={governmentProfile.avatar || "/placeholder.svg"}
                alt="Profile"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span>{governmentProfile.name}</span>
            </Button>
          </div>
        </div>

        {showProfile && (
          <Card className="mb-8">
            <CardContent className="pt-6">
              <GovernmentProfile user={governmentProfile} />
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="overall-status" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 mb-8 h-auto">
            <TabsTrigger value="overall-status" className="text-lg py-3">
              সামগ্রিক অবস্থা
            </TabsTrigger>
            <TabsTrigger value="base-price" className="text-lg py-3">
              বেস মূল্য নির্ধারণ
            </TabsTrigger>
            <TabsTrigger value="fisherman-tracking" className="text-lg py-3">
              জেলে ট্র্যাকিং
            </TabsTrigger>
            <TabsTrigger value="arotdar-monitoring" className="text-lg py-3">
              আড়ত মনিটরিং
            </TabsTrigger>
            <TabsTrigger value="price-analysis" className="text-lg py-3">
              দাম বিশ্লেষণ
            </TabsTrigger>
            <TabsTrigger value="market-analytics" className="text-lg py-3">
              বাজার বিশ্লেষণ
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overall-status">
            <OverallStatusSection />
          </TabsContent>

          <TabsContent value="base-price">
            <BasePriceDeterminationSection />
          </TabsContent>

          <TabsContent value="fisherman-tracking">
            <FishermanTrackingSection />
          </TabsContent>

          <TabsContent value="arotdar-monitoring">
            <ArotdarMonitoringSection />
          </TabsContent>

          <TabsContent value="price-analysis">
            <PriceAnalysisSection />
          </TabsContent>

          <TabsContent value="market-analytics">
            <MarketAnalyticsSection />
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}
