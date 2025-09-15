"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, User, LocateFixed, MapPin, Navigation, Clock, Truck } from "lucide-react"

interface TrackingData {
  id: string
  name: string
  phone: string
  origin: string
  destination: string
  fishType: string
  status: string
  estimatedTime: string
  route: string[]
  currentLocation: string
  progress: number
}

// Fake tracking data with routes
const fishermenTrackingData: TrackingData[] = [
  {
    id: "০০১",
    name: "আব্দুল করিম",
    phone: "০১৭১২-৩৪৫৬৭৮",
    origin: "চট্টগ্রাম",
    destination: "ঢাকা কাওরান বাজার আড়ত",
    fishType: "ইলিশ",
    status: "চলমান",
    estimatedTime: "৪০ মিনিট",
    route: ["চট্টগ্রাম", "ফেনী", "কুমিল্লা", "নারায়ণগঞ্জ", "ঢাকা"],
    currentLocation: "কুমিল্লা",
    progress: 60
  },
  {
    id: "০০২",
    name: "রফিক আহমেদ",
    phone: "০১৮১২-৩৪৫৬৭৮",
    origin: "খুলনা",
    destination: "ঢাকা কাওরান বাজার আড়ত",
    fishType: "রুই, কাতলা",
    status: "চলমান",
    estimatedTime: "১ ঘন্টা ১৫ মিনিট",
    route: ["খুলনা", "যশোর", "ফরিদপুর", "মানিকগঞ্জ", "ঢাকা"],
    currentLocation: "ফরিদপুর",
    progress: 45
  },
  {
    id: "০০৩",
    name: "মাহমুদুল হাসান",
    phone: "০১৯১২-৩৪৫৬৭৮",
    origin: "বরিশাল",
    destination: "ঢাকা কাওরান বাজার আড়ত",
    fishType: "কাতলা, মৃগেল",
    status: "সম্পন্ন",
    estimatedTime: "পৌঁছে গেছে",
    route: ["বরিশাল", "গোপালগঞ্জ", "ফরিদপুর", "মানিকগঞ্জ", "ঢাকা"],
    currentLocation: "ঢাকা",
    progress: 100
  },
  {
    id: "০০৪",
    name: "কামরুল ইসলাম",
    phone: "০১৬১২-৩৪৫৬৭৮",
    origin: "কক্সবাজার",
    destination: "চট্টগ্রাম ফিশারি ঘাট",
    fishType: "চিংড়ি, পোনা মাছ",
    status: "বিলম্বিত",
    estimatedTime: "২ ঘন্টা ৩০ মিনিট",
    route: ["কক্সবাজার", "চকরিয়া", "চট্টগ্রাম"],
    currentLocation: "চকরিয়া",
    progress: 30
  },
  {
    id: "০০৫",
    name: "সাব্বির ইসলাম",
    phone: "০১৫১২-৩৪৫৬৭৮",
    origin: "সিলেট",
    destination: "ঢাকা কাওরান বাজার আড়ত",
    fishType: "রুই, কাতলা, মৃগেল",
    status: "চলমান",
    estimatedTime: "৩০ মিনিট",
    route: ["সিলেট", "হবিগঞ্জ", "কিশোরগঞ্জ", "ঢাকা"],
    currentLocation: "কিশোরগঞ্জ",
    progress: 85
  },
  {
    id: "০০৬",
    name: "নাসির উদ্দিন",
    phone: "০১৭৫৫-১২৩৪৫৬",
    origin: "পটুয়াখালী",
    destination: "বরিশাল আড়ত",
    fishType: "ইলিশ, পারশে",
    status: "চলমান",
    estimatedTime: "১ ঘন্টা",
    route: ["পটুয়াখালী", "বরগুনা", "বরিশাল"],
    currentLocation: "বরগুনা",
    progress: 50
  },
  {
    id: "০০৭",
    name: "জাহিদুল ইসলাম",
    phone: "০১৮৮৮-৯৯৭৭৬৬",
    origin: "রাঙ্গামাটি",
    destination: "চট্টগ্রাম ফিশারি ঘাট",
    fishType: "পাঙ্গাস, তেলাপিয়া",
    status: "চলমান",
    estimatedTime: "৪৫ মিনিট",
    route: ["রাঙ্গামাটি", "খাগড়াছড়ি", "চট্টগ্রাম"],
    currentLocation: "খাগড়াছড়ি",
    progress: 70
  }
]

