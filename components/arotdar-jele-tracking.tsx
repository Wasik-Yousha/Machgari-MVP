"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, User, LocateFixed, MapPin, Navigation, Clock, Truck, Handshake } from "lucide-react"

interface ArotdarTrackingData {
  id: string
  name: string
  phone: string
  origin: string
  destination: string
  fishType: string
  quantity: string
  dealPrice: number
  status: string
  estimatedTime: string
  route: string[]
  currentLocation: string
  progress: number
  dealDate: string
  expectedDelivery: string
}

// Fake tracking data for fishermen who have deals with this Arotdar
const arotdarDealsTracking: ArotdarTrackingData[] = [
  {
    id: "জেলে-০০১",
    name: "আব্দুল করিম",
    phone: "০১৭১২-৩৪৫৬৭৮",
    origin: "চাঁদপুর",
    destination: "কাওরান বাজার আড়ত",
    fishType: "রুই, কাতলা",
    quantity: "২৫ কেজি",
    dealPrice: 8750,
    status: "চলমান",
    estimatedTime: "১ ঘন্টা ২০ মিনিট",
    route: ["চাঁদপুর", "নারায়ণগঞ্জ", "ঢাকা"],
    currentLocation: "নারায়ণগঞ্জ",
    progress: 65,
    dealDate: "আজ সকাল ৮:৩০",
    expectedDelivery: "আজ দুপুর ২:০০"
  },
  {
    id: "জেলে-০০২",
    name: "মোহাম্মদ আলী",
    phone: "০১৮১২-৩৪৫৬৭৮",
    origin: "বরিশাল",
    destination: "কাওরান বাজার আড়ত",
    fishType: "ইলিশ, পাঙ্গাস",
    quantity: "২৮ কেজি",
    dealPrice: 12600,
    status: "চলমান",
    estimatedTime: "২ ঘন্টা ১০ মিনিট",
    route: ["বরিশাল", "ফরিদপুর", "ঢাকা"],
    currentLocation: "ফরিদপুর",
    progress: 40,
    dealDate: "আজ সকাল ৭:১৫",
    expectedDelivery: "আজ বিকাল ৪:৩০"
  },
  {
    id: "জেলে-০০৪",
    name: "নাসির উদ্দিন",
    phone: "০১৬১২-৩৪৫৬৭৮",
    origin: "সিলেট",
    destination: "কাওরান বাজার আড়ত",
    fishType: "রুই, কাতলা",
    quantity: "৪০ কেজি",
    dealPrice: 15200,
    status: "সম্পন্ন",
    estimatedTime: "পৌঁছে গেছে",
    route: ["সিলেট", "কিশোরগঞ্জ", "ঢাকা"],
    currentLocation: "ঢাকা",
    progress: 100,
    dealDate: "গতকাল সন্ধ্যা ৬:০০",
    expectedDelivery: "আজ সকাল ১০:০০"
  },
  {
    id: "জেলে-০০৫",
    name: "জাহিদুল ইসলাম",
    phone: "০১৮৮৮-৯৯৭৭৬৬",
    origin: "খুলনা",
    destination: "কাওরান বাজার আড়ত",
    fishType: "চিংড়ি, পার্শে",
    quantity: "১৮ কেজি",
    dealPrice: 9900,
    status: "বিলম্বিত",
    estimatedTime: "৩ ঘন্টা (বিলম্বিত)",
    route: ["খুলনা", "যশোর", "ঢাকা"],
    currentLocation: "যশোর",
    progress: 30,
    dealDate: "আজ ভোর ৫:০০",
    expectedDelivery: "আজ সকাল ১১:০০"
  },
  {
    id: "জেলে-০০৬",
    name: "রফিকুল ইসলাম",
    phone: "০১৯১২-৩৪৫৬৭৮",
    origin: "পটুয়াখালী",
    destination: "কাওরান বাজার আড়ত",
    fishType: "ইলিশ, কই",
    quantity: "২২ কেজি",
    dealPrice: 13200,
    status: "চলমান",
    estimatedTime: "১ ঘন্টা ৪৫ মিনিট",
    route: ["পটুয়াখালী", "বরিশাল", "ফরিদপুর", "ঢাকা"],
    currentLocation: "বরিশাল",
    progress: 50,
    dealDate: "আজ সকাল ৯:১৫",
    expectedDelivery: "আজ দুপুর ৩:০০"
  }
]

