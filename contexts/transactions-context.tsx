"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useFishData } from './fish-data-context'

// Transaction statuses
export type TransactionStatus = 
  | "pending" // Initial state when Jele offers to sell
  | "counterOffer" // Arotdar made a counter offer
  | "accepted" // Either side accepted the other's offer
  | "completed" // Transaction is finalized
  | "rejected" // Either side rejected the transaction

export interface Transaction {
  id: number
  fishId: number
  fishName: string
  quantity: string
  quality: "প্রিমিয়াম" | "সাধারণ" | "মাঝারি"
  jeleId: string
  jeleName: string
  arotdarId: string
  arotdarName: string
  initialPrice: number
  finalPrice: number
  currentOffer: number
  currentOfferedBy: "jele" | "arotdar"
  status: TransactionStatus
  date: string
  messages: {
    sender: "jele" | "arotdar" | "system"
    message: string
    timestamp: string
  }[]
}

interface TransactionsContextType {
  transactions: Transaction[]
  addTransaction: (transaction: Omit<Transaction, 'id' | 'status' | 'messages' | 'date'>) => void
  updateTransaction: (transactionId: number, updates: Partial<Transaction>) => void
  getTransactionsByJele: (jeleId: string) => Transaction[]
  getTransactionsByArotdar: (arotdarId: string) => Transaction[]
  acceptOffer: (transactionId: number, role: "jele" | "arotdar") => void
  rejectOffer: (transactionId: number, role: "jele" | "arotdar") => void
  makeCounterOffer: (transactionId: number, newPrice: number, role: "jele" | "arotdar") => void
  completeTransaction: (transactionId: number) => void
  removeFishFromInventory: (fishId: number) => void
}

const TransactionsContext = createContext<TransactionsContextType | undefined>(undefined)

