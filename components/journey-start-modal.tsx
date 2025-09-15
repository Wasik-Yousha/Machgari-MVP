"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, MapPin, Truck, Clock, Phone, Navigation } from "lucide-react"

interface JourneyStartModalProps {
  isOpen: boolean
  onClose: () => void
  transaction: {
    id: number
    fishName: string
    quantity: string
    finalPrice: number
    arotdarName: string
    arotdarLocation?: string
    arotdarPhone?: string
  } | null
}

export function JourneyStartModal({ isOpen, onClose, transaction }: JourneyStartModalProps) {
  const [journeyStarted, setJourneyStarted] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const journeySteps = [
    { id: 1, title: "যাত্রা শুরু", description: "মাছ নিয়ে আড়তের দিকে রওনা দিন", icon: Truck },
    { id: 2, title: "পৌঁছান", description: "আড়তে পৌঁছে আড়তদারের সাথে যোগাযোগ করুন", icon: MapPin },
    { id: 3, title: "মাছ হস্তান্তর", description: "মাছ যাচাই করিয়ে হস্তান্তর করুন", icon: CheckCircle2 },
    { id: 4, title: "টাকা গ্রহণ", description: "চূড়ান্ত মূল্য গ্রহণ করুন", icon: CheckCircle2 }
  ]

  const handleStartJourney = () => {
    setJourneyStarted(true)
    setCurrentStep(1)
    // In a real app, this would track the journey with GPS
  }

  const handleNextStep = () => {
    if (currentStep < journeySteps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleCompleteJourney = () => {
    setJourneyStarted(false)
    setCurrentStep(0)
    onClose()
  }

  if (!transaction) return null

  // Calculate total value
  const getQuantityNumber = (quantityString: string): number => {
    const match = quantityString.match(/(\d+)/)
    return match ? parseInt(match[1]) : 0
  }

  const totalValue = transaction.finalPrice * getQuantityNumber(transaction.quantity)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            পরিবহন যাত্রা শুরু করুন
          </DialogTitle>
          <DialogDescription>
            আপনার বিক্রিত মাছ আড়তে পৌঁছে দিতে যাত্রা শুরু করুন
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Transaction Summary */}
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{transaction.fishName}</h3>
                  <p className="text-sm text-gray-500">পরিমাণ: {transaction.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">চূড়ান্ত মূল্য</p>
                  <p className="text-xl font-bold text-green-600">৳{totalValue.toLocaleString('bn-BD')}</p>
                  <p className="text-xs text-gray-400">(৳{transaction.finalPrice}/কেজি)</p>
                </div>
              </div>
              
              <Separator className="my-3" />
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">আড়তদার:</span>
                  <span className="font-medium">{transaction.arotdarName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">গন্তব্য:</span>
                  <span className="font-medium">{transaction.arotdarLocation || "কাওরান বাজার, ঢাকা"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">যোগাযোগ:</span>
                  <span className="font-medium">{transaction.arotdarPhone || "০১৭১২৩৪৫৬৭৮"}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Journey Progress */}
          {journeyStarted && (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">যাত্রার অগ্রগতি</h3>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    {currentStep}/{journeySteps.length} ধাপ
                  </Badge>
                </div>
                
                <Progress value={(currentStep / journeySteps.length) * 100} className="mb-4" />
                
                <div className="space-y-3">
                  {journeySteps.map((step, index) => {
                    const StepIcon = step.icon
                    const isCompleted = index + 1 <= currentStep
                    const isCurrent = index + 1 === currentStep + 1
                    
                    return (
                      <div 
                        key={step.id} 
                        className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                          isCompleted 
                            ? 'bg-green-50 border border-green-200' 
                            : isCurrent 
                              ? 'bg-blue-50 border border-blue-200'
                              : 'bg-gray-50 border border-gray-200'
                        }`}
                      >
                        <div className={`
                          rounded-full p-2 
                          ${isCompleted 
                            ? 'bg-green-100 text-green-600' 
                            : isCurrent 
                              ? 'bg-blue-100 text-blue-600'
                              : 'bg-gray-100 text-gray-400'
                          }
                        `}>
                          <StepIcon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-medium ${isCompleted ? 'text-green-700' : isCurrent ? 'text-blue-700' : 'text-gray-500'}`}>
                            {step.title}
                          </h4>
                          <p className={`text-sm ${isCompleted ? 'text-green-600' : isCurrent ? 'text-blue-600' : 'text-gray-400'}`}>
                            {step.description}
                          </p>
                        </div>
                        {isCompleted && (
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          {!journeyStarted ? (
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => window.open(`tel:${transaction.arotdarPhone || "০১৭১২৩৪৫৬৭৮"}`, '_self')}
              >
                <Phone className="h-4 w-4" />
                আড়তদারকে কল করুন
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => window.open(`https://maps.google.com/`, '_blank')}
              >
                <Navigation className="h-4 w-4" />
                রুট দেখুন
              </Button>
            </div>
          ) : (
            <div className="flex justify-center">
              {currentStep < journeySteps.length ? (
                <Button onClick={handleNextStep} className="bg-primary hover:bg-primary/90">
                  <Clock className="mr-2 h-4 w-4" />
                  পরবর্তী ধাপ
                </Button>
              ) : (
                <Button onClick={handleCompleteJourney} className="bg-green-600 hover:bg-green-700">
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  যাত্রা সম্পন্ন
                </Button>
              )}
            </div>
          )}
        </div>

        <DialogFooter>
          {!journeyStarted ? (
            <>
              <Button variant="outline" onClick={onClose}>
                পরে করবো
              </Button>
              <Button onClick={handleStartJourney} className="bg-primary hover:bg-primary/90">
                <Truck className="mr-2 h-4 w-4" />
                যাত্রা শুরু করুন
              </Button>
            </>
          ) : (
            <Button variant="outline" onClick={onClose}>
              বন্ধ করুন
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
