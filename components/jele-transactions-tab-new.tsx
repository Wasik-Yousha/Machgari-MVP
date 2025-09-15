"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useTransactions, Transaction, TransactionStatus } from "@/contexts/transactions-context"
import { useFishData } from "@/contexts/fish-data-context"
import { JourneyStartModal } from "@/components/journey-start-modal"
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  MessageCircle, 
  Send, 
  DollarSign,
  ArrowRightLeft, 
  ThumbsUp, 
  ThumbsDown,
  ShoppingCart,
  Truck
} from "lucide-react"

// Helper function to get status badge
function getStatusBadge(status: TransactionStatus) {
  switch (status) {
    case "pending":
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">অপেক্ষমান</Badge>
    case "counterOffer":
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">পাল্টা প্রস্তাব</Badge>
    case "accepted":
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">গৃহীত</Badge>
    case "completed":
      return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">সম্পন্ন</Badge>
    case "rejected":
      return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">প্রত্যাখ্যাত</Badge>
    default:
      return <Badge variant="outline">অজানা</Badge>
  }
}

export function JeleTransactionsTab() {
  const { transactions, acceptOffer, rejectOffer, makeCounterOffer, completeTransaction } = useTransactions()
  const { fishEntries } = useFishData()
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [counterOfferPrice, setCounterOfferPrice] = useState<number>(0)
  const [chatMessage, setChatMessage] = useState("")
  const [showJourneyModal, setShowJourneyModal] = useState(false)
  const [journeyTransaction, setJourneyTransaction] = useState<Transaction | null>(null)

  // Hardcoded for demo - in a real app, would get this from user context
  const jeleId = "আব্দুল করিম"
  
  // Filter transactions for this Jele
  const jeleTransactions = transactions.filter(t => t.jeleName === jeleId)

  // Handle selecting a transaction
  const handleSelectTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setCounterOfferPrice(transaction.currentOffer)
  }

  // Get fish details for a transaction
  const getFishDetails = (fishId: number) => {
    return fishEntries.find(f => f.id === fishId)
  }

  // Format number as Bengali currency
  const formatCurrency = (amount: number) => {
    return `৳${amount.toLocaleString('bn-BD')}`
  }

  // Handle counter offer submission
  const handleCounterOffer = () => {
    if (!selectedTransaction) return
    makeCounterOffer(selectedTransaction.id, counterOfferPrice, "jele")
  }

  // Handle chat message submission
  const handleSendMessage = () => {
    if (!selectedTransaction || !chatMessage.trim()) return
    // Add chat message logic here
    setChatMessage("")
  }

  // Handle journey start
  const handleStartJourney = (transaction: Transaction) => {
    setJourneyTransaction(transaction)
    setShowJourneyModal(true)
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>লেনদেন তালিকা</CardTitle>
            </CardHeader>
            <CardContent>
              {jeleTransactions.length > 0 ? (
                <ScrollArea className="h-[500px]">
                  <div className="space-y-3">
                    {jeleTransactions.map(transaction => (
                      <Card 
                        key={transaction.id} 
                        className={`cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors ${
                          selectedTransaction?.id === transaction.id ? 'border-primary' : ''
                        }`}
                        onClick={() => handleSelectTransaction(transaction)}
                      >
                        <CardContent className="p-3">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold">{transaction.fishName}</h3>
                            {getStatusBadge(transaction.status)}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            <p>আড়তদার: {transaction.arotdarName}</p>
                            <p>পরিমাণ: {transaction.quantity}</p>
                            <p>বর্তমান প্রস্তাব: {formatCurrency(transaction.currentOffer)}</p>
                            <p className="text-xs mt-1">তারিখ: {transaction.date}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <ShoppingCart className="mx-auto h-12 w-12 opacity-30 mb-2" />
                  <p>কোন লেনদেন নেই</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          {selectedTransaction ? (
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle>লেনদেন বিবরণ</CardTitle>
                  {getStatusBadge(selectedTransaction.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">মাছের নাম</p>
                    <p className="font-medium">{selectedTransaction.fishName}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">পরিমাণ</p>
                    <p className="font-medium">{selectedTransaction.quantity}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">গুণমান</p>
                    <p className="font-medium">{selectedTransaction.quality}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">আড়তদার</p>
                    <p className="font-medium">{selectedTransaction.arotdarName}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">প্রাথমিক প্রস্তাব</p>
                    <p className="font-medium">{formatCurrency(selectedTransaction.initialPrice)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">বর্তমান প্রস্তাব</p>
                    <p className="font-medium">{formatCurrency(selectedTransaction.currentOffer)}</p>
                  </div>
                </div>

                <Separator />

                {/* Transaction actions based on status */}
                {selectedTransaction.status === "pending" && selectedTransaction.currentOfferedBy === "jele" && (
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">আড়তদারের প্রতিক্রিয়ার জন্য অপেক্ষা করুন</p>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-yellow-600 mr-2" />
                      <span className="text-sm">আপনার প্রস্তাব পাঠানো হয়েছে</span>
                    </div>
                  </div>
                )}

                {selectedTransaction.status === "counterOffer" && selectedTransaction.currentOfferedBy === "arotdar" && (
                  <div className="space-y-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                      <p className="text-sm text-blue-700 dark:text-blue-300 font-medium mb-2">আড়তদার পাল্টা প্রস্তাব দিয়েছেন</p>
                      <p className="text-lg font-semibold">{formatCurrency(selectedTransaction.currentOffer)}</p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button 
                        className="flex-1 bg-green-600 hover:bg-green-700" 
                        onClick={() => acceptOffer(selectedTransaction.id, "jele")}
                      >
                        <ThumbsUp className="mr-2 h-4 w-4" />
                        প্রস্তাব গ্রহণ করুন
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1 text-red-600 border-red-200 hover:bg-red-50" 
                        onClick={() => rejectOffer(selectedTransaction.id, "jele")}
                      >
                        <ThumbsDown className="mr-2 h-4 w-4" />
                        প্রত্যাখ্যান করুন
                      </Button>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">পাল্টা প্রস্তাব দিন</label>
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          value={counterOfferPrice}
                          onChange={(e) => setCounterOfferPrice(Number(e.target.value))}
                          placeholder="আপনার প্রস্তাবিত মূল্য"
                        />
                        <Button onClick={handleCounterOffer}>
                          <ArrowRightLeft className="mr-2 h-4 w-4" />
                          প্রস্তাব দিন
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTransaction.status === "accepted" && (
                  <div className="space-y-4">
                    <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                      <p className="text-sm text-green-700 dark:text-green-300 font-medium mb-2">চুক্তি সম্পন্ন হয়েছে!</p>
                      <p className="text-lg font-semibold">চূড়ান্ত মূল্য: {formatCurrency(selectedTransaction.finalPrice || selectedTransaction.currentOffer)}</p>
                    </div>
                    
                    <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={() => completeTransaction(selectedTransaction.id)}>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      লেনদেন সম্পন্ন করুন
                    </Button>
                  </div>
                )}

                {selectedTransaction.status === "completed" && (
                  <div className="space-y-4">
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                      <p className="text-sm text-purple-700 dark:text-purple-300 font-medium mb-2">চুক্তি সম্পন্ন হয়েছে!</p>
                      <p className="text-lg font-semibold">চূড়ান্ত মূল্য: {formatCurrency(selectedTransaction.finalPrice || selectedTransaction.currentOffer)}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Button 
                        className="bg-purple-600 hover:bg-purple-700" 
                        onClick={() => completeTransaction(selectedTransaction.id)}
                      >
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        লেনদেন সম্পন্ন করুন
                      </Button>
                      <Button 
                        variant="outline"
                        className="border-green-200 text-green-700 hover:bg-green-50"
                        onClick={() => handleStartJourney(selectedTransaction)}
                      >
                        <Truck className="mr-2 h-4 w-4" />
                        পরিবহন শুরু করুন
                      </Button>
                    </div>
                  </div>
                )}

                {selectedTransaction.status === "rejected" && (
                  <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                    <div className="flex items-start">
                      <XCircle className="h-5 w-5 text-red-600 mt-0.5 mr-2" />
                      <div>
                        <p className="text-sm text-red-700 dark:text-red-300 font-medium">লেনদেন প্রত্যাখ্যাত হয়েছে</p>
                        <p className="text-xs text-gray-500 mt-1">এই লেনদেনটি প্রত্যাখ্যাত হয়েছে। অন্য আড়তদারের সাথে চেষ্টা করুন।</p>
                      </div>
                    </div>
                  </div>
                )}

                <Separator />

                {/* Messages section */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium flex items-center">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    বার্তাসমূহ
                  </h3>
                  
                  <ScrollArea className="h-[200px] border rounded-md p-2">
                    <div className="space-y-3">
                      {selectedTransaction.messages.map((msg, index) => (
                        <div 
                          key={index} 
                          className={`flex ${msg.sender === 'jele' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`
                              max-w-[80%] rounded-lg p-2 text-sm
                              ${msg.sender === 'jele' 
                                ? 'bg-primary text-primary-foreground' 
                                : msg.sender === 'arotdar'
                                  ? 'bg-gray-100 dark:bg-gray-800'
                                  : 'bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400 text-xs italic'
                              }
                            `}
                          >
                            <p>{msg.message}</p>
                            <p className="text-xs opacity-70 mt-1 text-right">{msg.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  
                  {selectedTransaction.status !== "completed" && selectedTransaction.status !== "rejected" && (
                    <div className="flex gap-2">
                      <Input
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        placeholder="আপনার বার্তা লিখুন..."
                      />
                      <Button variant="outline" onClick={handleSendMessage}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center text-center p-8">
              <div className="max-w-md">
                <DollarSign className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">লেনদেন বিবরণ দেখুন</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  বাম দিক থেকে একটি লেনদেন নির্বাচন করুন দেখতে এবং ব্যবস্থাপনা করতে। 
                  আপনি মাছ বিক্রয় প্রস্তাব করতে, দর-কষাকষি করতে এবং লেনদেন সম্পূর্ণ করতে পারবেন।
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Journey Start Modal */}
      <JourneyStartModal
        isOpen={showJourneyModal}
        onClose={() => setShowJourneyModal(false)}
        transaction={journeyTransaction ? {
          id: journeyTransaction.id,
          fishName: journeyTransaction.fishName,
          quantity: journeyTransaction.quantity,
          finalPrice: journeyTransaction.finalPrice || journeyTransaction.currentOffer,
          arotdarName: journeyTransaction.arotdarName,
          arotdarLocation: "কাওরান বাজার, ঢাকা", // This would come from arotdar data
          arotdarPhone: "০১৭১২৩৪৫৬৭৮" // This would come from arotdar data
        } : null}
      />
    </>
  )
}
