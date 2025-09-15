"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface FishEntry {
  id: number
  name: string
  quantity: string
  quality: "প্রিমিয়াম" | "সাধারণ" | "মাঝারি"
  description: string
  image: string
  date: string
  fishermanName?: string
  fishermanLocation?: string
  fishermanPhone?: string
  isSold?: boolean
  soldPrice?: number
  soldTo?: string
}

// Base prices for different fish types (per kg in BDT)
// Changed to a state variable for real-time updates
const initialBasePrices: Record<string, number> = {
  "রুই": 350,
  "কাতলা": 380,
  "ইলিশ": 1200,
  "পাঙ্গাস": 180,
  "তেলাপিয়া": 220,
  "শিং": 550,
  "মাগুর": 500,
  "চিংড়ি": 800,
  "পাবদা": 450,
  "বোয়াল": 400,
}

// Quality multipliers
const qualityMultipliers: Record<string, number> = {
  "প্রিমিয়াম": 1.15,
  "সাধারণ": 1.0,
  "মাঝারি": 0.85,
}

export interface FishermanData {
  id: string
  name: string
  location: string
  distance: string
  phone: string
  catches: Array<{
    fish: string
    quantity: string
    quality: string
    estimatedPrice?: number
    totalValue?: number
  }>
  totalCatch: string
  catchDate: string
  rating: number
  avatar: string
  totalValue?: number
}

interface MarketData {
  fishName: string
  basePrice: number
  currentPrice: number
  demandLevel: "high" | "medium" | "low"
  supplyLevel: "high" | "medium" | "low"
  priceChange: number
  trend: "up" | "down" | "stable"
}

interface FishDataContextType {
  fishEntries: FishEntry[]
  addFishEntry: (fish: Omit<FishEntry, 'id'>) => void
  updateFishEntry: (fishId: number, updates: Partial<FishEntry>) => void
  getFishermenData: () => FishermanData[]
  getTotalFishCount: () => number
  getTotalQuantity: () => string
  getTotalMarketValue: () => number
  getMarketData: () => MarketData[]
  getAveragePrice: () => number
  getTopFishByValue: () => { name: string; value: number; quantity: number }[]
  getLocationStats: () => { location: string; fishermen: number; totalValue: number; avgValue: number }[]
  updateBasePrice: (fishName: string, newPrice: number) => void
  getBasePrice: (fishName: string) => number
  getBasePrices: () => Record<string, number>
  getWholesalePrices: () => Record<string, number>
  updateWholesalePrice: (fishName: string, newPrice: number) => void
  isLoaded: boolean
}

const FishDataContext = createContext<FishDataContextType | undefined>(undefined)

// Default fisherman profile to use for fish entries
const defaultFisherman = {
  name: "আব্দুল করিম",
  location: "চাঁদপুর", 
  distance: "৮০ কিমি",
  phone: "০১৭১২৩৪৫৬৭৮",
  rating: 4.5,
  avatar: "/placeholder.svg?height=60&width=60",
}