// Sample transactions for testing
const sampleTransactions: Transaction[] = [
  // Completed transactions
  {
    id: 1,
    fishId: 12,
    fishName: "রুই",
    quantity: "৮ কেজি",
    quality: "সাধারণ",
    jeleId: "jele-01",
    jeleName: "আব্দুল করিম",
    arotdarId: "arotdar-01",
    arotdarName: "ঢাকা পূর্ব আড়ত",
    initialPrice: 320,
    finalPrice: 340,
    currentOffer: 340,
    currentOfferedBy: "arotdar",
    status: "completed",
    date: "১২/০৯/২০২৫",
    messages: [
      {
        sender: "jele",
        message: "আমি এই মাছ বিক্রয় করতে চাই।",
        timestamp: "১২/০৯/২০২৫ ০৯:১৫"
      },
      {
        sender: "arotdar",
        message: "আমি ৩৪০ টাকা/কেজি দিতে পারি।",
        timestamp: "১২/০৯/২০২৫ ০৯:৩০"
      },
      {
        sender: "jele",
        message: "আমি রাজি আছি।",
        timestamp: "১২/০৯/২০২৫ ০৯:৪৫"
      },
      {
        sender: "system",
        message: "লেনদেন সম্পন্ন হয়েছে।",
        timestamp: "১২/০৯/২০২৫ ১০:০০"
      }
    ]
  },
  {
    id: 2,
    fishId: 13,
    fishName: "ইলিশ",
    quantity: "১০ কেজি",
    quality: "প্রিমিয়াম",
    jeleId: "jele-02",
    jeleName: "রহিম আলী",
    arotdarId: "arotdar-02",
    arotdarName: "চট্টগ্রাম আড়ত",
    initialPrice: 1200,
    finalPrice: 1250,
    currentOffer: 1250,
    currentOfferedBy: "arotdar",
    status: "completed",
    date: "১২/০৯/২০২৫",
    messages: [
      {
        sender: "jele",
        message: "প্রিমিয়াম ইলিশ বিক্রয় করব।",
        timestamp: "১২/০৯/২০২৫ ১০:১৫"
      },
      {
        sender: "arotdar",
        message: "আমরা ১২৫০ টাকা/কেজি দিতে পারি।",
        timestamp: "১২/০৯/২০২৫ ১০:৩০"
      },
      {
        sender: "jele",
        message: "ধন্যবাদ, রাজি আছি।",
        timestamp: "১২/০৯/২০২৫ ১০:৪৫"
      },
      {
        sender: "system",
        message: "লেনদেন সম্পন্ন হয়েছে।",
        timestamp: "১২/০৯/২০২৫ ১১:০০"
      }
    ]
  },
  
  // Pending transactions
  {
    id: 3,
    fishId: 1,
    fishName: "রুই",
    quantity: "১০ কেজি",
    quality: "প্রিমিয়াম",
    jeleId: "jele-01",
    jeleName: "আব্দুল করিম",
    arotdarId: "arotdar-01",
    arotdarName: "ঢাকা পূর্ব আড়ত",
    initialPrice: 370,
    finalPrice: 0,
    currentOffer: 370,
    currentOfferedBy: "jele",
    status: "pending",
    date: "১৫/০৯/২০২৫",
    messages: [
      {
        sender: "jele",
        message: "আমি এই প্রিমিয়াম রুই মাছ বিক্রয় করতে চাই।",
        timestamp: "১৫/০৯/২০২৫ ০৮:০০"
      },
      {
        sender: "system",
        message: "আড়তদারের উত্তরের অপেক্ষায়...",
        timestamp: "১৫/০৯/২০২৫ ০৮:০১"
      }
    ]
  },
  
  // Counter offer
  {
    id: 4,
    fishId: 2,
    fishName: "কাতলা",
    quantity: "১৫ কেজি",
    quality: "সাধারণ",
    jeleId: "jele-01",
    jeleName: "আব্দুল করিম",
    arotdarId: "arotdar-03",
    arotdarName: "কুমিল্লা আড়ত",
    initialPrice: 360,
    finalPrice: 0,
    currentOffer: 350,
    currentOfferedBy: "arotdar",
    status: "counterOffer",
    date: "১৫/০৯/২০২৫",
    messages: [
      {
        sender: "jele",
        message: "এই কাতলা মাছ বিক্রয় করতে চাই, প্রতি কেজি ৩৬০ টাকা।",
        timestamp: "১৫/০৯/২০২৫ ০৯:০০"
      },
      {
        sender: "arotdar",
        message: "আমরা ৩৫০ টাকা/কেজি দিতে পারি।",
        timestamp: "১৫/০৯/২০২৫ ০৯:৩০"
      }
    ]
  },
  
  // Accepted but not completed
  {
    id: 5,
    fishId: 3,
    fishName: "ইলিশ",
    quantity: "৫ কেজি",
    quality: "প্রিমিয়াম",
    jeleId: "jele-01",
    jeleName: "আব্দুল করিম",
    arotdarId: "arotdar-02",
    arotdarName: "চট্টগ্রাম আড়ত",
    initialPrice: 1150,
    finalPrice: 1180,
    currentOffer: 1180,
    currentOfferedBy: "arotdar",
    status: "accepted",
    date: "১৫/০৯/২০২৫",
    messages: [
      {
        sender: "jele",
        message: "আমি এই ইলিশ মাছ বিক্রয় করতে চাই, প্রতি কেজি ১১৫০ টাকা।",
        timestamp: "১৫/০৯/২০২৫ ১০:০০"
      },
      {
        sender: "arotdar",
        message: "আমরা ১১৮০ টাকা/কেজি দিতে রাজি আছি।",
        timestamp: "১৫/০৯/২০২৫ ১০:৩০"
      },
      {
        sender: "jele",
        message: "ধন্যবাদ, রাজি আছি।",
        timestamp: "১৫/০৯/২০২৫ ১০:৪৫"
      },
      {
        sender: "system",
        message: "অফার গৃহীত হয়েছে। পরিবহন প্রক্রিয়া শুরু করুন।",
        timestamp: "১৫/০৯/২০২৫ ১০:৪৬"
      }
    ]
  },
  
  // Rejected
  {
    id: 6,
    fishId: 9,
    fishName: "মাগুর",
    quantity: "৬ কেজি",
    quality: "সাধারণ",
    jeleId: "jele-04",
    jeleName: "সালাম মিয়া",
    arotdarId: "arotdar-04",
    arotdarName: "সিলেট আড়ত",
    initialPrice: 520,
    finalPrice: 0,
    currentOffer: 480,
    currentOfferedBy: "arotdar",
    status: "rejected",
    date: "১৪/০৯/২০২৫",
    messages: [
      {
        sender: "jele",
        message: "আমি এই মাগুর মাছ বিক্রয় করতে চাই, প্রতি কেজি ৫২০ টাকা।",
        timestamp: "১৪/০৯/২০২৫ ১৪:০০"
      },
      {
        sender: "arotdar",
        message: "আমরা ৪৮০ টাকা/কেজি দিতে পারি।",
        timestamp: "১৪/০৯/২০২৫ ১৪:৩০"
      },
      {
        sender: "jele",
        message: "দুঃখিত, এই দামে বিক্রয় করতে পারব না।",
        timestamp: "১৪/০৯/২০২৫ ১৪:৪৫"
      },
      {
        sender: "system",
        message: "লেনদেন বাতিল হয়েছে।",
        timestamp: "১৪/০৯/২০২৫ ১৪:৪৬"
      }
    ]
  }
];

