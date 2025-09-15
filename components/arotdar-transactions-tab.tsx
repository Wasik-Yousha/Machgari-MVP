"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTransactions, Transaction, TransactionStatus } from "@/contexts/transactions-context"
import { useFishData } from "@/contexts/fish-data-context"
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
  AlertCircle,
  TrendingUp
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

export function ArotdarTransactionsTab() {
  const { transactions, acceptOffer, rejectOffer, makeCounterOffer, completeTransaction } = useTransactions()
  const { fishEntries, getBasePrice } = useFishData()
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [counterOfferPrice, setCounterOfferPrice] = useState<number>(0)
  const [chatMessage, setChatMessage] = useState("")

  // Use proper ID format that matches our transaction data
  const arotdarId = "arotdar-01" // Using one of the IDs from our sample transactions
  const arotdarName = "ঢাকা পূর্ব আড়ত"
  
  // Filter transactions for this Arotdar
  const arotdarTransactions = transactions.filter(t => t.arotdarId === arotdarId)
  
  // Separate transactions by status
  const pendingTransactions = arotdarTransactions.filter(t => t.status === "pending" || t.status === "counterOffer")
  const completedTransactions = arotdarTransactions.filter(t => t.status === "accepted" || t.status === "completed")
  const rejectedTransactions = arotdarTransactions.filter(t => t.status === "rejected")

  // Handle selecting a transaction
  const handleSelectTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    
    // Calculate suggested counter offer based on base price and quality
    const basePrice = getBasePrice(transaction.fishName)
    const qualityMultipliers: Record<string, number> = {
      "প্রিমিয়াম": 1.15,
      "সাধারণ": 1.0,
      "মাঝারি": 0.85,
    }
    const qualityMultiplier = qualityMultipliers[transaction.quality] || 1.0
    const suggestedPrice = Math.round(basePrice * qualityMultiplier * 0.95) // Slightly lower than estimated
    
    setCounterOfferPrice(suggestedPrice)
  }

  // Format number as Bengali currency
  const formatCurrency = (amount: number) => {
    return `৳${amount.toLocaleString('bn-BD')}`
  }

  // Handle counter offer submission
  const handleCounterOffer = () => {
    if (!selectedTransaction) return
    makeCounterOffer(selectedTransaction.id, counterOfferPrice, "arotdar")
  }

  // Handle chat message submission
  const handleSendMessage = () => {
    if (!selectedTransaction || !chatMessage.trim()) return
    // Add chat message logic here
    setChatMessage("")
  }

  // Calculate profit margin
  const calculateProfitMargin = (fishName: string, quality: string, offerPrice: number) => {
    const basePrice = getBasePrice(fishName)
    const qualityMultipliers: Record<string, number> = {
      "প্রিমিয়াম": 1.15,
      "সাধারণ": 1.0,
      "মাঝারি": 0.85,
    }
    const qualityMultiplier = qualityMultipliers[quality] || 1.0
    const marketPrice = basePrice * qualityMultiplier
    const profitMargin = ((marketPrice - offerPrice) / offerPrice) * 100
    return Math.round(profitMargin * 10) / 10
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending" className="relative">
            অপেক্ষমান প্রস্তাব
            {pendingTransactions.length > 0 && (
              <Badge className="ml-2 bg-red-500 text-white text-xs px-1.5 py-0.5">
                {pendingTransactions.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="completed">সম্পন্ন লেনদেন</TabsTrigger>
          <TabsTrigger value="rejected">প্রত্যাখ্যাত</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-yellow-600" />
                    নতুন প্রস্তাব
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {pendingTransactions.length > 0 ? (
                    <ScrollArea className="h-[500px]">
                      <div className="space-y-3">
                        {pendingTransactions.map(transaction => (
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
                                <p>জেলে: {transaction.jeleName}</p>
                                <p>পরিমাণ: {transaction.quantity}</p>
                                <p>প্রস্তাবিত মূল্য: {formatCurrency(transaction.currentOffer)}</p>
                                <div className="flex items-center mt-1">
                                  <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                                  <span className="text-xs text-green-600">
                                    লাভ: {calculateProfitMargin(transaction.fishName, transaction.quality, transaction.currentOffer)}%
                                  </span>
                                </div>
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
                      <p>কোন নতুন প্রস্তাব নেই</p>
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
                      <CardTitle>প্রস্তাব বিবরণ</CardTitle>
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
                        <p className="text-sm text-gray-500">জেলে</p>
                        <p className="font-medium">{selectedTransaction.jeleName}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500">সরকারি বেস মূল্য</p>
                        <p className="font-medium">{formatCurrency(getBasePrice(selectedTransaction.fishName))}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500">জেলের প্রস্তাব</p>
                        <p className="font-medium text-lg">{formatCurrency(selectedTransaction.currentOffer)}</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                      <p className="text-sm font-medium mb-1">লাভ বিশ্লেষণ</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        প্রত্যাশিত লাভ: {calculateProfitMargin(selectedTransaction.fishName, selectedTransaction.quality, selectedTransaction.currentOffer)}%
                      </p>
                    </div>

                    <Separator />

                    {/* Transaction actions based on status */}
                    {selectedTransaction.status === "pending" && selectedTransaction.currentOfferedBy === "jele" && (
                      <div className="space-y-4">
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                          <p className="text-sm text-blue-700 dark:text-blue-300 font-medium mb-2">জেলে থেকে নতুন প্রস্তাব</p>
                          <p className="text-lg font-semibold">{formatCurrency(selectedTransaction.currentOffer)}</p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button 
                            className="flex-1 bg-green-600 hover:bg-green-700" 
                            onClick={() => acceptOffer(selectedTransaction.id, "arotdar")}
                          >
                            <ThumbsUp className="mr-2 h-4 w-4" />
                            প্রস্তাব গ্রহণ করুন
                          </Button>
                          <Button 
                            variant="outline" 
                            className="flex-1 text-red-600 border-red-200 hover:bg-red-50" 
                            onClick={() => rejectOffer(selectedTransaction.id, "arotdar")}
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
                              পাল্টা প্রস্তাব
                            </Button>
                          </div>
                          <p className="text-xs text-gray-500">
                            প্রত্যাশিত লাভ: {calculateProfitMargin(selectedTransaction.fishName, selectedTransaction.quality, counterOfferPrice)}%
                          </p>
                        </div>
                      </div>
                    )}

                    {selectedTransaction.status === "counterOffer" && selectedTransaction.currentOfferedBy === "jele" && (
                      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                        <div className="flex items-start">
                          <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-2" />
                          <div>
                            <p className="text-sm text-yellow-700 dark:text-yellow-300 font-medium">জেলে নতুন পাল্টা প্রস্তাব দিয়েছেন</p>
                            <p className="text-lg font-semibold mt-1">{formatCurrency(selectedTransaction.currentOffer)}</p>
                            <div className="flex gap-2 mt-3">
                              <Button 
                                size="sm"
                                className="bg-green-600 hover:bg-green-700" 
                                onClick={() => acceptOffer(selectedTransaction.id, "arotdar")}
                              >
                                গ্রহণ করুন
                              </Button>
                              <Button 
                                size="sm"
                                variant="outline" 
                                className="text-red-600" 
                                onClick={() => rejectOffer(selectedTransaction.id, "arotdar")}
                              >
                                প্রত্যাখ্যান
                              </Button>
                            </div>
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
                          পণ্য গ্রহণ ও পেমেন্ট সম্পন্ন
                        </Button>
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
                              className={`flex ${msg.sender === 'arotdar' ? 'justify-end' : 'justify-start'}`}
                            >
                              <div 
                                className={`
                                  max-w-[80%] rounded-lg p-2 text-sm
                                  ${msg.sender === 'arotdar' 
                                    ? 'bg-primary text-primary-foreground' 
                                    : msg.sender === 'jele'
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
                    <h3 className="text-xl font-semibold mb-2">প্রস্তাব বিবরণ দেখুন</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      বাম দিক থেকে একটি প্রস্তাব নির্বাচন করুন বিস্তারিত দেখতে এবং সিদ্ধান্ত নিতে। 
                      আপনি প্রস্তাব গ্রহণ, প্রত্যাখ্যান বা পাল্টা প্রস্তাব দিতে পারবেন।
                    </p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle2 className="h-5 w-5 mr-2 text-green-600" />
                সম্পন্ন লেনদেন
              </CardTitle>
            </CardHeader>
            <CardContent>
              {completedTransactions.length > 0 ? (
                <div className="space-y-3">
                  {completedTransactions.map(transaction => (
                    <Card key={transaction.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-semibold">{transaction.fishName}</h3>
                            <p className="text-sm text-gray-500">জেলে: {transaction.jeleName}</p>
                            <p className="text-sm text-gray-500">পরিমাণ: {transaction.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-lg">{formatCurrency(transaction.finalPrice || transaction.currentOffer)}</p>
                            <p className="text-sm text-gray-500">{transaction.date}</p>
                            {getStatusBadge(transaction.status)}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <CheckCircle2 className="mx-auto h-12 w-12 opacity-30 mb-2" />
                  <p>এখনো কোন লেনদেন সম্পন্ন হয়নি</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rejected" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <XCircle className="h-5 w-5 mr-2 text-red-600" />
                প্রত্যাখ্যাত প্রস্তাব
              </CardTitle>
            </CardHeader>
            <CardContent>
              {rejectedTransactions.length > 0 ? (
                <div className="space-y-3">
                  {rejectedTransactions.map(transaction => (
                    <Card key={transaction.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-semibold">{transaction.fishName}</h3>
                            <p className="text-sm text-gray-500">জেলে: {transaction.jeleName}</p>
                            <p className="text-sm text-gray-500">পরিমাণ: {transaction.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-lg">{formatCurrency(transaction.currentOffer)}</p>
                            <p className="text-sm text-gray-500">{transaction.date}</p>
                            {getStatusBadge(transaction.status)}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <XCircle className="mx-auto h-12 w-12 opacity-30 mb-2" />
                  <p>কোন প্রত্যাখ্যাত প্রস্তাব নেই</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
