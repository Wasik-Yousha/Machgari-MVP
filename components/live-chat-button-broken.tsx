"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, X, Sparkles, Move } from "lucide-react"
import { EnhancedChatComponent } from "@/components/enhanced-chat"
import { EnhancedChatSimple } from "@/components/enhanced-chat-simple"
import { useUser } from "@/contexts/user-context"
import { useIsMobile } from "@/hooks/use-mobile"

export function LiveChatButton() {
  const [isOpen, setIsOpen] = useState(false)
  const { userRole } = useUser()
  const isMobile = useIsMobile()
  
  const isJele = userRole === 'জেলে'
  
  // Handle escape key to close chat
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }
    
    window.addEventListener('keydown', handleEsc)
    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [])
  
  // Handle body scroll lock when full screen chat is open on mobile
  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isMobile, isOpen])
  
  // On mobile, show full screen chat
  if (isMobile && isOpen) {
    return (
      <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900 flex flex-col">
        <EnhancedChatSimple onClose={() => setIsOpen(false)} />
      </div>
    )
  }
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && !isMobile ? (
        <div className="bg-white dark:bg-card rounded-2xl shadow-2xl min-w-[320px] min-h-[400px] w-[380px] h-[600px] flex flex-col overflow-hidden border-2 dark:border-border resize">
          <div className={`${isJele ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-blue-500 to-blue-600'} p-3 text-white flex justify-between items-center cursor-move`}>
            <div className="flex items-center gap-2">
              {isJele && <Sparkles className="h-5 w-5 animate-pulse" />}
              <h3 className="font-bold">
                {isJele ? 'মাছগাড়ি AI' : 'মাছগাড়ি AI'}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <Move className="h-4 w-4 text-white/70" />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 text-white hover:bg-white/20 rounded-full"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="flex-grow overflow-hidden">
            <EnhancedChatComponent />
          </div>
        </div>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          className={`rounded-full h-14 w-14 shadow-2xl transition-all duration-300 hover:scale-110 ${
            isJele 
              ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700' 
              : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
          } text-white border-2 border-white dark:border-gray-800`}
        >
          <div className="relative">
            <MessageCircle className="h-6 w-6" />
            {isJele && (
              <Sparkles className="h-3 w-3 absolute -top-1 -right-1 animate-pulse text-yellow-300" />
            )}
          </div>
        </Button>
      )}
    </div>
  )
}
