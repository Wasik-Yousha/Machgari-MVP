"use client"

import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Bug, X, RefreshCw, Trash2, Zap } from 'lucide-react'

export function LocalStorageDebugger() {
  const [storageData, setStorageData] = useState<Record<string, any>>({})
  const [visible, setVisible] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<string>('Never')

  const refreshStorageData = () => {
    if (typeof window !== 'undefined') {
      const data: Record<string, any> = {}
      try {
        // Get all localStorage keys and content
        const fishEntriesRaw = localStorage.getItem('fishEntries')
        const transactionsRaw = localStorage.getItem('transactions')
        const farmingProfileRaw = localStorage.getItem('farmingProfile')
        const basePricesRaw = localStorage.getItem('basePrices')
        const wholesalePricesRaw = localStorage.getItem('wholesalePrices')
        const userRoleRaw = localStorage.getItem('userRole')
        
        // Log raw data sizes for debugging
        console.log('===== LOCALSTORAGE RAW DATA SIZES =====')
        console.log('fishEntries:', fishEntriesRaw ? `${fishEntriesRaw.length} chars` : 'Missing')
        console.log('transactions:', transactionsRaw ? `${transactionsRaw.length} chars` : 'Missing')
        console.log('farmingProfile:', farmingProfileRaw ? `${farmingProfileRaw.length} chars` : 'Missing')
        console.log('basePrices:', basePricesRaw ? `${basePricesRaw.length} chars` : 'Missing')
        console.log('wholesalePrices:', wholesalePricesRaw ? `${wholesalePricesRaw.length} chars` : 'Missing')
        console.log('userRole:', userRoleRaw ? `${userRoleRaw.length} chars` : 'Missing')
        console.log('================================')
        
        // Parse JSON data
        try {
          data.fishEntries = fishEntriesRaw 
            ? { items: JSON.parse(fishEntriesRaw).length, size: fishEntriesRaw.length }
            : 'Missing'
        } catch (e) {
          data.fishEntries = `Error: ${e instanceof Error ? e.message : String(e)}`
        }
        
        try {
          data.transactions = transactionsRaw
            ? { items: JSON.parse(transactionsRaw).length, size: transactionsRaw.length }
            : 'Missing'
        } catch (e) {
          data.transactions = `Error: ${e instanceof Error ? e.message : String(e)}`
        }
        
        try {
          data.farmingProfile = farmingProfileRaw
            ? { size: farmingProfileRaw.length }
            : 'Missing'
        } catch (e) {
          data.farmingProfile = `Error: ${e instanceof Error ? e.message : String(e)}`
        }
        
        try {
          data.basePrices = basePricesRaw
            ? { items: Object.keys(JSON.parse(basePricesRaw)).length, size: basePricesRaw.length }
            : 'Missing'
        } catch (e) {
          data.basePrices = `Error: ${e instanceof Error ? e.message : String(e)}`
        }
        
        try {
          data.wholesalePrices = wholesalePricesRaw
            ? { items: Object.keys(JSON.parse(wholesalePricesRaw)).length, size: wholesalePricesRaw.length }
            : 'Missing'
        } catch (e) {
          data.wholesalePrices = `Error: ${e instanceof Error ? e.message : String(e)}`
        }
        
        data.userRole = userRoleRaw || 'Missing'
        
        // Include total usage
        let totalSize = 0;
        for (const key of Object.keys(localStorage)) {
          totalSize += (localStorage.getItem(key) || '').length;
        }
        data.totalStorageUsed = `${Math.round(totalSize / 1024)} KB`;
      } catch (error) {
        console.error('Error parsing localStorage data:', error)
        data.error = String(error)
      }
      
      setStorageData(data)
      setLastUpdated(new Date().toLocaleTimeString())
    }
  }
  
  const resetAllData = () => {
    if (typeof window !== 'undefined') {
      try {
        // Store the user role temporarily
        const userRole = localStorage.getItem('userRole')
        
        // Clear all data
        localStorage.removeItem('fishEntries')
        localStorage.removeItem('transactions')
        localStorage.removeItem('farmingProfile')
        localStorage.removeItem('basePrices')
        localStorage.removeItem('wholesalePrices')
        
        // Restore user role if it existed
        if (userRole) {
          localStorage.setItem('userRole', userRole)
        }
        
        console.log('All localStorage data reset (except userRole)')
        refreshStorageData()
        
        // Force reload to reinitialize with sample data
        window.location.reload()
      } catch (error) {
        console.error('Error resetting localStorage:', error)
      }
    }
  }
  
  const forceDispatchStorageEvent = () => {
    // This function forces other components to recognize storage changes
    if (typeof window !== 'undefined') {
      try {
        // Create and dispatch a storage event to notify other parts of the app
        window.dispatchEvent(new Event('storage'))
        console.log('Storage event dispatched manually')
        refreshStorageData()
      } catch (error) {
        console.error('Error dispatching storage event:', error)
      }
    }
  }

  useEffect(() => {
    const checkInterval = setInterval(() => {
      if (visible) {
        refreshStorageData()
      }
    }, 3000) // Refresh every 3 seconds while visible
    
    return () => clearInterval(checkInterval)
  }, [visible])

  useEffect(() => {
    if (visible) {
      refreshStorageData()
    }
    
    // Listen for storage changes
    const handleStorageChange = () => {
      console.log('Local storage changed')
      if (visible) {
        refreshStorageData()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [visible])

  if (!visible) {
    return (
      <div className="fixed top-4 right-4 z-[9999]">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setVisible(true)}
          className="bg-gradient-to-r from-primary to-secondary text-white border-none hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm"
        >
          <Bug className="h-4 w-4 mr-2" />
          Debug
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed top-4 right-4 z-[9999] w-96 max-h-[85vh] overflow-hidden">
      <Card className="shadow-2xl bg-white dark:bg-gray-800 border-2 border-primary/20 dark:border-primary/30 rounded-xl overflow-hidden">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Bug className="h-5 w-5" />
              <h3 className="text-lg font-bold">Storage Debug</h3>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setVisible(false)}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-xs text-white/80 mt-1">
            Last updated: {lastUpdated}
          </div>
        </div>
        
        {/* Content area with scroll */}
        <div className="p-4 max-h-[calc(85vh-140px)] overflow-y-auto">
          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={refreshStorageData}
              className="border-secondary text-secondary hover:bg-secondary hover:text-white transition-colors"
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Refresh
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={resetAllData}
              className="border-destructive text-destructive hover:bg-destructive hover:text-white transition-colors"
            >
              <Trash2 className="h-3 w-3 mr-1" />
              Reset
            </Button>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={forceDispatchStorageEvent} 
            className="w-full mb-4 border-primary text-primary hover:bg-primary hover:text-white transition-colors"
          >
            <Zap className="h-3 w-3 mr-1" />
            Force Update Components
          </Button>
          
          {/* Data display */}
          <div className="space-y-3">
            {Object.keys(storageData).length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">No localStorage data found</p>
            ) : (
              Object.entries(storageData).map(([key, value]) => (
                <div key={key} className="border-l-4 border-primary/30 bg-gray-50 dark:bg-gray-900/50 p-3 rounded-r-lg">
                  <div className="font-semibold text-sm text-gray-800 dark:text-gray-200 mb-1">{key}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 overflow-hidden break-words">
                    {typeof value === 'object' && value !== null
                      ? JSON.stringify(value, null, 2)
                      : String(value)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