// Initial sample fish data
const initialFishData: FishEntry[] = [
  // Fisherman 1: আব্দুল করিম from চাঁদপুর
  {
    id: 1,
    name: "রুই",
    quantity: "১০ কেজি",
    quality: "প্রিমিয়াম",
    description: "তাজা রুই মাছ, আজকে ধরা",
    image: "/images/f1.jpg",
    date: "১৫/০৯/২০২৫",
    fishermanName: "আব্দুল করিম",
    fishermanLocation: "চাঁদপুর",
    fishermanPhone: "০১৭১২৩৪৫৬৭৮",
  },
  {
    id: 2,
    name: "কাতলা",
    quantity: "১৫ কেজি",
    quality: "সাধারণ",
    description: "মাঝারি আকারের কাতলা মাছ",
    image: "/images/f2.webp",
    date: "১৫/০৯/২০২৫",
    fishermanName: "আব্দুল করিম",
    fishermanLocation: "চাঁদপুর", 
    fishermanPhone: "০১৭১২৩৪৫৬৭৮",
  },
  {
    id: 3,
    name: "ইলিশ",
    quantity: "৫ কেজি",
    quality: "প্রিমিয়াম",
    description: "পদ্মা নদীর ইলিশ মাছ",
    image: "/images/f3.webp",
    date: "১৫/০৯/২০২৫",
    fishermanName: "আব্দুল করিম",
    fishermanLocation: "চাঁদপুর",
    fishermanPhone: "০১৭১২৩৪৫৬৭৮",
  },
  
  // Fisherman 2: রহিম আলী from বরিশাল
  {
    id: 4,
    name: "ইলিশ",
    quantity: "১২ কেজি",
    quality: "প্রিমিয়াম",
    description: "বরিশাল থেকে আনা তাজা ইলিশ",
    image: "/images/f4.jpg",
    date: "১৫/০৯/২০২৫",
    fishermanName: "রহিম আলী",
    fishermanLocation: "বরিশাল",
    fishermanPhone: "০১৮১১২২৩৩৪৪",
  },
  {
    id: 5,
    name: "পাঙ্গাস",
    quantity: "৮ কেজি",
    quality: "সাধারণ",
    description: "বিশুদ্ধ পানির পাঙ্গাস",
    image: "/images/f5.jpg",
    date: "১৫/০৯/২০২৫",
    fishermanName: "রহিম আলী",
    fishermanLocation: "বরিশাল",
    fishermanPhone: "০১৮১১২২৩৩৪৪",
  },
  
  // Fisherman 3: কামাল হোসেন from খুলনা
  {
    id: 6,
    name: "চিংড়ি",
    quantity: "৭ কেজি",
    quality: "প্রিমিয়াম",
    description: "বাগেরহাট থেকে সংগৃহীত গলদা চিংড়ি",
    image: "/images/f6.jpg",
    date: "১৫/০৯/২০২৫",
    fishermanName: "কামাল হোসেন",
    fishermanLocation: "খুলনা",
    fishermanPhone: "০১৯১১৪৪৫৫৬৬",
  },
  {
    id: 7,
    name: "বোয়াল",
    quantity: "১০ কেজি",
    quality: "সাধারণ",
    description: "মাঝারি আকারের বোয়াল",
    image: "/images/f7.jpg",
    date: "১৫/০৯/২০২৫",
    fishermanName: "কামাল হোসেন",
    fishermanLocation: "খুলনা",
    fishermanPhone: "০১৯১১৪৪৫৫৬৬",
  },
  
  // Fisherman 4: সালাম মিয়া from সিলেট
  {
    id: 8,
    name: "শিং",
    quantity: "৪ কেজি",
    quality: "প্রিমিয়াম",
    description: "হাওর থেকে সংগৃহীত শিং মাছ",
    image: "/images/f8.webp",
    date: "১৪/০৯/২০২৫",
    fishermanName: "সালাম মিয়া",
    fishermanLocation: "সিলেট",
    fishermanPhone: "০১৭১১৫৫৬৬৭৭",
  },
  {
    id: 9,
    name: "মাগুর",
    quantity: "৬ কেজি",
    quality: "সাধারণ",
    description: "বিল থেকে ধরা মাগুর মাছ",
    image: "/images/f9.jpg",
    date: "১৪/০৯/২০২৫",
    fishermanName: "সালাম মিয়া",
    fishermanLocation: "সিলেট",
    fishermanPhone: "০১৭১১৫৫৬৬৭৭",
  },
  
  // Fisherman 5: আনোয়ার হোসেন from কক্সবাজার
  {
    id: 10,
    name: "রুপচাঁদা",
    quantity: "৮ কেজি",
    quality: "প্রিমিয়াম",
    description: "সমুদ্র থেকে সংগৃহীত তাজা রুপচাঁদা",
    image: "/images/f1.jpg",
    date: "১৪/০৯/২০২৫",
    fishermanName: "আনোয়ার হোসেন",
    fishermanLocation: "কক্সবাজার",
    fishermanPhone: "০১৮১২৩৪৫৬৭৮",
  },
  {
    id: 11,
    name: "লোটকা",
    quantity: "৫ কেজি",
    quality: "মাঝারি",
    description: "মাঝারি আকারের লোটকা মাছ",
    image: "/images/f2.webp",
    date: "১৪/০৯/২০২৫",
    fishermanName: "আনোয়ার হোসেন",
    fishermanLocation: "কক্সবাজার",
    fishermanPhone: "০১৮১২৩৪৫৬৭৮",
  },
  
  // Some sold fish entries
  {
    id: 12,
    name: "রুই",
    quantity: "৮ কেজি",
    quality: "সাধারণ",
    description: "মাঝারি আকারের রুই মাছ",
    image: "/images/f3.webp",
    date: "১২/০৯/২০২৫",
    fishermanName: "আব্দুল করিম",
    fishermanLocation: "চাঁদপুর",
    fishermanPhone: "০১৭১২৩৪৫৬৭৮",
    isSold: true,
    soldPrice: 340,
    soldTo: "ঢাকা পূর্ব আড়ত",
  },
  {
    id: 13,
    name: "ইলিশ",
    quantity: "১০ কেজি",
    quality: "প্রিমিয়াম",
    description: "মেঘনা নদীর ইলিশ",
    image: "/images/f4.jpg",
    date: "১২/০৯/২০২৫",
    fishermanName: "রহিম আলী",
    fishermanLocation: "বরিশাল",
    fishermanPhone: "০১৮১১২২৩৩৪৪",
    isSold: true,
    soldPrice: 1250,
    soldTo: "চট্টগ্রাম আড়ত",
  },
  {
    id: 14,
    name: "চিংড়ি",
    quantity: "৫ কেজি",
    quality: "প্রিমিয়াম",
    description: "বাগদা চিংড়ি",
    image: "/images/f5.jpg",
    date: "১১/০৯/২০২৫",
    fishermanName: "কামাল হোসেন",
    fishermanLocation: "খুলনা",
    fishermanPhone: "০১৯১১৪৪৫৫৬৬",
    isSold: true,
    soldPrice: 820,
    soldTo: "খুলনা আড়ত",
  },
  {
    id: 15,
    name: "পাবদা",
    quantity: "৩ কেজি",
    quality: "সাধারণ",
    description: "ছোট আকারের পাবদা মাছ",
    image: "/images/f6.jpg",
    date: "১১/০৯/২০২৫",
    fishermanName: "সালাম মিয়া",
    fishermanLocation: "সিলেট",
    fishermanPhone: "০১৭১১৫৫৬৬৭৭",
    isSold: true,
    soldPrice: 420,
    soldTo: "ময়মনসিংহ আড়ত",
  },
  {
    id: 16,
    name: "কাতলা",
    quantity: "১২ কেজি",
    quality: "সাধারণ",
    description: "বড় আকারের কাতলা মাছ",
    image: "/images/f7.jpg",
    date: "১০/০৯/২০২৫",
    fishermanName: "আনোয়ার হোসেন",
    fishermanLocation: "কক্সবাজার",
    fishermanPhone: "০১৮১২৩৪৫৬৭৮",
    isSold: true,
    soldPrice: 370,
    soldTo: "কুমিল্লা আড়ত",
  },
  {
    id: 17,
    name: "শিং",
    quantity: "৪ কেজি",
    quality: "প্রিমিয়াম",
    description: "তাজা শিং মাছ",
    image: "/images/f8.webp",
    date: "১০/০৯/২০২৫",
    fishermanName: "কামাল হোসেন",
    fishermanLocation: "খুলনা",
    fishermanPhone: "০১৯১১৪৪৫৫৬৬",
    isSold: true,
    soldPrice: 580,
    soldTo: "যশোর আড়ত",
  },
  {
    id: 18,
    name: "রুই",
    quantity: "১৫ কেজি",
    quality: "মাঝারি",
    description: "পুকুরের রুই মাছ",
    image: "/images/f9.jpg",
    date: "০৯/০৯/২০২৫",
    fishermanName: "আব্দুল করিম",
    fishermanLocation: "চাঁদপুর",
    fishermanPhone: "০১৭১২৩৪৫৬৭৮",
    isSold: true,
    soldPrice: 320,
    soldTo: "নারায়ণগঞ্জ আড়ত",
  },
  {
    id: 19,
    name: "তেলাপিয়া",
    quantity: "১০ কেজি",
    quality: "সাধারণ",
    description: "চাষ করা তেলাপিয়া",
    image: "/images/f1.jpg",
    date: "০৯/০৯/২০২৫",
    fishermanName: "রহিম আলী",
    fishermanLocation: "বরিশাল",
    fishermanPhone: "০১৮১১২২৩৩৪৪",
    isSold: true,
    soldPrice: 210,
    soldTo: "বরিশাল আড়ত",
  },
  {
    id: 20,
    name: "পাঙ্গাস",
    quantity: "২০ কেজি",
    quality: "মাঝারি",
    description: "বড় আকারের পাঙ্গাস",
    image: "/images/f2.webp",
    date: "০৮/০৯/২০২৫",
    fishermanName: "আব্দুল করিম",
    fishermanLocation: "চাঁদপুর",
    fishermanPhone: "০১৭১২৩৪৫৬৭৮",
    isSold: true,
    soldPrice: 170,
    soldTo: "গাজীপুর আড়ত",
  }
]

