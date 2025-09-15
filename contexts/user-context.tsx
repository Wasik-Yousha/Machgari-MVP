"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

export type UserRole = "জেলে" | "আড়তদার" | "মৎস্য অধিদপ্তর" | null

interface UserContextType {
  userRole: UserRole
  setUserRole: (role: UserRole) => void
  logout: () => void
  isLoaded: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userRole, setUserRoleState] = useState<UserRole>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load user role from localStorage on mount
  useEffect(() => {
    const loadUserRole = () => {
      try {
        if (typeof window !== 'undefined') {
          const storedRole = window.localStorage.getItem('userRole') as UserRole
          console.log('Loading stored role:', storedRole)
          if (storedRole && (storedRole === "জেলে" || storedRole === "আড়তদার" || storedRole === "মৎস্য অধিদপ্তর")) {
            setUserRoleState(storedRole)
            console.log('User role loaded:', storedRole)
          }
        }
      } catch (error) {
        console.log('Error loading user role from localStorage:', error)
      } finally {
        setIsLoaded(true)
      }
    }

    loadUserRole()
  }, [])

  const setUserRole = (role: UserRole) => {
    console.log('Setting user role:', role)
    setUserRoleState(role)
    try {
      if (typeof window !== 'undefined') {
        if (role) {
          window.localStorage.setItem('userRole', role)
          console.log('Role saved to localStorage:', role)
        } else {
          window.localStorage.removeItem('userRole')
          console.log('Role removed from localStorage')
        }
      }
    } catch (error) {
      console.log('Error saving user role to localStorage:', error)
    }
  }

  const logout = () => {
    console.log('Logging out user')
    setUserRoleState(null)
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('userRole')
      }
    } catch (error) {
      console.log('Error removing user role from localStorage:', error)
    }
  }

  return (
    <UserContext.Provider value={{ userRole, setUserRole, logout, isLoaded }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
