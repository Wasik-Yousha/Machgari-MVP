"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { useUser } from "@/contexts/user-context"
import { useFarmingProfile } from "@/contexts/farming-profile-context"
import { Send, Bot, User, Sparkles, X } from "lucide-react"

interface ChatMessage {
  id: string
  type: 'user' | 'bot' | 'system'
  content: string
  timestamp: Date
  isSuper?: boolean
}

export function EnhancedChatSimple({ onClose }: { onClose: () => void }) {
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
        <div className="sticky top-0 z-10 flex items-center justify-between p-3 border-b bg-white dark:bg-gray-900">
          <div className="flex items-center gap-2">
            {canUseSuperChat ? (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-green-500 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <Bot className="h-4 w-4 text-white" />
              </div>
            )}
            <span className="font-bold text-lg">
              {canUseSuperChat ? 'মাছগাড়ি AI' : 'মাছগাড়ি AI'}
            </span>
            {canUseSuperChat && (
              <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0">
                <Sparkles className="h-3 w-3 mr-1" />
                সুপার
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

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
          
          <div className="sticky bottom-0 p-3 border-t bg-white dark:bg-gray-900">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="প্রশ্ন করুন..."
                disabled={isLoading}
                className="flex-1 rounded-xl"
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={isLoading || !inputMessage.trim()}
                className={`rounded-xl px-4 ${
                  canUseSuperChat 
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600' 
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
                }`}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