export function FishDataProvider({ children }: { children: React.ReactNode }) {
  const [fishEntries, setFishEntries] = useState<FishEntry[]>(initialFishData)
  const [basePrices, setBasePrices] = useState<Record<string, number>>(initialBasePrices)
  const [wholesalePrices, setWholesalePrices] = useState<Record<string, number>>({})
  const [isLoaded, setIsLoaded] = useState(false)
  const [lastSaved, setLastSaved] = useState<number | null>(null)

  // Load fish data from localStorage on mount
  useEffect(() => {
    const loadFishData = () => {
      try {
        if (typeof window !== 'undefined') {
          // Load fish entries
          const storedFishData = window.localStorage.getItem('fishEntries')
          console.log('[FishDataContext] Loading fish data from localStorage:', storedFishData ? 'Found data' : 'No data found')
          
          if (storedFishData) {
            try {
              const parsedData = JSON.parse(storedFishData)
              // Check if parsed data is valid and has items
              if (Array.isArray(parsedData) && parsedData.length > 0) {
                console.log('[FishDataContext] Successfully loaded', parsedData.length, 'fish entries')
                setFishEntries(parsedData)
              } else {
                console.log('[FishDataContext] Stored fish data is empty or invalid, using sample data')
                setFishEntries(initialFishData)
              }
            } catch (parseError) {
              console.error('[FishDataContext] Error parsing fish data JSON:', parseError)
              setFishEntries(initialFishData)
            }
          } else {
            // Initialize with sample data if not found
            console.log('[FishDataContext] Using initial sample fish data')
            setFishEntries(initialFishData)
          }

          // Load base prices
          const storedBasePrices = window.localStorage.getItem('basePrices')
          if (storedBasePrices) {
            const parsedPrices = JSON.parse(storedBasePrices)
            setBasePrices(parsedPrices)
          } else {
            // Initialize with default base prices
            setBasePrices(initialBasePrices)
          }

          // Load wholesale prices
          const storedWholesalePrices = window.localStorage.getItem('wholesalePrices')
          if (storedWholesalePrices) {
            const parsedWholesalePrices = JSON.parse(storedWholesalePrices)
            setWholesalePrices(parsedWholesalePrices)
          } else {
            // Initialize wholesale prices with base prices
            setWholesalePrices({...initialBasePrices})
          }
        }
      } catch (error) {
        console.log('Error loading data from localStorage:', error)
        // Fall back to initial data if localStorage fails
        setFishEntries(initialFishData)
        setBasePrices(initialBasePrices)
        setWholesalePrices({...initialBasePrices})
      } finally {
        setIsLoaded(true)
      }
    }

    loadFishData()
  }, [])

  // Save fish data to localStorage whenever it changes, with throttling
  useEffect(() => {
    if (isLoaded) {
      // Throttle save operations to once per second
      const now = Date.now();
      if (lastSaved === null || now - lastSaved > 1000) {
        try {
          if (typeof window !== 'undefined') {
            // Only save if we have valid data
            if (Array.isArray(fishEntries) && fishEntries.length > 0) {
              console.log('[FishDataContext] Saving fish data to localStorage:', fishEntries.length, 'entries')
              const jsonData = JSON.stringify(fishEntries)
              
              // Ensure the data we're saving is not empty
              if (jsonData !== '[]' && jsonData !== '{}' && jsonData !== 'null') {
                window.localStorage.setItem('fishEntries', jsonData)
                setLastSaved(now);
                console.log('[FishDataContext] Fish data saved successfully. Data size:', jsonData.length, 'characters')
              } else {
                console.error('[FishDataContext] Prevented saving empty data to localStorage')
              }
            } else {
              console.warn('[FishDataContext] Not saving fish data - invalid or empty array')
            }
          }
        } catch (error) {
          console.error('[FishDataContext] Error saving fish data to localStorage:', error)
        }
      }
    }
  }, [fishEntries, isLoaded, lastSaved])

  // Save base prices to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      try {
        if (typeof window !== 'undefined') {
          console.log('Saving base prices to localStorage')
          window.localStorage.setItem('basePrices', JSON.stringify(basePrices))
        }
      } catch (error) {
        console.log('Error saving base prices to localStorage:', error)
      }
    }
  }, [basePrices, isLoaded])

  // Save wholesale prices to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      try {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem('wholesalePrices', JSON.stringify(wholesalePrices))
        }
      } catch (error) {
        console.log('Error saving wholesale prices to localStorage:', error)
      }
    }
  }, [wholesalePrices, isLoaded])

  const addFishEntry = (fishData: Omit<FishEntry, 'id'>) => {
    const newId = Math.max(...fishEntries.map(f => f.id), 0) + 1
    const newFish: FishEntry = {
      ...fishData,
      id: newId,
      fishermanName: fishData.fishermanName || defaultFisherman.name,
      fishermanLocation: fishData.fishermanLocation || defaultFisherman.location,
      fishermanPhone: fishData.fishermanPhone || defaultFisherman.phone,
      isSold: false
    }
    
    setFishEntries(prev => [...prev, newFish])
    console.log('Added new fish entry:', newFish)
  }

  const updateFishEntry = (fishId: number, updates: Partial<FishEntry>) => {
    setFishEntries(prevEntries => 
      prevEntries.map(entry => 
        entry.id === fishId ? { ...entry, ...updates } : entry
      )
    )
    console.log(`Updated fish entry ${fishId}:`, updates)
  }

  // Function to update base price (for government)
  const updateBasePrice = (fishName: string, newPrice: number) => {
    setBasePrices(prev => ({
      ...prev,
      [fishName]: newPrice
    }))
    console.log(`Base price updated for ${fishName}: ৳${newPrice}`)
  }

  // Function to get a specific base price
  const getBasePrice = (fishName: string): number => {
    return basePrices[fishName] || 300 // Default price if not found
  }

  // Function to get all base prices
  const getBasePrices = () => {
    return basePrices
  }

  // Function to update wholesale price (for arotdar)
  const updateWholesalePrice = (fishName: string, newPrice: number) => {
    setWholesalePrices(prev => ({
      ...prev,
      [fishName]: newPrice
    }))
    console.log(`Wholesale price updated for ${fishName}: ৳${newPrice}`)
  }

  // Function to get all wholesale prices
  const getWholesalePrices = () => {
    return wholesalePrices
  }

  const getFishermenData = (): FishermanData[] => {
    // Group fish entries by fisherman
    const fishermenMap = new Map<string, FishEntry[]>()
    
    fishEntries.forEach(fish => {
      // Skip sold fish
      if (fish.isSold) return

      const key = fish.fishermanName || defaultFisherman.name
      if (!fishermenMap.has(key)) {
        fishermenMap.set(key, [])
      }
      fishermenMap.get(key)!.push(fish)
    })

    // Convert to FishermanData format
    const fishermenData: FishermanData[] = []
    let idCounter = 1

    fishermenMap.forEach((fishes, fishermanName) => {
      const firstFish = fishes[0]
      const catches = fishes.map(fish => {
        const quantityNum = parseFloat(fish.quantity.match(/(\d+)/)?.[1] || '0')
        const basePrice = basePrices[fish.name] || 300
        const qualityMultiplier = qualityMultipliers[fish.quality] || 1.0
        const estimatedPrice = Math.round(basePrice * qualityMultiplier)
        const totalValue = Math.round(quantityNum * estimatedPrice)

        return {
          fish: fish.name,
          quantity: fish.quantity,
          quality: fish.quality,
          estimatedPrice,
          totalValue,
        }
      })

      // Calculate total catch quantity
      const totalQuantityNum = fishes.reduce((total, fish) => {
        const match = fish.quantity.match(/(\d+)/)
        return total + (match ? parseInt(match[1]) : 0)
      }, 0)

      // Calculate total value
      const totalValue = catches.reduce((sum, catch_) => sum + (catch_.totalValue || 0), 0)

      const fishermanData: FishermanData = {
        id: `জেলে-${String(idCounter).padStart(3, '0')}`,
        name: fishermanName,
        location: firstFish.fishermanLocation || defaultFisherman.location,
        distance: defaultFisherman.distance,
        phone: firstFish.fishermanPhone || defaultFisherman.phone,
        catches,
        totalCatch: `${totalQuantityNum} কেজি`,
        catchDate: firstFish.date,
        rating: defaultFisherman.rating,
        avatar: defaultFisherman.avatar,
        totalValue,
      }

      fishermenData.push(fishermanData)
      idCounter++
    })

    return fishermenData
  }

  const getTotalFishCount = () => fishEntries.filter(fish => !fish.isSold).length

  const getTotalQuantity = () => {
    const totalQuantityNum = fishEntries
      .filter(fish => !fish.isSold)
      .reduce((total, fish) => {
        const match = fish.quantity.match(/(\d+)/)
        return total + (match ? parseInt(match[1]) : 0)
      }, 0)
    return `${totalQuantityNum} কেজি`
  }

  const getTotalMarketValue = (): number => {
    return fishEntries
      .filter(fish => !fish.isSold)
      .reduce((total, fish) => {
        const quantityNum = parseFloat(fish.quantity.match(/(\d+)/)?.[1] || '0')
        const basePrice = basePrices[fish.name] || 300
        const qualityMultiplier = qualityMultipliers[fish.quality] || 1.0
        const price = basePrice * qualityMultiplier
        return total + (quantityNum * price)
      }, 0)
  }

  const getMarketData = (): MarketData[] => {
    const fishCounts = new Map<string, { quantity: number; totalValue: number }>()
    
    // Count fish and calculate values
    fishEntries
      .filter(fish => !fish.isSold)
      .forEach(fish => {
        const quantityNum = parseFloat(fish.quantity.match(/(\d+)/)?.[1] || '0')
        const basePrice = basePrices[fish.name] || 300
        const qualityMultiplier = qualityMultipliers[fish.quality] || 1.0
        const value = quantityNum * basePrice * qualityMultiplier
        
        if (!fishCounts.has(fish.name)) {
          fishCounts.set(fish.name, { quantity: 0, totalValue: 0 })
        }
        
        const current = fishCounts.get(fish.name)!
        current.quantity += quantityNum
        current.totalValue += value
      })

    // Generate market data
    return Array.from(fishCounts.entries()).map(([fishName, data]) => {
      const basePrice = basePrices[fishName] || 300
      const avgPrice = data.quantity > 0 ? data.totalValue / data.quantity : basePrice
      
      // Simulate demand/supply based on quantity
      const demandLevel: "high" | "medium" | "low" = data.quantity > 50 ? "high" : data.quantity > 20 ? "medium" : "low"
      const supplyLevel: "high" | "medium" | "low" = data.quantity > 40 ? "high" : data.quantity > 15 ? "medium" : "low"
      
      // Calculate price change (simulated)
      const priceChange = ((avgPrice - basePrice) / basePrice) * 100
      const trend: "up" | "down" | "stable" = priceChange > 2 ? "up" : priceChange < -2 ? "down" : "stable"

      return {
        fishName,
        basePrice,
        currentPrice: Math.round(avgPrice),
        demandLevel,
        supplyLevel,
        priceChange: Math.round(priceChange * 10) / 10,
        trend,
      }
    })
  }

  const getAveragePrice = (): number => {
    const filteredEntries = fishEntries.filter(fish => !fish.isSold)
    if (filteredEntries.length === 0) return 0
    
    const totalValue = getTotalMarketValue()
    const totalQuantityNum = filteredEntries.reduce((total, fish) => {
      const match = fish.quantity.match(/(\d+)/)
      return total + (match ? parseInt(match[1]) : 0)
    }, 0)
    
    return totalQuantityNum > 0 ? Math.round(totalValue / totalQuantityNum) : 0
  }

  const getTopFishByValue = (): { name: string; value: number; quantity: number }[] => {
    const fishValues = new Map<string, { value: number; quantity: number }>()
    
    fishEntries
      .filter(fish => !fish.isSold)
      .forEach(fish => {
        const quantityNum = parseFloat(fish.quantity.match(/(\d+)/)?.[1] || '0')
        const basePrice = basePrices[fish.name] || 300
        const qualityMultiplier = qualityMultipliers[fish.quality] || 1.0
        const value = quantityNum * basePrice * qualityMultiplier
        
        if (!fishValues.has(fish.name)) {
          fishValues.set(fish.name, { value: 0, quantity: 0 })
        }
        
        const current = fishValues.get(fish.name)!
        current.value += value
        current.quantity += quantityNum
      })

    return Array.from(fishValues.entries())
      .map(([name, data]) => ({ name, value: Math.round(data.value), quantity: Math.round(data.quantity) }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5)
  }

  const getLocationStats = (): { location: string; fishermen: number; totalValue: number; avgValue: number }[] => {
    const locationMap = new Map<string, { fishermen: Set<string>; totalValue: number }>()
    
    fishEntries
      .filter(fish => !fish.isSold)
      .forEach(fish => {
        const location = fish.fishermanLocation || defaultFisherman.location
        const fishermanName = fish.fishermanName || defaultFisherman.name
        const quantityNum = parseFloat(fish.quantity.match(/(\d+)/)?.[1] || '0')
        const basePrice = basePrices[fish.name] || 300
        const qualityMultiplier = qualityMultipliers[fish.quality] || 1.0
        const value = quantityNum * basePrice * qualityMultiplier
        
        if (!locationMap.has(location)) {
          locationMap.set(location, { fishermen: new Set(), totalValue: 0 })
        }
        
        const current = locationMap.get(location)!
        current.fishermen.add(fishermanName)
        current.totalValue += value
      })

    return Array.from(locationMap.entries())
      .map(([location, data]) => ({
        location,
        fishermen: data.fishermen.size,
        totalValue: Math.round(data.totalValue),
        avgValue: Math.round(data.totalValue / data.fishermen.size),
      }))
      .sort((a, b) => b.totalValue - a.totalValue)
  }

  return (
    <FishDataContext.Provider value={{
      fishEntries,
      addFishEntry,
      updateFishEntry,
      getFishermenData,
      getTotalFishCount,
      getTotalQuantity,
      getTotalMarketValue,
      getMarketData,
      getAveragePrice,
      getTopFishByValue,
      getLocationStats,
      updateBasePrice,
      getBasePrice,
      getBasePrices,
      getWholesalePrices,
      updateWholesalePrice,
      isLoaded
    }}>
      {children}
    </FishDataContext.Provider>
  )
}

export function useFishData() {
  const context = useContext(FishDataContext)
  if (context === undefined) {
    throw new Error('useFishData must be used within a FishDataProvider')
  }
  return context
}
