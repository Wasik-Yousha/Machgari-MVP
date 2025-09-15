"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Common fish names in Bangladesh
const bangladeshiFishNames = [
  "রুই", "কাতলা", "ইলিশ", "পাঙ্গাস", "তেলাপিয়া", "শিং", "মাগুর", "চিংড়ি", 
  "পাবদা", "বোয়াল", "কৈ", "শোল", "টাকি", "চিতল", "আইড়", "বাটা", "পুঁটি", 
  "টেংরা", "গজার", "খলিশা", "কালবাউস", "মৃগেল", "সিলভার কার্প", "গ্রাস কার্প", 
  "কমন কার্প", "বিগহেড কার্প", "মিরর কার্প", "হাঙ্গর", "ভেটকি", "পার্শে", 
  "চাঁদা", "কালিবাউস", "নান্দিনা", "ফলি", "কুচিয়া", "বাইম", "গুতুম"
]

interface FishEntryFormProps {
  onSubmit: (fishData: any) => void
  onCancel: () => void
}

export function FishEntryForm({ onSubmit, onCancel }: FishEntryFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    quality: "সাধারণ",
    description: "",
    image: "/placeholder.svg?height=200&width=300", // Default placeholder
    date: new Date().toLocaleDateString("bn-BD"),
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFishNameChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      name: value,
    }))
  }

  const handleQualityChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      quality: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-lg">
            মাছের নাম
          </Label>
          <Select value={formData.name} onValueChange={handleFishNameChange}>
            <SelectTrigger className="text-lg p-6 h-14">
              <SelectValue placeholder="মাছের নাম নির্বাচন করুন" />
            </SelectTrigger>
            <SelectContent>
              {bangladeshiFishNames.map((fishName) => (
                <SelectItem key={fishName} value={fishName}>
                  {fishName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="quantity" className="text-lg">
            পরিমাণ
          </Label>
          <Input
            id="quantity"
            name="quantity"
            placeholder="পরিমাণ (কেজি)"
            value={formData.quantity}
            onChange={handleChange}
            className="text-lg p-6 h-14"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="quality" className="text-lg">
          মানের ধরন
        </Label>
        <Select value={formData.quality} onValueChange={handleQualityChange}>
          <SelectTrigger className="text-lg p-6 h-14">
            <SelectValue placeholder="মানের ধরন নির্বাচন করুন" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="প্রিমিয়াম">প্রিমিয়াম</SelectItem>
            <SelectItem value="সাধারণ">সাধারণ</SelectItem>
            <SelectItem value="মাঝারি">মাঝারি</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-lg">
          বিবরণ
        </Label>
        <Textarea
          id="description"
          name="description"
          placeholder="মাছের বিবরণ লিখুন"
          value={formData.description}
          onChange={handleChange}
          className="text-lg p-4 min-h-[100px]"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image" className="text-lg">
          ছবি আপলোড
        </Label>
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center">
          <p className="text-gray-500 dark:text-gray-400">ছবি আপলোড করতে ক্লিক করুন বা টেনে আনুন</p>
          <Input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={() => {
              // In a real app, this would handle file upload
              // For now, we'll keep using the placeholder
            }}
          />
          <Button
            type="button"
            variant="outline"
            className="mt-4"
            onClick={() => document.getElementById("image")?.click()}
          >
            ছবি নির্বাচন করুন
          </Button>
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          বাতিল করুন
        </Button>
        <Button type="submit" className="bg-primary hover:bg-primary/90">
          সংরক্ষণ করুন
        </Button>
      </div>
    </form>
  )
}
