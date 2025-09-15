"use client"

import { useState } from 'react'
import { Button } from './ui/button'

export function ResetLocalStorageButton() {
  const [isResetting, setIsResetting] = useState(false)

  const handleReset = () => {
    setIsResetting(true)
    
    try {
      if (typeof window !== 'undefined') {
        // Clear all app data from localStorage
        localStorage.removeItem('fishEntries')
        localStorage.removeItem('transactions')
        localStorage.removeItem('farmingProfile')
        localStorage.removeItem('basePrices')
        localStorage.removeItem('wholesalePrices')
        
        console.log('All localStorage data cleared')
        
        // Force reload to reinitialize with sample data
        window.location.reload()
      }
    } catch (error) {
      console.error('Error resetting localStorage:', error)
      setIsResetting(false)
    }
  }

  return (
    <Button 
      onClick={handleReset}
      disabled={isResetting}
      variant="destructive" 
      size="sm"
      className="fixed right-4 top-20 z-50"
    >
      {isResetting ? 'Resetting...' : 'Reset Test Data'}
    </Button>
  )
}
