"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useFarmingProfile, PondInfo, FishFood, PonaFish, Fertilizer, Medicine } from "@/contexts/farming-profile-context"
import { Plus, Trash2, Fish, Droplets, Pill, Sprout, MapPin } from "lucide-react"

export function FarmingProfileManager() {
  const {
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
    getFarmingAnalysis
  } = useFarmingProfile()

  const [newPond, setNewPond] = useState<Partial<PondInfo>>({})
  const [newFishFood, setNewFishFood] = useState<Partial<FishFood>>({})
  const [newPonaFish, setNewPonaFish] = useState<Partial<PonaFish>>({})
  const [newFertilizer, setNewFertilizer] = useState<Partial<Fertilizer>>({})
  const [newMedicine, setNewMedicine] = useState<Partial<Medicine>>({})

  const analysis = getFarmingAnalysis()

  const handleBasicInfoUpdate = (field: string, value: string) => {
    console.log(`Updating ${field} to ${value}`);
    // Make sure farmingProfile is initialized
    if (!farmingProfile) {
      updateFarmingProfile({ 
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
        [field]: value 
      });
    } else {
      updateFarmingProfile({ [field]: value });
    }
  }

  const handleAddPond = () => {
    if (newPond.name && newPond.size) {
      addPond({
        id: Date.now().toString(),
        name: newPond.name,
        size: newPond.size,
        depth: newPond.depth || '',
        type: newPond.type || 'মাটির পুকুর',
        waterSource: newPond.waterSource || 'নদী'
      })
      setNewPond({})
    }
  }

  const handleAddFishFood = () => {
    if (newFishFood.name && newFishFood.brand) {
      addFishFood({
        id: Date.now().toString(),
        name: newFishFood.name || '',
        brand: newFishFood.brand || '',
        type: newFishFood.type || 'প্রাকৃতিক',
        quantity: newFishFood.quantity || '',
        cost: newFishFood.cost || ''
      })
      setNewFishFood({})
    }
  }

  const handleAddPonaFish = () => {
    if (newPonaFish.fishType && newPonaFish.variety) {
      addPonaFish({
        id: Date.now().toString(),
        fishType: newPonaFish.fishType || '',
        variety: newPonaFish.variety || '',
        quantity: newPonaFish.quantity || '',
        source: newPonaFish.source || 'হ্যাচারি',
        cost: newPonaFish.cost || ''
      })
      setNewPonaFish({})
    }
  }

  const handleAddFertilizer = () => {
    if (newFertilizer.name && newFertilizer.type) {
      addFertilizer({
        id: Date.now().toString(),
        name: newFertilizer.name || '',
        type: newFertilizer.type || 'জৈব',
        quantity: newFertilizer.quantity || '',
        purpose: newFertilizer.purpose || 'পানির গুণাগুণ',
        cost: newFertilizer.cost || ''
      })
      setNewFertilizer({})
    }
  }

  const handleAddMedicine = () => {
    if (newMedicine.name && newMedicine.type) {
      addMedicine({
        id: Date.now().toString(),
        name: newMedicine.name || '',
        type: newMedicine.type || 'ভিটামিন',
        usage: newMedicine.usage || 'প্রয়োজনে',
        dosage: newMedicine.dosage || '',
        cost: newMedicine.cost || ''
      })
      setNewMedicine({})
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Fish className="h-5 w-5" />
            মাছ চাষের প্রোফাইল
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <Label htmlFor="monthlyBudget">মাসিক বাজেট (টাকা)</Label>
              <Input
                id="monthlyBudget"
                value={farmingProfile?.monthlyBudget || ''}
                onChange={(e) => handleBasicInfoUpdate('monthlyBudget', e.target.value)}
                placeholder="০"
              />
            </div>
            <div>
              <Label htmlFor="targetProduction">লক্ষ্য উৎপাদন (কেজি/মাস)</Label>
              <Input
                id="targetProduction"
                value={farmingProfile?.targetProduction || ''}
                onChange={(e) => handleBasicInfoUpdate('targetProduction', e.target.value)}
                placeholder="০"
              />
            </div>
          </div>

          {analysis && (
            <Card className="mb-6 bg-blue-50 dark:bg-blue-950/20">
              <CardHeader>
                <CardTitle className="text-lg">বিশ্লেষণ সারসংক্ষেপ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-gray-600 dark:text-gray-400">মোট পুকুর এলাকা</div>
                    <div className="font-semibold">{analysis.totalPondSize.toFixed(2)} একর</div>
                  </div>
                  <div>
                    <div className="text-gray-600 dark:text-gray-400">মাসিক খাদ্য খরচ</div>
                    <div className="font-semibold">{analysis.totalMonthlyFoodCost.toFixed(0)} ৳</div>
                  </div>
                  <div>
                    <div className="text-gray-600 dark:text-gray-400">গড় পুকুর আকার</div>
                    <div className="font-semibold">{analysis.averagePondSize.toFixed(2)} একর</div>
                  </div>
                  <div>
                    <div className="text-gray-600 dark:text-gray-400">একর প্রতি খাদ্য খরচ</div>
                    <div className="font-semibold">{analysis.foodCostPerDecimal.toFixed(0)} ৳</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Tabs defaultValue="ponds" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="ponds">পুকুর</TabsTrigger>
              <TabsTrigger value="food">খাদ্য</TabsTrigger>
              <TabsTrigger value="pona">পোনা</TabsTrigger>
              <TabsTrigger value="fertilizer">সার</TabsTrigger>
              <TabsTrigger value="medicine">ওষুধ</TabsTrigger>
            </TabsList>

            {/* Ponds Tab */}
            <TabsContent value="ponds" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    নতুন পুকুর যোগ করুন
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <Label>পুকুরের নাম</Label>
                      <Input
                        value={newPond.name || ''}
                        onChange={(e) => setNewPond(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="পুকুর ১"
                      />
                    </div>
                    <div>
                      <Label>আকার (একর)</Label>
                      <Input
                        value={newPond.size || ''}
                        onChange={(e) => setNewPond(prev => ({ ...prev, size: e.target.value }))}
                        placeholder="১.৫"
                      />
                    </div>
                    <div>
                      <Label>গভীরতা (ফুট)</Label>
                      <Input
                        value={newPond.depth || ''}
                        onChange={(e) => setNewPond(prev => ({ ...prev, depth: e.target.value }))}
                        placeholder="৮"
                      />
                    </div>
                    <div>
                      <Label>ধরন</Label>
                      <Select value={newPond.type} onValueChange={(value) => setNewPond(prev => ({ ...prev, type: value as any }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="নির্বাচন করুন" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="মাটির পুকুর">মাটির পুকুর</SelectItem>
                          <SelectItem value="পাকা পুকুর">পাকা পুকুর</SelectItem>
                          <SelectItem value="প্লাস্টিক পুকুর">প্লাস্টিক পুকুর</SelectItem>
                          <SelectItem value="অন্যান্য">অন্যান্য</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>পানির উৎস</Label>
                      <Select value={newPond.waterSource} onValueChange={(value) => setNewPond(prev => ({ ...prev, waterSource: value as any }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="নির্বাচন করুন" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="নদী">নদী</SelectItem>
                          <SelectItem value="নলকূপ">নলকূপ</SelectItem>
                          <SelectItem value="বৃষ্টির পানি">বৃষ্টির পানি</SelectItem>
                          <SelectItem value="অন্যান্য">অন্যান্য</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button onClick={handleAddPond} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    পুকুর যোগ করুন
                  </Button>
                </CardContent>
              </Card>

              {farmingProfile?.ponds && farmingProfile.ponds.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>বর্তমান পুকুরসমূহ</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {farmingProfile.ponds.map((pond) => (
                        <div key={pond.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">{pond.name}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {pond.size} একর, {pond.depth} ফুট, {pond.type}, {pond.waterSource}
                            </div>
                          </div>
                          <Button variant="outline" size="sm" onClick={() => removePond(pond.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Fish Food Tab */}
            <TabsContent value="food" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Fish className="h-4 w-4" />
                    নতুন খাদ্য যোগ করুন
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <Label>খাদ্যের নাম</Label>
                      <Input
                        value={newFishFood.name || ''}
                        onChange={(e) => setNewFishFood(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="ফিশ ফিড"
                      />
                    </div>
                    <div>
                      <Label>ব্র্যান্ড</Label>
                      <Input
                        value={newFishFood.brand || ''}
                        onChange={(e) => setNewFishFood(prev => ({ ...prev, brand: e.target.value }))}
                        placeholder="মেঘনা ফিশ ফিড"
                      />
                    </div>
                    <div>
                      <Label>ধরন</Label>
                      <Select value={newFishFood.type} onValueChange={(value) => setNewFishFood(prev => ({ ...prev, type: value as any }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="নির্বাচন করুন" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="প্রাকৃতিক">প্রাকৃতিক</SelectItem>
                          <SelectItem value="কৃত্রিম">কৃত্রিম</SelectItem>
                          <SelectItem value="মিশ্র">মিশ্র</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>পরিমাণ (কেজি/মাস)</Label>
                      <Input
                        value={newFishFood.quantity || ''}
                        onChange={(e) => setNewFishFood(prev => ({ ...prev, quantity: e.target.value }))}
                        placeholder="১০"
                      />
                    </div>
                    <div>
                      <Label>দাম (টাকা/কেজি)</Label>
                      <Input
                        value={newFishFood.cost || ''}
                        onChange={(e) => setNewFishFood(prev => ({ ...prev, cost: e.target.value }))}
                        placeholder="৮০"
                      />
                    </div>
                  </div>
                  <Button onClick={handleAddFishFood} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    খাদ্য যোগ করুন
                  </Button>
                </CardContent>
              </Card>

              {farmingProfile?.fishFoods && farmingProfile.fishFoods.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>বর্তমান খাদ্যসমূহ</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {farmingProfile.fishFoods.map((food) => (
                        <div key={food.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">{food.name} - {food.brand}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              <Badge variant="outline" className="mr-2">{food.type}</Badge>
                              {food.quantity} কেজি/মাস, {food.cost} ৳/কেজি
                            </div>
                          </div>
                          <Button variant="outline" size="sm" onClick={() => removeFishFood(food.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Similar structure for Pona, Fertilizer, and Medicine tabs */}
            <TabsContent value="pona" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Fish className="h-4 w-4" />
                    নতুন পোনা যোগ করুন
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <Label>মাছের ধরন</Label>
                      <Input
                        value={newPonaFish.fishType || ''}
                        onChange={(e) => setNewPonaFish(prev => ({ ...prev, fishType: e.target.value }))}
                        placeholder="রুই"
                      />
                    </div>
                    <div>
                      <Label>জাত</Label>
                      <Input
                        value={newPonaFish.variety || ''}
                        onChange={(e) => setNewPonaFish(prev => ({ ...prev, variety: e.target.value }))}
                        placeholder="থাই রুই"
                      />
                    </div>
                    <div>
                      <Label>উৎস</Label>
                      <Select value={newPonaFish.source} onValueChange={(value) => setNewPonaFish(prev => ({ ...prev, source: value as any }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="নির্বাচন করুন" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="হ্যাচারি">হ্যাচারি</SelectItem>
                          <SelectItem value="প্রাকৃতিক">প্রাকৃতিক</SelectItem>
                          <SelectItem value="সরকারি">সরকারি</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>পরিমাণ (টি)</Label>
                      <Input
                        value={newPonaFish.quantity || ''}
                        onChange={(e) => setNewPonaFish(prev => ({ ...prev, quantity: e.target.value }))}
                        placeholder="১০০০"
                      />
                    </div>
                    <div>
                      <Label>দাম (টাকা/টি)</Label>
                      <Input
                        value={newPonaFish.cost || ''}
                        onChange={(e) => setNewPonaFish(prev => ({ ...prev, cost: e.target.value }))}
                        placeholder="২"
                      />
                    </div>
                  </div>
                  <Button onClick={handleAddPonaFish} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    পোনা যোগ করুন
                  </Button>
                </CardContent>
              </Card>

              {farmingProfile?.ponaFishes && farmingProfile.ponaFishes.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>বর্তমান পোনা মাছ</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {farmingProfile.ponaFishes.map((pona) => (
                        <div key={pona.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">{pona.fishType} - {pona.variety}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              <Badge variant="outline" className="mr-2">{pona.source}</Badge>
                              {pona.quantity} টি, {pona.cost} ৳/টি
                            </div>
                          </div>
                          <Button variant="outline" size="sm" onClick={() => removePonaFish(pona.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="fertilizer" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Sprout className="h-4 w-4" />
                    নতুন সার যোগ করুন
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <Label>সারের নাম</Label>
                      <Input
                        value={newFertilizer.name || ''}
                        onChange={(e) => setNewFertilizer(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="গোবর"
                      />
                    </div>
                    <div>
                      <Label>ধরন</Label>
                      <Select value={newFertilizer.type} onValueChange={(value) => setNewFertilizer(prev => ({ ...prev, type: value as any }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="নির্বাচন করুন" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="জৈব">জৈব</SelectItem>
                          <SelectItem value="রাসায়নিক">রাসায়নিক</SelectItem>
                          <SelectItem value="মিশ্র">মিশ্র</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>উদ্দেশ্য</Label>
                      <Select value={newFertilizer.purpose} onValueChange={(value) => setNewFertilizer(prev => ({ ...prev, purpose: value as any }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="নির্বাচন করুন" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="পানির গুণাগুণ">পানির গুণাগুণ</SelectItem>
                          <SelectItem value="মাছের বৃদ্ধি">মাছের বৃদ্ধি</SelectItem>
                          <SelectItem value="পুকুর পরিষ্কার">পুকুর পরিষ্কার</SelectItem>
                          <SelectItem value="অন্যান্য">অন্যান্য</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>পরিমাণ (কেজি/মাস)</Label>
                      <Input
                        value={newFertilizer.quantity || ''}
                        onChange={(e) => setNewFertilizer(prev => ({ ...prev, quantity: e.target.value }))}
                        placeholder="৫"
                      />
                    </div>
                    <div>
                      <Label>দাম (টাকা/কেজি)</Label>
                      <Input
                        value={newFertilizer.cost || ''}
                        onChange={(e) => setNewFertilizer(prev => ({ ...prev, cost: e.target.value }))}
                        placeholder="১০"
                      />
                    </div>
                  </div>
                  <Button onClick={handleAddFertilizer} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    সার যোগ করুন
                  </Button>
                </CardContent>
              </Card>

              {farmingProfile?.fertilizers && farmingProfile.fertilizers.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>বর্তমান সারসমূহ</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {farmingProfile.fertilizers.map((fertilizer) => (
                        <div key={fertilizer.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">{fertilizer.name}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              <Badge variant="outline" className="mr-2">{fertilizer.type}</Badge>
                              {fertilizer.purpose}, {fertilizer.quantity} কেজি/মাস, {fertilizer.cost} ৳/কেজি
                            </div>
                          </div>
                          <Button variant="outline" size="sm" onClick={() => removeFertilizer(fertilizer.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="medicine" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Pill className="h-4 w-4" />
                    নতুন ওষুধ যোগ করুন
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <Label>ওষুধের নাম</Label>
                      <Input
                        value={newMedicine.name || ''}
                        onChange={(e) => setNewMedicine(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="ভিটামিন সি"
                      />
                    </div>
                    <div>
                      <Label>ধরন</Label>
                      <Select value={newMedicine.type} onValueChange={(value) => setNewMedicine(prev => ({ ...prev, type: value as any }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="নির্বাচন করুন" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="অ্যান্টিবায়োটিক">অ্যান্টিবায়োটিক</SelectItem>
                          <SelectItem value="ভিটামিন">ভিটামিন</SelectItem>
                          <SelectItem value="প্রোবায়োটিক">প্রোবায়োটিক</SelectItem>
                          <SelectItem value="রোগ প্রতিরোধী">রোগ প্রতিরোধী</SelectItem>
                          <SelectItem value="অন্যান্য">অন্যান্য</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>ব্যবহার</Label>
                      <Select value={newMedicine.usage} onValueChange={(value) => setNewMedicine(prev => ({ ...prev, usage: value as any }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="নির্বাচন করুন" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="নিয়মিত">নিয়মিত</SelectItem>
                          <SelectItem value="প্রয়োজনে">প্রয়োজনে</SelectItem>
                          <SelectItem value="মাসিক">মাসিক</SelectItem>
                          <SelectItem value="সাপ্তাহিক">সাপ্তাহিক</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>ডোজ</Label>
                      <Input
                        value={newMedicine.dosage || ''}
                        onChange={(e) => setNewMedicine(prev => ({ ...prev, dosage: e.target.value }))}
                        placeholder="১ গ্রাম/১০০ লিটার"
                      />
                    </div>
                    <div>
                      <Label>দাম (টাকা/ডোজ)</Label>
                      <Input
                        value={newMedicine.cost || ''}
                        onChange={(e) => setNewMedicine(prev => ({ ...prev, cost: e.target.value }))}
                        placeholder="৫০"
                      />
                    </div>
                  </div>
                  <Button onClick={handleAddMedicine} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    ওষুধ যোগ করুন
                  </Button>
                </CardContent>
              </Card>

              {farmingProfile?.medicines && farmingProfile.medicines.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>বর্তমান ওষুধসমূহ</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {farmingProfile.medicines.map((medicine) => (
                        <div key={medicine.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">{medicine.name}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              <Badge variant="outline" className="mr-2">{medicine.type}</Badge>
                              {medicine.usage}, {medicine.dosage}, {medicine.cost} ৳/ডোজ
                            </div>
                          </div>
                          <Button variant="outline" size="sm" onClick={() => removeMedicine(medicine.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