export function ArotdarJeleTracking() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("সব অবস্থা")
  const [selectedFisherman, setSelectedFisherman] = useState<ArotdarTrackingData | null>(null)

  // Filter fishermen based on search and status
  const filteredDeals = arotdarDealsTracking.filter(deal => {
    const matchesSearch = !searchTerm || 
      deal.name.includes(searchTerm) ||
      deal.id.includes(searchTerm) ||
      deal.phone.includes(searchTerm) ||
      deal.origin.includes(searchTerm) ||
      deal.fishType.includes(searchTerm)

    const matchesStatus = filterStatus === "সব অবস্থা" || deal.status === filterStatus

    return matchesSearch && matchesStatus
  })

  const handleTrack = (deal: ArotdarTrackingData) => {
    setSelectedFisherman(deal)
  }

  // Calculate summary stats
  const totalDeals = arotdarDealsTracking.length
  const activeDeals = arotdarDealsTracking.filter(d => d.status === "চলমান").length
  const completedDeals = arotdarDealsTracking.filter(d => d.status === "সম্পন্ন").length
  const delayedDeals = arotdarDealsTracking.filter(d => d.status === "বিলম্বিত").length
  const totalValue = arotdarDealsTracking.reduce((sum, deal) => sum + deal.dealPrice, 0)

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold mb-4">আমার জেলে ট্র্যাকিং</h2>
      <p className="text-gray-600 dark:text-gray-400">
        যে জেলেদের সাথে আমার চুক্তি আছে তাদের ডেলিভারি ট্র্যাক করুন।
      </p>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30">
              <Handshake className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">মোট চুক্তি</p>
              <p className="text-xl font-bold">{totalDeals}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/30">
              <Truck className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">চলমান</p>
              <p className="text-xl font-bold">{activeDeals}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
              <Clock className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">সম্পন্ন</p>
              <p className="text-xl font-bold">{completedDeals}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/30">
              <Navigation className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">বিলম্বিত</p>
              <p className="text-xl font-bold">{delayedDeals}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/30">
              <MapPin className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">মোট মূল্য</p>
              <p className="text-xl font-bold">{totalValue.toLocaleString()} ৳</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Live Tracking Map */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            লাইভ ডেলিভারি ট্র্যাকিং
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg p-6 min-h-[300px] relative overflow-hidden">
            {/* Fake map background */}
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%" viewBox="0 0 800 400">
                <path
                  d="M100 300 Q200 280 300 290 Q400 285 500 280 Q600 275 650 260 L670 240 Q680 220 675 200 Q670 180 650 170 Q600 160 550 165 Q450 170 350 175 Q250 180 150 190 Q100 200 80 220 Q70 240 75 260 Q80 280 100 300 Z"
                  fill="currentColor"
                  className="text-green-200"
                />
              </svg>
            </div>

            {/* Active deliveries */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDeals.slice(0, 6).map((deal) => (
                <div
                  key={deal.id}
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-sm">{deal.name}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      deal.status === "চলমান" ? "bg-blue-100 text-blue-700" :
                      deal.status === "সম্পন্ন" ? "bg-green-100 text-green-700" :
                      "bg-red-100 text-red-700"
                    }`}>
                      {deal.status}
                    </span>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="mb-2">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>{deal.origin}</span>
                      <span>আমার আড়ত</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          deal.status === "চলমান" ? "bg-blue-500" :
                          deal.status === "সম্পন্ন" ? "bg-green-500" :
                          "bg-red-500"
                        }`}
                        style={{ width: `${deal.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      বর্তমান: {deal.currentLocation}
                    </div>
                  </div>

                  {/* Deal info */}
                  <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                    <div>{deal.fishType} - {deal.quantity}</div>
                    <div className="font-semibold text-green-600">{deal.dealPrice.toLocaleString()} ৳</div>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {deal.estimatedTime}
                    </span>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleTrack(deal)}
                      className="text-xs h-6 px-2"
                    >
                      <Navigation className="h-3 w-3 mr-1" />
                      বিস্তারিত
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm text-xs">
              <div className="flex gap-4">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>চলমান</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>সম্পন্ন</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>বিলম্বিত</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card className="p-4">
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="জেলের নাম বা মাছের ধরন দিয়ে খুঁজুন..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="অবস্থা নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="সব অবস্থা">সব অবস্থা</SelectItem>
                  <SelectItem value="চলমান">চলমান</SelectItem>
                  <SelectItem value="সম্পন্ন">সম্পন্ন</SelectItem>
                  <SelectItem value="বিলম্বিত">বিলম্বিত</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Deals Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            আমার চুক্তির বিস্তারিত
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>জেলে তথ্য</TableHead>
                  <TableHead>মাছ ও পরিমাণ</TableHead>
                  <TableHead>চুক্তির মূল্য</TableHead>
                  <TableHead>রুট ও অগ্রগতি</TableHead>
                  <TableHead>ডেলিভারি সময়</TableHead>
                  <TableHead>অবস্থা</TableHead>
                  <TableHead className="text-right">পদক্ষেপ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDeals.length > 0 ? (
                  filteredDeals.map((deal) => (
                    <TableRow key={deal.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <User className="h-5 w-5 text-gray-500" />
                          <div>
                            <div className="font-semibold">{deal.name}</div>
                            <div className="text-xs text-gray-500">{deal.phone}</div>
                            <div className="text-xs text-gray-500">থেকে: {deal.origin}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{deal.fishType}</div>
                          <div className="text-sm text-gray-500">{deal.quantity}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-semibold text-green-600">
                          {deal.dealPrice.toLocaleString()} ৳
                        </div>
                        <div className="text-xs text-gray-500">
                          চুক্তি: {deal.dealDate}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <div className="text-sm text-gray-600">
                            বর্তমান: {deal.currentLocation}
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all ${
                                deal.status === "চলমান" ? "bg-blue-500" :
                                deal.status === "সম্পন্ন" ? "bg-green-500" :
                                "bg-red-500"
                              }`}
                              style={{ width: `${deal.progress}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-gray-500">
                            {deal.progress}% সম্পন্ন
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="text-sm font-medium">
                            প্রত্যাশিত: {deal.expectedDelivery}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                            <Clock className="h-3 w-3" />
                            {deal.estimatedTime}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            deal.status === "চলমান"
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-500"
                              : deal.status === "সম্পন্ন"
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-500"
                                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-500"
                          }`}
                        >
                          {deal.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleTrack(deal)}
                        >
                          <LocateFixed className="h-4 w-4 mr-1" />
                          ট্র্যাক করুন
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-gray-500 py-8">
                      কোন চুক্তি পাওয়া যায়নি।
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Selected Deal Details Modal */}
      {selectedFisherman && (
        <Card className="border-2 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Navigation className="h-5 w-5" />
                {selectedFisherman.name} এর চুক্তির বিস্তারিত
              </span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedFisherman(null)}
              >
                ✕
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">ডেলিভারি রুট</h4>
                <div className="space-y-2">
                  {selectedFisherman.route.map((location, index) => (
                    <div key={index} className={`flex items-center gap-2 p-2 rounded ${
                      location === selectedFisherman.currentLocation 
                        ? 'bg-blue-100 dark:bg-blue-900/30 font-semibold' 
                        : index < selectedFisherman.route.indexOf(selectedFisherman.currentLocation)
                          ? 'bg-green-50 dark:bg-green-900/20 text-green-700'
                          : 'bg-gray-50 dark:bg-gray-800'
                    }`}>
                      <div className={`w-3 h-3 rounded-full ${
                        location === selectedFisherman.currentLocation 
                          ? 'bg-blue-500 animate-pulse' 
                          : index < selectedFisherman.route.indexOf(selectedFisherman.currentLocation)
                            ? 'bg-green-500'
                            : 'bg-gray-300'
                      }`}></div>
                      <span>{location}</span>
                      {location === selectedFisherman.currentLocation && (
                        <span className="text-xs text-blue-600 ml-2">(বর্তমান)</span>
                      )}
                    </div>
                  ))}
                  <div className="flex items-center gap-2 p-2 rounded bg-green-100 dark:bg-green-900/30 font-semibold">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    <span>কাওরান বাজার আড়ত (আমার আড়ত)</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">চুক্তির তথ্য</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                    <div className="text-sm text-gray-600 dark:text-gray-400">মাছের ধরন ও পরিমাণ</div>
                    <div className="font-medium">{selectedFisherman.fishType}</div>
                    <div className="text-sm text-gray-500">{selectedFisherman.quantity}</div>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                    <div className="text-sm text-gray-600 dark:text-gray-400">চুক্তির মূল্য</div>
                    <div className="font-medium text-green-600">{selectedFisherman.dealPrice.toLocaleString()} ৳</div>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                    <div className="text-sm text-gray-600 dark:text-gray-400">চুক্তির তারিখ</div>
                    <div className="font-medium">{selectedFisherman.dealDate}</div>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                    <div className="text-sm text-gray-600 dark:text-gray-400">প্রত্যাশিত ডেলিভারি</div>
                    <div className="font-medium">{selectedFisherman.expectedDelivery}</div>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                    <div className="text-sm text-gray-600 dark:text-gray-400">যোগাযোগ</div>
                    <div className="font-medium">{selectedFisherman.phone}</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
