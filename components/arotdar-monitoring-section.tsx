"use client"

import { useState, useEffect } from "react" // Import useEffect
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Store, CheckCircle, X } from "lucide-react"

const arotdarData = [
  {
    id: "০০১",
    name: "ঢাকা কাওরান বাজার আড়ত",
    owner: "আনিসুল ইসলাম",
    phone: "০১৭৭৩-৭৮৯১০২",
    location: "ঢাকা",
    incomingFishermen: 4,
    totalQuantity: "১,০৫০ কেজি",
    ilishPrice: "১,২০০ টাকা/কেজি",
    ruiPrice: "৩৫০ টাকা/কেজি",
    katlaPrice: "৩৮০ টাকা/কেজি",
    basePriceCompliance: "সঠিক",
  },
  {
    id: "০০২",
    name: "ঢাকা যাত্রাবাড়ী আড়ত",
    owner: "মাহমুদুল হাসান",
    phone: "০১৮১৪-৫৬৭৮৯০",
    location: "ঢাকা",
    incomingFishermen: 2,
    totalQuantity: "৪৫০ কেজি",
    ilishPrice: "১,১৮০ টাকা/কেজি",
    ruiPrice: "৩৪০ টাকা/কেজি",
    katlaPrice: "৩৭০ টাকা/কেজি",
    basePriceCompliance: "সঠিক",
  },
  {
    id: "০০৩",
    name: "চট্টগ্রাম ফিশারি ঘাট",
    owner: "শাহানা পারভীন",
    phone: "০১৯১৮-২৩৪৫৬৭",
    location: "চট্টগ্রাম",
    incomingFishermen: 1,
    totalQuantity: "২৮০ কেজি",
    ilishPrice: "১,১৯০ টাকা/কেজি",
    ruiPrice: "৩৫০ টাকা/কেজি",
    katlaPrice: "৩৮০ টাকা/কেজি",
    basePriceCompliance: "সঠিক",
  },
  {
    id: "০০৪",
    name: "খুলনা রূপসা আড়ত",
    owner: "কামরুল ইসলাম",
    phone: "০১৬১৮-৯৮৭৬৫৪",
    location: "খুলনা",
    incomingFishermen: 0,
    totalQuantity: "০ কেজি",
    ilishPrice: "১,১৭০ টাকা/কেজি",
    ruiPrice: "৩৩০ টাকা/কেজি",
    katlaPrice: "৩৬০ টাকা/কেজি",
    basePriceCompliance: "সঠিক",
  },
]

export function ArotdarMonitoringSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterLocation, setFilterLocation] = useState("সব এলাকা")
  const [filterCompliance, setFilterCompliance] = useState("সব অবস্থা")
  const [filteredArotdars, setFilteredArotdars] = useState(arotdarData)

  // Effect to apply filters on initial mount and when filters change
  useEffect(() => {
    handleSearch()
  }, [searchTerm, filterLocation, filterCompliance]) // Re-run when these dependencies change

  const handleSearch = () => {
    let filtered = arotdarData

    if (searchTerm) {
      filtered = filtered.filter(
        (a) =>
          a.name.includes(searchTerm) ||
          a.owner.includes(searchTerm) ||
          a.location.includes(searchTerm) ||
          a.phone.includes(searchTerm),
      )
    }

    if (filterLocation !== "সব এলাকা") {
      filtered = filtered.filter((a) => a.location.includes(filterLocation))
    }

    if (filterCompliance !== "সব অবস্থা") {
      filtered = filtered.filter((a) => a.basePriceCompliance === filterCompliance)
    }

    setFilteredArotdars(filtered)
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold mb-4">আড়ত মনিটরিং</h2>
      <p className="text-gray-600 dark:text-gray-400">
        নিবন্ধিত আড়তদারদের কার্যক্রম, তাদের দামের প্রবণতা এবং বর্তমান অবস্থা পর্যবেক্ষণ করুন।
      </p>

      <Card className="p-4">
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="আড়ত অনুসন্ধান করুন..."
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
                  <SelectItem value="ঢাকা">ঢাকা</SelectItem>
                  <SelectItem value="বরিশাল">বরিশাল</SelectItem>
                  <SelectItem value="খুলনা">খুলনা</SelectItem>
                  <SelectItem value="চট্টগ্রাম">চট্টগ্রাম</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={filterCompliance} onValueChange={setFilterCompliance}>
                <SelectTrigger>
                  <SelectValue placeholder="অনুসরণ অবস্থা" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="সব অবস্থা">সব অবস্থা</SelectItem>
                  <SelectItem value="সঠিক">সঠিক</SelectItem>
                  <SelectItem value="ব্যতিক্রম">ব্যতিক্রম</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={handleSearch} className="bg-primary hover:bg-primary/90">
            <Search className="mr-2 h-4 w-4" />
            খুঁজুন
          </Button>
        </CardContent>
      </Card>

      <Card className="p-4">
        <CardHeader>
          <CardTitle>আড়ত মনিটরিং</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>আড়ত</TableHead>
                  <TableHead>মালিক</TableHead>
                  <TableHead>আগত জেলে</TableHead>
                  <TableHead>মোট পরিমাণ</TableHead>
                  <TableHead>ইলিশ দর</TableHead>
                  <TableHead>রুই দর</TableHead>
                  <TableHead>কাতলা দর</TableHead>
                  <TableHead className="text-right">বেস মূল্য অনুসরণ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredArotdars.length > 0 ? (
                  filteredArotdars.map((arotdar) => (
                    <TableRow key={arotdar.id}>
                      <TableCell className="font-medium flex items-center gap-2">
                        <Store className="h-5 w-5 text-gray-500" />
                        <div>
                          {arotdar.name}
                          <p className="text-xs text-gray-500">{arotdar.location}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          {arotdar.owner}
                          <p className="text-xs text-gray-500">{arotdar.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell>{arotdar.incomingFishermen}</TableCell>
                      <TableCell>{arotdar.totalQuantity}</TableCell>
                      <TableCell>{arotdar.ilishPrice}</TableCell>
                      <TableCell>{arotdar.ruiPrice}</TableCell>
                      <TableCell>{arotdar.katlaPrice}</TableCell>
                      <TableCell className="text-right">
                        <span
                          className={`flex items-center justify-end gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                            arotdar.basePriceCompliance === "সঠিক"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-500"
                              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-500"
                          }`}
                        >
                          {arotdar.basePriceCompliance === "সঠিক" ? (
                            <CheckCircle className="h-3 w-3" />
                          ) : (
                            <X className="h-3 w-3" />
                          )}
                          {arotdar.basePriceCompliance}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-gray-500">
                      কোন আড়ত পাওয়া যায়নি।
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
