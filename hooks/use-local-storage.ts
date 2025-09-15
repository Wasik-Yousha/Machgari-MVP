"use client"

import { useState, useEffect } from 'react'

// A more robust hook for localStorage that handles errors and SSR
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options?: {
    throttle?: number; // milliseconds to throttle save operations
    validate?: (value: any) => boolean; // function to validate loaded data
    serialize?: (value: T) => string; // custom serialization
    deserialize?: (value: string) => T; // custom deserialization
  }
) {
  const [storedValue, setStoredValue] = useState<T>(initialValue)
  const [isLoaded, setIsLoaded] = useState(false)
  const [lastSaved, setLastSaved] = useState<number | null>(null)

  // Load from localStorage
  useEffect(() => {
    try {
      if (typeof window === 'undefined') return

      const item = window.localStorage.getItem(key)
      console.log(`[useLocalStorage] Loading ${key} from localStorage:`, item ? 'Found data' : 'No data found')

      if (item) {
        try {
          // Use custom deserializer or default JSON.parse
          const deserializer = options?.deserialize || JSON.parse
          const parsedItem = deserializer(item)
          
          // Validate parsed data if validation function provided
          const isValid = options?.validate ? options.validate(parsedItem) : true
          
          if (isValid) {
            console.log(`[useLocalStorage] Successfully loaded ${key}`)
            setStoredValue(parsedItem)
          } else {
            console.log(`[useLocalStorage] ${key} validation failed, using initial value`)
            setStoredValue(initialValue)
          }
        } catch (error) {
          console.error(`[useLocalStorage] Error parsing ${key}:`, error)
          setStoredValue(initialValue)
        }
      } else {
        console.log(`[useLocalStorage] No ${key} found, using initial value`)
        setStoredValue(initialValue)
      }
    } catch (error) {
      console.error(`[useLocalStorage] Error loading ${key}:`, error)
      setStoredValue(initialValue)
    } finally {
      setIsLoaded(true)
    }
  }, [key, initialValue, options])

  // Save to localStorage with throttling
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Handle function updates
      const valueToStore = value instanceof Function ? value(storedValue) : value
      
      // Update React state
      setStoredValue(valueToStore)
      
      // Skip localStorage on SSR
      if (typeof window === 'undefined') return
      
      // Throttle save operations
      const throttleDuration = options?.throttle || 1000
      const now = Date.now()
      
      if (lastSaved === null || now - lastSaved > throttleDuration) {
        try {
          // Use custom serializer or default JSON.stringify
          const serializer = options?.serialize || JSON.stringify
          const serialized = serializer(valueToStore)
          
          // Only save non-empty data
          if (serialized !== '[]' && serialized !== '{}' && serialized !== 'null') {
            window.localStorage.setItem(key, serialized)
            setLastSaved(now)
            console.log(`[useLocalStorage] ${key} saved successfully. Size:`, serialized.length, 'chars')
            
            // Dispatch storage event to notify other components
            window.dispatchEvent(new Event('storage'))
          } else {
            console.error(`[useLocalStorage] Prevented saving empty ${key} to localStorage`)
          }
        } catch (saveError) {
          console.error(`[useLocalStorage] Error saving ${key}:`, saveError)
        }
      }
    } catch (error) {
      console.error(`[useLocalStorage] Error in setValue for ${key}:`, error)
    }
  }

  return [storedValue, setValue, isLoaded] as const
}