export function FishermanTrackingSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterLocation, setFilterLocation] = useState("সব এলাকা")
  const [filterStatus, setFilterStatus] = useState("সব অবস্থা")
  const [selectedFisherman, setSelectedFisherman] = useState<TrackingData | null>(null)

  // Filter fishermen based on search and filters
  const filteredFishermen = fishermenTrackingData.filter(fisherman => {
    const matchesSearch = !searchTerm || 
      fisherman.name.includes(searchTerm) ||
      fisherman.id.includes(searchTerm) ||
      fisherman.phone.includes(searchTerm) ||
      fisherman.origin.includes(searchTerm) ||
      fisherman.destination.includes(searchTerm) ||
      fisherman.fishType.includes(searchTerm)

    const matchesLocation = filterLocation === "সব এলাকা" || fisherman.origin === filterLocation
    const matchesStatus = filterStatus === "সব অবস্থা" || fisherman.status === filterStatus

    return matchesSearch && matchesLocation && matchesStatus
  })

  const handleTrack = (fisherman: TrackingData) => {
    setSelectedFisherman(fisherman)
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold mb-4">জেলে ট্র্যাকিং</h2>
      <p className="text-gray-600 dark:text-gray-400">
        নিবন্ধিত জেলেদের তথ্য, তাদের পরিবহন রুট এবং বর্তমান অবস্থা পর্যবেক্ষণ করুন।
      </p>

      {/* Map Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            লাইভ ট্র্যাকিং ম্যাপ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg p-6 min-h-[300px] relative overflow-hidden">
            {/* Fake map with routes */}
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%" viewBox="0 0 800 400">
                {/* Bangladesh outline (simplified) */}
                <path
                  d="M100 300 Q200 280 300 290 Q400 285 500 280 Q600 275 650 260 L670 240 Q680 220 675 200 Q670 180 650 170 Q600 160 550 165 Q450 170 350 175 Q250 180 150 190 Q100 200 80 220 Q70 240 75 260 Q80 280 100 300 Z"
                  fill="currentColor"
                  className="text-green-200"
                />
              </svg>
            </div>

            {/* Route visualization */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredFishermen.slice(0, 6).map((fisherman, index) => (
                <div
                  key={fisherman.id}
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-sm">{fisherman.name}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      fisherman.status === "চলমান" ? "bg-blue-100 text-blue-700" :
                      fisherman.status === "সম্পন্ন" ? "bg-green-100 text-green-700" :
                      "bg-red-100 text-red-700"
                    }`}>
                      {fisherman.status}
                    </span>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="mb-2">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>{fisherman.origin}</span>
                      <span>{fisherman.destination}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          fisherman.status === "চলমান" ? "bg-blue-500" :
                          fisherman.status === "সম্পন্ন" ? "bg-green-500" :
                          "bg-red-500"
                        }`}
                        style={{ width: `${fisherman.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      বর্তমান অবস্থান: {fisherman.currentLocation}
                    </div>
                  </div>

                  {/* Route display */}
                  <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                    রুট: {fisherman.route.join(" → ")}
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {fisherman.estimatedTime}
                    </span>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleTrack(fisherman)}
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="জেলে অনুসন্ধান করুন..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Select value={filterLocation} onValueChange={setFilterLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="এলাকা নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="সব এলাকা">সব এলাকা</SelectItem>
                  <SelectItem value="চট্টগ্রাম">চট্টগ্রাম</SelectItem>
                  <SelectItem value="খুলনা">খুলনা</SelectItem>
                  <SelectItem value="বরিশাল">বরিশাল</SelectItem>
                  <SelectItem value="কক্সবাজার">কক্সবাজার</SelectItem>
                  <SelectItem value="সিলেট">সিলেট</SelectItem>
                  <SelectItem value="পটুয়াখালী">পটুয়াখালী</SelectItem>
                  <SelectItem value="রাঙ্গামাটি">রাঙ্গামাটি</SelectItem>
                </SelectContent>
              </Select>
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

      {/* Detailed Tracking Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            বিস্তারিত ট্র্যাকিং তথ্য
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>জেলে তথ্য</TableHead>
                  <TableHead>রুট</TableHead>
                  <TableHead>মাছের ধরন</TableHead>
                  <TableHead>অবস্থা</TableHead>
                  <TableHead>অগ্রগতি</TableHead>
                  <TableHead>আনুমানিক সময়</TableHead>
                  <TableHead className="text-right">পদক্ষেপ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFishermen.length > 0 ? (
                  filteredFishermen.map((fisherman) => (
                    <TableRow key={fisherman.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <User className="h-5 w-5 text-gray-500" />
                          <div>
                            <div className="font-semibold">{fisherman.name}</div>
                            <div className="text-xs text-gray-500">{fisherman.phone}</div>
                            <div className="text-xs text-gray-500">ID: {fisherman.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-medium text-green-600">{fisherman.origin}</div>
                          <div className="text-xs text-gray-500 my-1">↓</div>
                          <div className="font-medium text-blue-600">{fisherman.destination}</div>
                          <div className="text-xs text-gray-400 mt-1">
                            বর্তমান: {fisherman.currentLocation}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{fisherman.fishType}</span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            fisherman.status === "চলমান"
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-500"
                              : fisherman.status === "সম্পন্ন"
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-500"
                                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-500"
                          }`}
                        >
                          {fisherman.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="w-full">
                          <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>{fisherman.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all ${
                                fisherman.status === "চলমান" ? "bg-blue-500" :
                                fisherman.status === "সম্পন্ন" ? "bg-green-500" :
                                "bg-red-500"
                              }`}
                              style={{ width: `${fisherman.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{fisherman.estimatedTime}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleTrack(fisherman)}
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
                      কোন জেলে পাওয়া যায়নি।
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Selected Fisherman Details Modal */}
      {selectedFisherman && (
        <Card className="border-2 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Navigation className="h-5 w-5" />
                {selectedFisherman.name} এর বিস্তারিত ট্র্যাকিং
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
                <h4 className="font-semibold mb-3">রুট তথ্য</h4>
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
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">পরিবহন তথ্য</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                    <div className="text-sm text-gray-600 dark:text-gray-400">মাছের ধরন</div>
                    <div className="font-medium">{selectedFisherman.fishType}</div>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                    <div className="text-sm text-gray-600 dark:text-gray-400">অবস্থা</div>
                    <div className="font-medium">{selectedFisherman.status}</div>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                    <div className="text-sm text-gray-600 dark:text-gray-400">আনুমানিক সময়</div>
                    <div className="font-medium">{selectedFisherman.estimatedTime}</div>
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
