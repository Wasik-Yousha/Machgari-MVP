"use client"

import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Card } from './ui/card'

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
      <div className="fixed bottom-4 right-4 z-50">
        <Button variant="outline" size="sm" onClick={() => setVisible(true)}>
          Debug Storage
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 max-h-[80vh] overflow-auto">
      <Card className="p-4 shadow-lg bg-white dark:bg-gray-800">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">LocalStorage Debug</h3>
          <div className="space-x-2">
            <Button variant="outline" size="sm" onClick={refreshStorageData}>
              Refresh
            </Button>
            <Button variant="destructive" size="sm" onClick={resetAllData}>
              Reset Data
            </Button>
            <Button variant="outline" size="sm" onClick={() => setVisible(false)}>
              Close
            </Button>
          </div>
        </div>
        
        <div className="mb-2 text-xs text-gray-500">
          Last updated: {lastUpdated}
        </div>
        
        <div className="space-y-2 mb-4">
          <Button variant="outline" size="sm" onClick={forceDispatchStorageEvent} className="w-full">
            Force Update All Components
          </Button>
        </div>
        
        <div className="space-y-4">
          {Object.keys(storageData).length === 0 ? (
            <p className="text-sm text-gray-500">No localStorage data found</p>
          ) : (
            Object.entries(storageData).map(([key, value]) => (
              <div key={key} className="border-b pb-2">
                <div className="font-medium">{key}</div>
                <div className="text-sm text-gray-500 overflow-hidden">
                  {typeof value === 'object' && value !== null
                    ? JSON.stringify(value)
                    : String(value)}
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  )
}
