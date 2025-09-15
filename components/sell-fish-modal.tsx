"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { useFishData } from "@/contexts/fish-data-context"
import { useTransactions, Transaction } from "@/contexts/transactions-context"

interface SellFishModalProps {
  isOpen: boolean
  onClose: () => void
  fishId?: number
  preselectedMarket?: string
}

export function SellFishModal({ isOpen, onClose, fishId, preselectedMarket }: SellFishModalProps) {
  const { fishEntries, getBasePrice, getWholesalePrices } = useFishData()
  const { addTransaction } = useTransactions()
  
  const fish = fishId ? fishEntries.find(f => f.id === fishId) : null
  
  const [selectedFishId, setSelectedFishId] = useState<number | null>(fishId || null)
  const [selectedArotdar, setSelectedArotdar] = useState(preselectedMarket || "")
  const [askingPrice, setAskingPrice] = useState<number>(0)
  const [basePrice, setBasePrice] = useState<number>(0)
  const [estimatedPrice, setEstimatedPrice] = useState<number>(0)
  
  // Get currently selected fish
  const selectedFish = selectedFishId ? fishEntries.find(f => f.id === selectedFishId) : null
  
  // Sample arotdar data (in a real app, this would come from a database)
  const arotdars = [
    { id: "আড়ত-০০১", name: "মোহাম্মদ রহিম উদ্দিন", location: "কাওরান বাজার, ঢাকা" },
    { id: "আড়ত-০০২", name: "আব্দুল আলিম", location: "চট্টগ্রাম মৎস্য আড়ত" },
    { id: "আড়ত-০০৩", name: "মোস্তাফা কামাল", location: "খুলনা মৎস্য বাজার" },
  ]

  // Calculate prices when fish or selected arotdar changes
  useEffect(() => {
    if (selectedFish) {
      const basePriceVal = getBasePrice(selectedFish.name)
      setBasePrice(basePriceVal)
      
      // Get quality multiplier
      const qualityMultipliers: Record<string, number> = {
        "প্রিমিয়াম": 1.15,
        "সাধারণ": 1.0,
        "মাঝারি": 0.85,
      }
      const qualityMultiplier = qualityMultipliers[selectedFish.quality] || 1.0
      
      // Calculate estimated price
      const estimatedPriceVal = Math.round(basePriceVal * qualityMultiplier)
      setEstimatedPrice(estimatedPriceVal)
      
      // Set default asking price (slightly higher than estimated)
      setAskingPrice(Math.round(estimatedPriceVal * 1.05))
    }
  }, [selectedFish, selectedArotdar, getBasePrice])

  // Extract quantity number from string
  const getQuantityNumber = (quantityString: string): number => {
    const match = quantityString.match(/(\d+)/)
    return match ? parseInt(match[1]) : 0
  }

  const handleSubmit = () => {
    if (!selectedFish || !selectedArotdar) return
    
    const arotdar = arotdars.find(a => a.id === selectedArotdar)
    if (!arotdar) return
    
    // Create a new transaction
    addTransaction({
      fishId: selectedFish.id,
      fishName: selectedFish.name,
      quantity: selectedFish.quantity,
      quality: selectedFish.quality,
      jeleId: selectedFish.fishermanName || "আব্দুল করিম",
      jeleName: selectedFish.fishermanName || "আব্দুল করিম",
      arotdarId: arotdar.id,
      arotdarName: arotdar.name,
      initialPrice: askingPrice,
      finalPrice: 0, // Will be determined after negotiation
      currentOffer: askingPrice,
      currentOfferedBy: "jele"
    })
    
    onClose()
  }

  if (!fish) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>মাছ বিক্রয় করুন</DialogTitle>
          <DialogDescription>
            আপনার মাছের বিক্রয় প্রস্তাব তৈরি করুন। আড়তদার প্রস্তাবিত মূল্য গ্রহণ বা পরিবর্তন করতে পারবেন।
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {!fishId && (
            <div>
              <Label htmlFor="fishSelect">মাছ নির্বাচন করুন</Label>
              <Select onValueChange={(value) => setSelectedFishId(Number(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="যে মাছ বিক্রয় করতে চান তা নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  {fishEntries.filter(f => !f.isSold).map((fishEntry) => (
                    <SelectItem key={fishEntry.id} value={fishEntry.id.toString()}>
                      {fishEntry.name} - {fishEntry.quantity} ({fishEntry.quality})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {selectedFish && (
            <Card className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{selectedFish.name}</h3>
                    <p className="text-sm text-gray-500">পরিমাণ: {selectedFish.quantity}</p>
                  </div>
                  <Badge variant={selectedFish.quality === "প্রিমিয়াম" ? "default" : selectedFish.quality === "সাধারণ" ? "secondary" : "outline"}>
                    {selectedFish.quality}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="basePrice">সরকারি বেস মূল্য</Label>
              <Input id="basePrice" value={`৳${basePrice}`} readOnly className="bg-gray-50" />
            </div>
            <div>
              <Label htmlFor="estimatedPrice">আনুমানিক মূল্য</Label>
              <Input id="estimatedPrice" value={`৳${estimatedPrice}`} readOnly className="bg-gray-50" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="arotdar">আড়তদার নির্বাচন করুন</Label>
            <Select value={selectedArotdar} onValueChange={setSelectedArotdar}>
              <SelectTrigger>
                <SelectValue placeholder="আড়তদার নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent>
                {arotdars.map((arotdar) => (
                  <SelectItem key={arotdar.id} value={arotdar.id}>
                    {arotdar.name} ({arotdar.location})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="askingPrice">আপনার প্রস্তাবিত মূল্য (টাকা/কেজি)</Label>
            <Input
              id="askingPrice"
              type="number"
              min={Math.floor(basePrice * 0.85)}
              value={askingPrice}
              onChange={(e) => setAskingPrice(Number(e.target.value))}
            />
            <p className="text-xs text-gray-500">
              মোট মূল্য: ৳{askingPrice * getQuantityNumber(fish.quantity)}
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            বাতিল করুন
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={!selectedFish || !selectedArotdar || askingPrice <= 0}
            className="bg-primary hover:bg-primary/90"
          >
            বিক্রয় প্রস্তাব পাঠান
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