export function TransactionsProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load transactions from localStorage on mount
  useEffect(() => {
    const loadTransactions = () => {
      try {
        if (typeof window !== 'undefined') {
          const storedTransactions = window.localStorage.getItem('transactions')
          console.log('[TransactionsContext] Loading transactions from localStorage:', storedTransactions ? 'Found data' : 'No data found')
          
          if (storedTransactions) {
            try {
              const parsedData = JSON.parse(storedTransactions)
              // Check if parsed data is valid and has items
              if (Array.isArray(parsedData) && parsedData.length > 0) {
                console.log('[TransactionsContext] Successfully loaded', parsedData.length, 'transactions')
                setTransactions(parsedData)
              } else {
                console.log('[TransactionsContext] Stored transactions are empty or invalid, using sample data')
                setTransactions(sampleTransactions)
              }
            } catch (parseError) {
              console.error('[TransactionsContext] Error parsing transactions JSON:', parseError)
              setTransactions(sampleTransactions)
            }
          } else {
            // Use sample transactions if no data in localStorage
            console.log('[TransactionsContext] Using sample transactions data')
            setTransactions(sampleTransactions)
          }
        }
      } catch (error) {
        console.error('[TransactionsContext] Error loading transactions from localStorage:', error)
        // Fall back to sample transactions
        console.log('[TransactionsContext] Error occurred, falling back to sample transactions')
        setTransactions(sampleTransactions)
      } finally {
        setIsLoaded(true)
      }
    }

    loadTransactions()
  }, [])

  // Save transactions to localStorage whenever it changes, with throttling
  const [lastSaved, setLastSaved] = useState<number | null>(null)
  
  useEffect(() => {
    if (isLoaded) {
      // Throttle save operations to once per second
      const now = Date.now();
      if (lastSaved === null || now - lastSaved > 1000) {
        try {
          if (typeof window !== 'undefined') {
            // Only save if we have valid data
            if (Array.isArray(transactions) && transactions.length > 0) {
              console.log('[TransactionsContext] Saving transactions to localStorage:', transactions.length, 'transactions')
              const jsonData = JSON.stringify(transactions)
              
              // Ensure the data we're saving is not empty
              if (jsonData !== '[]' && jsonData !== '{}' && jsonData !== 'null') {
                window.localStorage.setItem('transactions', jsonData)
                setLastSaved(now);
                console.log('[TransactionsContext] Transactions saved successfully. Data size:', jsonData.length, 'characters')
              } else {
                console.error('[TransactionsContext] Prevented saving empty data to localStorage')
              }
            } else {
              console.warn('[TransactionsContext] Not saving transactions - invalid or empty array')
            }
          }
        } catch (error) {
          console.error('[TransactionsContext] Error saving transactions to localStorage:', error)
        }
      } else {
        console.log('[TransactionsContext] Skipping save due to throttling, last saved', Date.now() - (lastSaved || 0), 'ms ago')
      }
    }
  }, [transactions, isLoaded, lastSaved])

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'status' | 'messages' | 'date'>) => {
    const newId = Math.max(...transactions.map(t => t.id), 0) + 1
    const now = new Date()
    
    const newTransaction: Transaction = {
      ...transaction,
      id: newId,
      status: 'pending',
      messages: [
        {
          sender: 'system',
          message: 'বিক্রয় প্রস্তাব করা হয়েছে।',
          timestamp: now.toLocaleString('bn-BD')
        }
      ],
      date: now.toLocaleDateString('bn-BD'),
    }

    setTransactions(prev => [...prev, newTransaction])
  }

  const updateTransaction = (transactionId: number, updates: Partial<Transaction>) => {
    setTransactions(prev => 
      prev.map(transaction => 
        transaction.id === transactionId ? { ...transaction, ...updates } : transaction
      )
    )
  }

  const getTransactionsByJele = (jeleId: string) => {
    return transactions.filter(transaction => transaction.jeleId === jeleId)
  }

  const getTransactionsByArotdar = (arotdarId: string) => {
    return transactions.filter(transaction => transaction.arotdarId === arotdarId)
  }

  const addMessageToTransaction = (transactionId: number, sender: "jele" | "arotdar" | "system", message: string) => {
    const now = new Date()
    updateTransaction(transactionId, {
      messages: [
        ...transactions.find(t => t.id === transactionId)?.messages || [],
        {
          sender,
          message,
          timestamp: now.toLocaleString('bn-BD')
        }
      ]
    })
  }

  const acceptOffer = (transactionId: number, role: "jele" | "arotdar") => {
    const transaction = transactions.find(t => t.id === transactionId)
    if (!transaction) return

    // If the current offer was made by the other party, we can accept it
    if (
      (role === "jele" && transaction.currentOfferedBy === "arotdar") ||
      (role === "arotdar" && transaction.currentOfferedBy === "jele")
    ) {
      updateTransaction(transactionId, {
        status: 'accepted',
        finalPrice: transaction.currentOffer
      })

      addMessageToTransaction(
        transactionId,
        role,
        `${role === "jele" ? "জেলে" : "আড়তদার"} দাম গ্রহণ করেছেন: ৳${transaction.currentOffer}`
      )
    }
  }

  const rejectOffer = (transactionId: number, role: "jele" | "arotdar") => {
    updateTransaction(transactionId, {
      status: 'rejected'
    })

    addMessageToTransaction(
      transactionId,
      role,
      `${role === "jele" ? "জেলে" : "আড়তদার"} প্রস্তাব প্রত্যাখ্যান করেছেন।`
    )
  }

  const makeCounterOffer = (transactionId: number, newPrice: number, role: "jele" | "arotdar") => {
    updateTransaction(transactionId, {
      status: 'counterOffer',
      currentOffer: newPrice,
      currentOfferedBy: role
    })

    addMessageToTransaction(
      transactionId,
      role,
      `${role === "jele" ? "জেলে" : "আড়তদার"} নতুন দাম প্রস্তাব করেছেন: ৳${newPrice}`
    )
  }

  const completeTransaction = (transactionId: number) => {
    const transaction = transactions.find(t => t.id === transactionId)
    if (!transaction || transaction.status !== 'accepted') return

    updateTransaction(transactionId, {
      status: 'completed'
    })

    addMessageToTransaction(
      transactionId,
      'system',
      `লেনদেন সম্পন্ন হয়েছে। চূড়ান্ত মূল্য: ৳${transaction.finalPrice}`
    )

    // Mark the fish as sold by removing it from inventory
    removeFishFromInventory(transaction.fishId)
  }

  const removeFishFromInventory = (fishId: number) => {
    // This function will be called when a transaction is completed
    // We'll update the fish entry to mark it as sold
    // Note: In a real implementation, we'd use a callback or event system
    console.log(`Fish ${fishId} sold and removed from inventory`)
  }

  return (
    <TransactionsContext.Provider value={{
      transactions,
      addTransaction,
      updateTransaction,
      getTransactionsByJele,
      getTransactionsByArotdar,
      acceptOffer,
      rejectOffer,
      makeCounterOffer,
      completeTransaction,
      removeFishFromInventory
    }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext)
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionsProvider')
  }
  return context
}
