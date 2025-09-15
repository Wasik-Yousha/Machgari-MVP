"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface SelectProps {
  value?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
}

interface SelectTriggerProps {
  className?: string
  children: React.ReactNode
}

interface SelectContentProps {
  className?: string
  children: React.ReactNode
}

interface SelectItemProps {
  value: string
  children: React.ReactNode
}

interface SelectValueProps {
  placeholder?: string
}

const Select = ({ value, onValueChange, children }: SelectProps) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedValue, setSelectedValue] = React.useState(value || "")

  const handleValueChange = (newValue: string) => {
    setSelectedValue(newValue)
    onValueChange?.(newValue)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <SelectContext.Provider value={{ 
        isOpen, 
        setIsOpen, 
        selectedValue, 
        handleValueChange 
      }}>
        {children}
      </SelectContext.Provider>
    </div>
  )
}

const SelectContext = React.createContext<{
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  selectedValue: string
  handleValueChange: (value: string) => void
} | null>(null)

const useSelectContext = () => {
  const context = React.useContext(SelectContext)
  if (!context) {
    throw new Error("useSelectContext must be used within a Select")
  }
  return context
}

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const { isOpen, setIsOpen } = useSelectContext()
    
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        onClick={() => setIsOpen(!isOpen)}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>
    )
  }
)
SelectTrigger.displayName = "SelectTrigger"

const SelectValue = ({ placeholder }: SelectValueProps) => {
  const { selectedValue } = useSelectContext()
  return <span>{selectedValue || placeholder}</span>
}

const SelectContent = ({ className, children }: SelectContentProps) => {
  const { isOpen } = useSelectContext()
  
  if (!isOpen) return null
  
  return (
    <div className={cn(
      "absolute top-full left-0 z-50 w-full mt-1 max-h-60 overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md",
      className
    )}>
      {children}
    </div>
  )
}

const SelectItem = ({ value, children }: SelectItemProps) => {
  const { handleValueChange, selectedValue } = useSelectContext()
  
  return (
    <div
      className={cn(
        "relative flex cursor-pointer select-none items-center py-2 px-3 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
        selectedValue === value && "bg-accent text-accent-foreground"
      )}
      onClick={() => handleValueChange(value)}
    >
      {children}
    </div>
  )
}

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue }
