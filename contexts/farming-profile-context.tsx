"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

// Farming profile interfaces
export interface PondInfo {
  id: string
  name: string
  size: string // in decimal/acres
  depth: string // in feet
  type: 'মাটির পুকুর' | 'পাকা পুকুর' | 'প্লাস্টিক পুকুর' | 'অন্যান্য'
  waterSource: 'নদী' | 'নলকূপ' | 'বৃষ্টির পানি' | 'অন্যান্য'
}

export interface FishFood {
  id: string
  name: string
  brand: string
  type: 'প্রাকৃতিক' | 'কৃত্রিম' | 'মিশ্র'
  quantity: string // kg per month
  cost: string // taka per kg
}

export interface PonaFish {
  id: string
  fishType: string
  variety: string
  quantity: string // pieces
  source: 'হ্যাচারি' | 'প্রাকৃতিক' | 'সরকারি'
  cost: string // taka per piece
}

export interface Fertilizer {
  id: string
  name: string
  type: 'জৈব' | 'রাসায়নিক' | 'মিশ্র'
  quantity: string // kg per month
  purpose: 'পানির গুণাগুণ' | 'মাছের বৃদ্ধি' | 'পুকুর পরিষ্কার' | 'অন্যান্য'
  cost: string // taka per kg
}

export interface Medicine {
  id: string
  name: string
  type: 'অ্যান্টিবায়োটিক' | 'ভিটামিন' | 'প্রোবায়োটিক' | 'রোগ প্রতিরোধী' | 'অন্যান্য'
  usage: 'নিয়মিত' | 'প্রয়োজনে' | 'মাসিক' | 'সাপ্তাহিক'
  dosage: string
  cost: string // taka per dose
}

export interface FarmingProfile {
  jeleName: string
  experience: string // years
  totalPonds: number
  ponds: PondInfo[]
  fishFoods: FishFood[]
  ponaFishes: PonaFish[]
  fertilizers: Fertilizer[]
  medicines: Medicine[]
  monthlyBudget: string
  targetProduction: string // kg per month
  mainChallenges: string[]
  lastUpdated: string
}

interface FarmingContextType {
  farmingProfile: FarmingProfile | null
  updateFarmingProfile: (profile: Partial<FarmingProfile>) => void
  addPond: (pond: PondInfo) => void
  addFishFood: (food: FishFood) => void
  addPonaFish: (pona: PonaFish) => void
  addFertilizer: (fertilizer: Fertilizer) => void
  addMedicine: (medicine: Medicine) => void
  removePond: (pondId: string) => void
  removeFishFood: (foodId: string) => void
  removePonaFish: (ponaId: string) => void
  removeFertilizer: (fertilizerId: string) => void
  removeMedicine: (medicineId: string) => void
  getFarmingAnalysis: () => any
  getFarmingRecommendations: () => string[]
}

const FarmingContext = createContext<FarmingContextType | undefined>(undefined)

// Sample farming profile for testing
const sampleFarmingProfile: FarmingProfile = {
  jeleName: "আব্দুল করিম",
  experience: "৫ বছর",
  totalPonds: 3,
  ponds: [
    {
      id: "pond1",
      name: "পুকুর ১",
      size: "২.৫",
      depth: "৮ ফুট",
      type: "মাটির পুকুর",
      waterSource: "নদী"
    },
    {
      id: "pond2",
      name: "পুকুর ২",
      size: "১.৮",
      depth: "৭ ফুট",
      type: "মাটির পুকুর",
      waterSource: "বৃষ্টির পানি"
    },
    {
      id: "pond3",
      name: "পুকুর ৩",
      size: "১.২",
      depth: "৬ ফুট",
      type: "পাকা পুকুর",
      waterSource: "নলকূপ"
    }
  ],
  fishFoods: [
    {
      id: "food1",
      name: "মেগা ফিড",
      brand: "মেগা",
      type: "কৃত্রিম",
      quantity: "৫০",
      cost: "৬৫"
    },
    {
      id: "food2",
      name: "চাল কুড়া",
      brand: "নিজস্ব",
      type: "প্রাকৃতিক",
      quantity: "৩০",
      cost: "৪০"
    }
  ],
  ponaFishes: [
    {
      id: "pona1",
      fishType: "রুই",
      variety: "কাতলা রুই",
      quantity: "৫০০০",
      source: "হ্যাচারি",
      cost: "৩"
    },
    {
      id: "pona2",
      fishType: "কাতলা",
      variety: "উন্নত কাতলা",
      quantity: "২৫০০",
      source: "হ্যাচারি",
      cost: "৪"
    }
  ],
  fertilizers: [
    {
      id: "fert1",
      name: "ইউরিয়া",
      type: "রাসায়নিক",
      quantity: "২০",
      purpose: "পানির গুণাগুণ",
      cost: "২৫"
    }
  ],
  medicines: [
    {
      id: "med1",
      name: "অক্সিটেট্রাসাইক্লিন",
      type: "অ্যান্টিবায়োটিক",
      usage: "প্রয়োজনে",
      dosage: "৫ গ্রাম প্রতি ১০০ লিটার পানিতে",
      cost: "১৫০"
    },
    {
      id: "med2",
      name: "পটাসিয়াম পারমাঙ্গানেট",
      type: "রোগ প্রতিরোধী",
      usage: "মাসিক",
      dosage: "২ গ্রাম প্রতি ১০০ লিটার পানিতে",
      cost: "৮০"
    }
  ],
  monthlyBudget: "৮০০০০",
  targetProduction: "৫০০",
  mainChallenges: ["রোগ প্রতিরোধ", "পানির গুণমান", "খাদ্যের দাম"],
  lastUpdated: new Date().toISOString()
};

export function FarmingProfileProvider({ children }: { children: React.ReactNode }) {
  const [farmingProfile, setFarmingProfile] = useState<FarmingProfile | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [lastSaved, setLastSaved] = useState<number | null>(null)

  // Load farming profile from localStorage
  useEffect(() => {
    const loadFarmingProfile = () => {
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('farmingProfile')
        console.log('[FarmingContext] Loading farming profile from localStorage:', stored ? 'Found profile' : 'No profile found')
        
        if (stored) {
          try {
            const parsedProfile = JSON.parse(stored)
            // Basic validation that it's a non-empty object with expected properties
            if (parsedProfile && 
                typeof parsedProfile === 'object' && 
                Object.keys(parsedProfile).length > 0 &&
                parsedProfile.jeleName) {
              console.log('[FarmingContext] Successfully loaded farming profile')
              setFarmingProfile(parsedProfile)
            } else {
              console.log('[FarmingContext] Stored farming profile is incomplete, using sample profile')
              setFarmingProfile(sampleFarmingProfile)
            }
          } catch (parseError) {
            console.error('[FarmingContext] Error parsing farming profile JSON:', parseError)
            // Set sample profile on error
            console.log('[FarmingContext] Using sample farming profile due to parse error')
            setFarmingProfile(sampleFarmingProfile)
          }
        } else {
          // Initialize with sample data if not found
          console.log('[FarmingContext] No profile found, using sample farming profile')
          setFarmingProfile(sampleFarmingProfile)
        }
      }
    } catch (error) {
      console.error('[FarmingContext] Error loading farming profile from localStorage:', error)
      // Set sample profile on error
      console.log('[FarmingContext] Using sample farming profile due to error')
      setFarmingProfile(sampleFarmingProfile)
    } finally {
      setIsLoaded(true)
    }
  }

    loadFarmingProfile()
  }, [])

  // Save to localStorage whenever profile changes, with throttling
  useEffect(() => {
    if (isLoaded && farmingProfile) {
      // Throttle save operations to once per second
      const now = Date.now();
      if (lastSaved === null || now - lastSaved > 1000) {
        try {
          if (typeof window !== 'undefined') {
            const jsonData = JSON.stringify(farmingProfile)
            
            // Ensure the data we're saving is not empty
            if (jsonData !== '{}' && jsonData !== 'null') {
              localStorage.setItem('farmingProfile', jsonData)
              setLastSaved(now);
              console.log('[FarmingContext] Farming profile saved successfully. Data size:', jsonData.length, 'characters')
            } else {
              console.error('[FarmingContext] Prevented saving empty data to localStorage')
            }
          }
        } catch (error) {
          console.error('[FarmingContext] Error saving farming profile:', error)
        }
      }
    }
  }, [farmingProfile, isLoaded, lastSaved])

  const updateFarmingProfile = (profile: Partial<FarmingProfile>) => {
    setFarmingProfile(prev => {
      if (!prev) {
        // Create a new profile with default values
        const newProfile = {
          jeleName: '',
          experience: '',
          totalPonds: 0,
          ponds: [],
          fishFoods: [],
          ponaFishes: [],
          fertilizers: [],
          medicines: [],
          monthlyBudget: '',
          targetProduction: '',
          mainChallenges: [],
          lastUpdated: new Date().toISOString(),
          ...profile
        };
        console.log('Creating new farming profile:', newProfile);
        return newProfile;
      }
      
      // Update existing profile
      const updatedProfile = { 
        ...prev, 
        ...profile, 
        lastUpdated: new Date().toISOString() 
      };
      console.log('Updating farming profile:', updatedProfile);
      return updatedProfile;
    });
  }

  const addPond = (pond: PondInfo) => {
    setFarmingProfile(prev => {
      if (!prev) {
        // Initialize farming profile if it doesn't exist
        return {
          jeleName: '',
          experience: '',
          totalPonds: 1,
          ponds: [pond],
          fishFoods: [],
          ponaFishes: [],
          fertilizers: [],
          medicines: [],
          monthlyBudget: '',
          targetProduction: '',
          mainChallenges: [],
          lastUpdated: new Date().toISOString()
        };
      }
      
      return {
        ...prev,
        ponds: [...prev.ponds, pond],
        totalPonds: prev.ponds.length + 1,
        lastUpdated: new Date().toISOString()
      };
    });
  }

  const addFishFood = (food: FishFood) => {
    setFarmingProfile(prev => {
      if (!prev) {
        // Initialize farming profile if it doesn't exist
        return {
          jeleName: '',
          experience: '',
          totalPonds: 0,
          ponds: [],
          fishFoods: [food],
          ponaFishes: [],
          fertilizers: [],
          medicines: [],
          monthlyBudget: '',
          targetProduction: '',
          mainChallenges: [],
          lastUpdated: new Date().toISOString()
        };
      }
      
      return {
        ...prev,
        fishFoods: [...prev.fishFoods, food],
        lastUpdated: new Date().toISOString()
      };
    });
  }

  const addPonaFish = (pona: PonaFish) => {
    setFarmingProfile(prev => {
      if (!prev) {
        // Initialize farming profile if it doesn't exist
        return {
          jeleName: '',
          experience: '',
          totalPonds: 0,
          ponds: [],
          fishFoods: [],
          ponaFishes: [pona],
          fertilizers: [],
          medicines: [],
          monthlyBudget: '',
          targetProduction: '',
          mainChallenges: [],
          lastUpdated: new Date().toISOString()
        };
      }
      
      return {
        ...prev,
        ponaFishes: [...prev.ponaFishes, pona],
        lastUpdated: new Date().toISOString()
      };
    });
  }

  const addFertilizer = (fertilizer: Fertilizer) => {
    setFarmingProfile(prev => {
      if (!prev) {
        // Initialize farming profile if it doesn't exist
        return {
          jeleName: '',
          experience: '',
          totalPonds: 0,
          ponds: [],
          fishFoods: [],
          ponaFishes: [],
          fertilizers: [fertilizer],
          medicines: [],
          monthlyBudget: '',
          targetProduction: '',
          mainChallenges: [],
          lastUpdated: new Date().toISOString()
        };
      }
      
      return {
        ...prev,
        fertilizers: [...prev.fertilizers, fertilizer],
        lastUpdated: new Date().toISOString()
      };
    });
  }

  const addMedicine = (medicine: Medicine) => {
    setFarmingProfile(prev => {
      if (!prev) {
        // Initialize farming profile if it doesn't exist
        return {
          jeleName: '',
          experience: '',
          totalPonds: 0,
          ponds: [],
          fishFoods: [],
          ponaFishes: [],
          fertilizers: [],
          medicines: [medicine],
          monthlyBudget: '',
          targetProduction: '',
          mainChallenges: [],
          lastUpdated: new Date().toISOString()
        };
      }
      
      return {
        ...prev,
        medicines: [...prev.medicines, medicine],
        lastUpdated: new Date().toISOString()
      };
    });
  }

  const removePond = (pondId: string) => {
    setFarmingProfile(prev => {
      if (!prev) return null;
      
      const updatedPonds = prev.ponds.filter(p => p.id !== pondId);
      return {
        ...prev,
        ponds: updatedPonds,
        totalPonds: updatedPonds.length,
        lastUpdated: new Date().toISOString()
      };
    });
  }

  const removeFishFood = (foodId: string) => {
    setFarmingProfile(prev => prev ? {
      ...prev,
      fishFoods: prev.fishFoods.filter(f => f.id !== foodId),
      lastUpdated: new Date().toISOString()
    } : null)
  }

  const removePonaFish = (ponaId: string) => {
    setFarmingProfile(prev => prev ? {
      ...prev,
      ponaFishes: prev.ponaFishes.filter(p => p.id !== ponaId),
      lastUpdated: new Date().toISOString()
    } : null)
  }

  const removeFertilizer = (fertilizerId: string) => {
    setFarmingProfile(prev => prev ? {
      ...prev,
      fertilizers: prev.fertilizers.filter(f => f.id !== fertilizerId),
      lastUpdated: new Date().toISOString()
    } : null)
  }

  const removeMedicine = (medicineId: string) => {
    setFarmingProfile(prev => prev ? {
      ...prev,
      medicines: prev.medicines.filter(m => m.id !== medicineId),
      lastUpdated: new Date().toISOString()
    } : null)
  }

  // Analysis function for farming data
  const getFarmingAnalysis = () => {
    if (!farmingProfile) return null

    const totalPondSize = farmingProfile.ponds.reduce((sum, pond) => sum + parseFloat(pond.size || '0'), 0)
    const totalFoodCost = farmingProfile.fishFoods.reduce((sum, food) => {
      const quantity = parseFloat(food.quantity || '0')
      const cost = parseFloat(food.cost || '0')
      return sum + (quantity * cost)
    }, 0)
    const totalFertilizerCost = farmingProfile.fertilizers.reduce((sum, fert) => {
      const quantity = parseFloat(fert.quantity || '0')
      const cost = parseFloat(fert.cost || '0')
      return sum + (quantity * cost)
    }, 0)
    const totalPonaCost = farmingProfile.ponaFishes.reduce((sum, pona) => {
      const quantity = parseFloat(pona.quantity || '0')
      const cost = parseFloat(pona.cost || '0')
      return sum + (quantity * cost)
    }, 0)

    return {
      totalPondSize,
      totalMonthlyFoodCost: totalFoodCost,
      totalMonthlyFertilizerCost: totalFertilizerCost,
      totalPonaCost,
      pondDensity: farmingProfile.totalPonds / totalPondSize,
      averagePondSize: totalPondSize / farmingProfile.totalPonds,
      foodCostPerDecimal: totalFoodCost / totalPondSize,
      targetProductionPerDecimal: parseFloat(farmingProfile.targetProduction || '0') / totalPondSize
    }
  }

  // Recommendation system based on farming data
  const getFarmingRecommendations = (): string[] => {
    if (!farmingProfile) return []

    const analysis = getFarmingAnalysis()
    const recommendations: string[] = []

    if (analysis) {
      // Pond size recommendations
      if (analysis.averagePondSize < 0.5) {
        recommendations.push("আপনার পুকুরের গড় আকার ছোট। বড় পুকুরে মাছের বৃদ্ধি ভালো হয় এবং ব্যবস্থাপনা সহজ হয়।")
      }

      // Food cost recommendations
      if (analysis.foodCostPerDecimal > 5000) {
        recommendations.push("খাদ্য খরচ বেশি। স্থানীয় উপাদান দিয়ে খাদ্য তৈরি করে খরচ কমানো যায়।")
      }

      // Pond density recommendations
      if (analysis.pondDensity > 2) {
        recommendations.push("প্রতি একরে পুকুরের সংখ্যা বেশি। কম পুকুরে বেশি এলাকা দিলে উ�ৎপাদন বাড়বে।")
      }

      // Food type recommendations
      const artificialFoodCount = farmingProfile.fishFoods.filter(f => f.type === 'কৃত্রিম').length
      const naturalFoodCount = farmingProfile.fishFoods.filter(f => f.type === 'প্রাকৃতিক').length
      
      if (artificialFoodCount > naturalFoodCount * 2) {
        recommendations.push("অধিক কৃত্রিম খাদ্য ব্যবহার করছেন। প্রাকৃতিক খাদ্যের সাথে মিশিয়ে দিলে খরচ কমবে।")
      }

      // Medicine usage recommendations
      const regularMedicines = farmingProfile.medicines.filter(m => m.usage === 'নিয়মিত').length
      if (regularMedicines > 3) {
        recommendations.push("নিয়মিত অনেক ওষুধ ব্যবহার করছেন। প্রোবায়োটিক ব্যবহার করে রোগ প্রতিরোধ ক্ষমতা বাড়ান।")
      }

      // Fertilizer recommendations
      const organicFertilizers = farmingProfile.fertilizers.filter(f => f.type === 'জৈব').length
      const chemicalFertilizers = farmingProfile.fertilizers.filter(f => f.type === 'রাসায়নিক').length
      
      if (chemicalFertilizers > organicFertilizers) {
        recommendations.push("জৈব সার বেশি ব্যবহার করুন। গোবর, মুরগির বিষ্ঠা ব্যবহার করে খরচ কমান।")
      }

      // Production target recommendations
      if (analysis.targetProductionPerDecimal < 100) {
        recommendations.push("উ৉পাদন লক্ষ্য কম। সঠিক পরিচর্যায় প্রতি একরে ১৫০-২০০ কেজি উৎপাদন সম্ভব।")
      }

      // Pona source recommendations
      const hatcheryPona = farmingProfile.ponaFishes.filter(p => p.source === 'হ্যাচারি').length
      const governmentPona = farmingProfile.ponaFishes.filter(p => p.source === 'সরকারি').length
      
      if (hatcheryPona > governmentPona) {
        recommendations.push("সরকারি হ্যাচারি থেকে পোনা কিনলে খরচ কম হবে এবং গুণগত মান ভালো পাবেন।")
      }

      // Water source recommendations
      const riverWater = farmingProfile.ponds.filter(p => p.waterSource === 'নদী').length
      const tubewellWater = farmingProfile.ponds.filter(p => p.waterSource === 'নলকূপ').length
      
      if (tubewellWater > riverWater && farmingProfile.ponds.length > 1) {
        recommendations.push("নলকূপের পানি খরচ বেশি। নদীর পানি বা বৃষ্টির পানি ব্যবহার করার চেষ্টা করুন।")
      }
    }

    // Default recommendations if no specific issues found
    if (recommendations.length === 0) {
      recommendations.push("আপনার মাছ চাষ ভালো হচ্ছে। নিয়মিত পানি পরীক্ষা করুন।")
      recommendations.push("মাছের স্বাস্থ্য পরীক্ষা করে প্রয়োজনে ব্যবস্থা নিন।")
      recommendations.push("বাজারের দাম অনুযায়ী মাছ বিক্রয়ের সময় ঠিক করুন।")
    }

    return recommendations
  }

  return (
    <FarmingContext.Provider value={{
      farmingProfile,
      updateFarmingProfile,
      addPond,
      addFishFood,
      addPonaFish,
      addFertilizer,
      addMedicine,
      removePond,
      removeFishFood,
      removePonaFish,
      removeFertilizer,
      removeMedicine,
      getFarmingAnalysis,
      getFarmingRecommendations
    }}>
      {children}
    </FarmingContext.Provider>
  )
}

export function useFarmingProfile() {
  const context = useContext(FarmingContext)
  if (context === undefined) {
    throw new Error('useFarmingProfile must be used within a FarmingProfileProvider')
  }
  return context
}
