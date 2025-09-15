"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { useUser } from "@/contexts/user-context"
import { useFarmingProfile } from "@/contexts/farming-profile-context"
import { Send, Bot, User, Sparkles, AlertCircle, TrendingUp, Fish, Lightbulb } from "lucide-react"

interface ChatMessage {
  id: string
  type: 'user' | 'bot' | 'system'
  content: string
  timestamp: Date
  isSuper?: boolean
}

export function EnhancedChatComponent() {
  const { userRole } = useUser()
  const { farmingProfile, getFarmingRecommendations, getFarmingAnalysis } = useFarmingProfile()
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'system',
      content: userRole === 'জেলে' && farmingProfile 
        ? 'স্বাগতম! আপনার প্রশ্ন করুন।'
        : 'স্বাগতম! প্রশ্ন করুন।',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const isJeleWithProfile = userRole === 'জেলে' && farmingProfile
  const canUseSuperChat = isJeleWithProfile

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  // Super chat analysis and recommendations
  const generateSuperChatResponse = (userInput: string): string => {
    const analysis = getFarmingAnalysis()
    const recommendations = getFarmingRecommendations()
    const lowerInput = userInput.toLowerCase()

    if (!analysis || !farmingProfile) {
      return "দুঃখিত, আপনার মাছ চাষের তথ্য সম্পূর্ণ নয়। প্রোফাইল মেনু থেকে আপনার পুকুর, খাদ্য, পোনা, সার ও ওষুধের তথ্য যোগ করুন।"
    }

    // Specific queries based on user input
    if (lowerInput.includes('খরচ') || lowerInput.includes('বাজেট') || lowerInput.includes('দাম')) {
      return `💰 **খরচ বিশ্লেষণ:**\n\n` +
             `• মাসিক খাদ্য খরচ: ${analysis.totalMonthlyFoodCost.toFixed(0)} ৳\n` +
             `• সার খরচ: ${analysis.totalMonthlyFertilizerCost.toFixed(0)} ৳\n` +
             `• একর প্রতি খাদ্য খরচ: ${analysis.foodCostPerDecimal.toFixed(0)} ৳\n\n` +
             `💡 **খরচ কমানোর উপায়:**\n` +
             `${recommendations.filter(r => r.includes('খরচ')).join('\n')}\n\n` +
             `📊 **সুপারিশ:** প্রাকৃতিক খাদ্য ৭০% এবং কৃত্রিম খাদ্য ৩০% অনুপাতে ব্যবহার করুন।`
    }

    if (lowerInput.includes('উৎপাদন') || lowerInput.includes('ফলন') || lowerInput.includes('বৃদ্ধি')) {
      return `🐟 **উৎপাদন বিশ্লেষণ:**\n\n` +
             `• লক্ষ্য উৎপাদন: ${farmingProfile.targetProduction} কেজি/মাস\n` +
             `• একর প্রতি লক্ষ্য: ${analysis.targetProductionPerDecimal.toFixed(0)} কেজি\n` +
             `• আপনার পুকুরের মোট আয়তন: ${analysis.totalPondSize.toFixed(2)} একর\n\n` +
             `🚀 **উৎপাদন বাড়ানোর উপায়:**\n` +
             `• পানিতে অক্সিজেনের মাত্রা ঠিক রাখুন\n` +
             `• নিয়মিত পানির pH পরীক্ষা করুন (৬.৫-৮.৫)\n` +
             `• মাছের ঘনত্ব সঠিক রাখুন (১০০০-১৫০০ টি/একর)\n` +
             `• প্রোবায়োটিক ব্যবহার করুন`
    }

    if (lowerInput.includes('খাদ্য') || lowerInput.includes('খাবার') || lowerInput.includes('ফিড')) {
      const naturalFoods = farmingProfile.fishFoods.filter(f => f.type === 'প্রাকৃতিক').length
      const artificialFoods = farmingProfile.fishFoods.filter(f => f.type === 'কৃত্রিম').length
      
      return `🍽️ **খাদ্য বিশ্লেষণ:**\n\n` +
             `• প্রাকৃতিক খাদ্য: ${naturalFoods} ধরনের\n` +
             `• কৃত্রিম খাদ্য: ${artificialFoods} ধরনের\n` +
             `• মাসিক খাদ্য খরচ: ${analysis.totalMonthlyFoodCost.toFixed(0)} ৳\n\n` +
             `📋 **খাদ্য তালিকা সুপারিশ:**\n` +
             `• চালের কুঁড়া: ৩০%\n` +
             `• ফিশমিল: ২৫%\n` +
             `• সরিষার খৈল: ২০%\n` +
             `• গমের ভুসি: ১৫%\n` +
             `• ভিটামিন ও মিনারেল: ১০%\n\n` +
             `⚠️ **সতর্কতা:** অতিরিক্ত খাদ্য দিবেন না, পানি দূষিত হবে।`
    }

    if (lowerInput.includes('রোগ') || lowerInput.includes('ওষুধ') || lowerInput.includes('চিকিৎসা')) {
      const regularMedicines = farmingProfile.medicines.filter(m => m.usage === 'নিয়মিত').length
      
      return `🏥 **স্বাস্থ্য ব্যবস্থাপনা:**\n\n` +
             `• নিয়মিত ওষুধ: ${regularMedicines} ধরনের\n` +
             `• মোট ওষুধ ধরন: ${farmingProfile.medicines.length}\n\n` +
             `🛡️ **রোগ প্রতিরোধ:**\n` +
             `• প্রোবায়োটিক নিয়মিত ব্যবহার করুন\n` +
             `• পানির গুণগত মান ঠিক রাখুন\n` +
             `• মাছের ঘনত্ব বেশি রাখবেন না\n` +
             `• অতিরিক্ত ওষুধ ব্যবহার এড়িয়ে চলুন\n\n` +
             `💊 **জরুরি ওষুধ তালিকা:**\n` +
             `• ভিটামিন সি (রোগ প্রতিরোধী)\n` +
             `• প্রোবায়োটিক (হজমশক্তি বৃদ্ধি)\n` +
             `• অক্সিজেন ট্যাবলেট (জরুরি অবস্থায়)`
    }

    if (lowerInput.includes('সার') || lowerInput.includes('সার') || lowerInput.includes('প্রাকৃতিক')) {
      const organicFertilizers = farmingProfile.fertilizers.filter(f => f.type === 'জৈব').length
      
      return `🌱 **সার ব্যবস্থাপনা:**\n\n` +
             `• জৈব সার: ${organicFertilizers} ধরনের\n` +
             `• মাসিক সার খরচ: ${analysis.totalMonthlyFertilizerCost.toFixed(0)} ৳\n\n` +
             `🍃 **প্রাকৃতিক সার সুপারিশ:**\n` +
             `• গোবর: ৫০০ কেজি/একর (প্রাথমিক)\n` +
             `• মুরগির বিষ্ঠা: ২০০ কেজি/একর\n` +
             `• কম্পোস্ট: ৩০০ কেজি/একর\n` +
             `• নিম খৈল: ১০০ কেজি/একর\n\n` +
             `📅 **প্রয়োগ সময়সূচি:**\n` +
             `• পুকুর প্রস্তুতির সময়: প্রাথমিক সার\n` +
             `• মাসিক: পরিপূরক সার`
    }

    // General comprehensive response
    return `🌟 **আপনার মাছ চাষ বিশ্লেষণ:**\n\n` +
           `📊 **সামগ্রিক অবস্থা:**\n` +
           `• মোট পুকুর: ${farmingProfile.totalPonds} টি (${analysis.totalPondSize.toFixed(2)} একর)\n` +
           `• অভিজ্ঞতা: ${farmingProfile.experience} বছর\n` +
           `• লক্ষ্য উৎপাদন: ${farmingProfile.targetProduction} কেজি/মাস\n\n` +
           `💡 **প্রধান সুপারিশসমূহ:**\n` +
           `${recommendations.slice(0, 3).map(r => '• ' + r).join('\n')}\n\n` +
           `🎯 **পরবর্তী পদক্ষেপ:**\n` +
           `• নিয়মিত পানির গুণগত মান পরীক্ষা করুন\n` +
           `• মাছের বৃদ্ধি পর্যবেক্ষণ করুন\n` +
           `• বাজারের দাম অনুসরণ করুন`
  }

  // General chat responses for non-Jeles or those without profile
  const generateGeneralResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase()

    if (lowerInput.includes('দাম') || lowerInput.includes('বাজার')) {
      return "🐟 বর্তমান মাছের বাজার দর:\n• রুই: ২৮০-৩২০ ৳/কেজি\n• কাতলা: ৩০০-৩৫০ ৳/কেজি\n• মৃগেল: ২৫০-২৮০ ৳/কেজি\n• ইলিশ: ১২০০-১৮০০ ৳/কেজি\n\nবাজারের দাম অঞ্চল ও মৌসুম ভেদে পরিবর্তিত হয়।"
    }

    if (lowerInput.includes('চাষ') || lowerInput.includes('পুকুর')) {
      return "🏞️ মাছ চাষের প্রাথমিক তথ্য:\n• পুকুরের গভীরতা ৬-৮ ফুট রাখুন\n• প্রতি একরে ১০০০-১৫০০ পোনা দিন\n• নিয়মিত খাদ্য দিন (দৈহিক ওজনের ৩-৫%)\n• পানির pH ৬.৫-৮.৫ রাখুন\n• অক্সিজেনের মাত্রা ৫ ppm এর বেশি রাখুন"
    }

    if (lowerInput.includes('পোনা') || lowerInput.includes('বীজ')) {
      return "🐠 পোনা মাছ সম্পর্কে:\n• সরকারি হ্যাচারি থেকে পোনা কিনুন\n• সুস্থ ও সতেজ পোনা নির্বাচন করুন\n• পোনা ছাড়ার আগে পানির তাপমাত্রা মিলিয়ে নিন\n• প্রতি একরে রুই-কাতলা-মৃগেল ৪:৩:৩ অনুপাতে দিন"
    }

    if (lowerInput.includes('খাদ্য') || lowerInput.includes('খাবার')) {
      return "🍽️ মাছের খাদ্য:\n• প্রাকৃতিক খাদ্য: চালের কুঁড়া, সরিষার খৈল\n• সম্পূরক খাদ্য: ফিশ ফিড (৩০-৩৫% প্রোটিন)\n• দিনে ২-৩ বার খাদ্য দিন\n• অতিরিক্ত খাদ্য এড়িয়ে চলুন\n• মাছের আকার অনুযায়ী খাদ্যের পরিমাণ বাড়ান"
    }

    if (lowerInput.includes('সেবা') || lowerInput.includes('service')) {
      return "🏢 মাছগাড়ি সেবাসমূহ:\n• মাছ পরিবহন সেবা\n• বাজার তথ্য ও দাম\n• জেলে ও আড়তদারের মধ্যে সংযোগ\n• সরকারি পরিষেবার তথ্য\n• মাছ চাষের পরামর্শ\n\nলগইন করুন আরও বিশেষ সেবার জন্য।"
    }

    return "ধন্যবাদ আপনার প্রশ্নের জন্য। আমি মাছ চাষ, বাজার দর, পরিবহন এবং সাধারণ তথ্য দিতে পারি। আরও নির্দিষ্ট পরামর্শের জন্য 'জেলে' হিসেবে লগইন করুন এবং আপনার চাষের তথ্য যোগ করুন।"
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    // Remove system messages when user starts chatting
    setMessages(prev => {
      // Filter out system messages and keep only user/bot messages
      const filteredMessages = prev.filter(msg => msg.type !== 'system')
      return [...filteredMessages, userMessage]
    })
    
    setInputMessage('')
    setIsLoading(true)

    // Simulate processing time
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: canUseSuperChat 
          ? generateSuperChatResponse(inputMessage)
          : generateGeneralResponse(inputMessage),
        timestamp: new Date(),
        isSuper: !!canUseSuperChat
      }

      setMessages(prev => [...prev, botResponse])
      setIsLoading(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="h-full flex flex-col">
      <Card className="flex-1 flex flex-col h-full border-0 shadow-none">
        <CardHeader className={`pb-3 border-b ${
          canUseSuperChat 
            ? 'bg-gradient-to-r from-purple-50 via-blue-50 to-green-50 dark:from-purple-950 dark:via-blue-950 dark:to-green-950' 
            : 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950'
        }`}>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {canUseSuperChat ? (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-green-500 flex items-center justify-center animate-pulse">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
              )}
              <div>
                <div className="font-bold text-lg">
                  {canUseSuperChat ? 'মাছগাড়ি AI এক্সপার্ট' : 'মাছগাড়ি AI সহায়ক'}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {canUseSuperChat ? 'আপনার ব্যক্তিগত মাছ চাষ পরামর্শদাতা' : 'সাধারণ তথ্য ও পরামর্শ'}
                </div>
              </div>
            </div>
            {canUseSuperChat && (
              <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0">
                <Sparkles className="h-3 w-3 mr-1" />
                সুপার চ্যাট
              </Badge>
            )}
          </CardTitle>
          
          {userRole === 'জেলে' && !farmingProfile && (
            <div className="mt-2 p-2 bg-orange-50 dark:bg-orange-950/30 rounded-lg border border-orange-200 dark:border-orange-800">
              <div className="text-sm text-orange-700 dark:text-orange-400 flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                সুপার চ্যাট ব্যবহারের জন্য প্রোফাইল মেনুতে চাষের তথ্য যোগ করুন
              </div>
            </div>
          )}
          
          {!userRole && (
            <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="text-sm text-blue-700 dark:text-blue-400 flex items-center gap-2">
                <User className="h-4 w-4" />
                জেলে হিসেবে লগইন করুন ব্যক্তিগত পরামর্শের জন্য
              </div>
            </div>
          )}
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${
                    message.type === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-sm ${
                    message.type === 'user' 
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
                      : message.type === 'system'
                      ? 'bg-gradient-to-br from-gray-400 to-gray-500'
                      : message.isSuper
                      ? 'bg-gradient-to-br from-purple-500 via-blue-500 to-green-500'
                      : 'bg-gradient-to-br from-green-500 to-green-600'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="h-5 w-5 text-white" />
                    ) : message.isSuper ? (
                      <Sparkles className="h-5 w-5 text-white" />
                    ) : (
                      <Bot className="h-5 w-5 text-white" />
                    )}
                  </div>
                  
                  <div className={`flex-1 max-w-[85%] ${
                    message.type === 'user' ? 'text-right' : ''
                  }`}>
                    <div className={`rounded-2xl p-4 shadow-sm ${
                      message.type === 'user'
                        ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white ml-auto'
                        : message.type === 'system'
                        ? 'bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 text-gray-700 dark:text-gray-300 border'
                        : message.isSuper
                        ? 'bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 dark:from-purple-950 dark:via-blue-950 dark:to-green-950 border-2 border-purple-200 dark:border-purple-700'
                        : 'bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border'
                    }`}>
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">
                        {message.content}
                      </div>
                      {message.isSuper && (
                        <div className="mt-3 pt-3 border-t border-purple-200 dark:border-purple-700">
                          <div className="text-xs text-purple-600 dark:text-purple-400 flex items-center gap-1 font-medium">
                            <TrendingUp className="h-3 w-3" />
                            আপনার চাষের ডেটা বিশ্লেষণের ভিত্তিতে AI পরামর্শ
                          </div>
                        </div>
                      )}
                    </div>
                    <div className={`text-xs text-gray-500 mt-2 ${message.type === 'user' ? 'text-right' : ''}`}>
                      {message.timestamp.toLocaleTimeString('bn-BD', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-sm">
                    <Bot className="h-5 w-5 text-white animate-pulse" />
                  </div>
                  <div className="bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-4 border">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          
          <div className="p-4 border-t bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
            <div className="flex gap-3">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={canUseSuperChat 
                  ? "আপনার মাছ চাষের যেকোনো প্রশ্ন করুন... (খাদ্য, রোগ, দাম, পুকুর)" 
                  : "মাছ চাষ বা বাজার সম্পর্কে প্রশ্ন করুন..."
                }
                disabled={isLoading}
                className="flex-1 rounded-xl border-2 focus:border-blue-500 transition-colors"
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={isLoading || !inputMessage.trim()}
                className={`rounded-xl px-6 transition-all ${
                  canUseSuperChat 
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600' 
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
                }`}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            {canUseSuperChat && (
              <div className="text-xs text-purple-600 dark:text-purple-400 mt-3 flex items-center gap-2 p-2 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-200 dark:border-purple-800">
                <Fish className="h-4 w-4 animate-bounce" />
                <span className="font-medium">সুপার এআই সক্রিয় - আপনার চাষের ডেটা বিশ্লেষণ করে ব্যক্তিগত পরামর্শ দিচ্ছে</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
