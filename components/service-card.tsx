"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface ServiceCardProps {
  service: {
    id: number
    title: string
    description: string
    icon: LucideIcon
    color: string
    bgColor: string
    iconColor: string
  }
}

export function ServiceCard({ service }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = service.icon

  return (
    <Card
      className={`
        group cursor-pointer transition-all duration-300 ease-in-out transform
        hover:scale-105 hover:shadow-2xl hover:-translate-y-2
        border-0 shadow-lg overflow-hidden
        ${isHovered ? "shadow-2xl" : "shadow-lg"}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        // For now, just log the service click
        console.log(`Clicked on service: ${service.title}`)
      }}
    >
      <CardContent className="p-0 relative overflow-hidden">
        {/* Background Gradient */}
        <div
          className={`
          absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 
          group-hover:opacity-10 transition-opacity duration-300
        `}
        ></div>

        {/* Content */}
        <div className="relative p-6">
          {/* Icon Section */}
          <div
            className={`
            ${service.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-4
            group-hover:scale-110 transition-transform duration-300
          `}
          >
            <Icon className={`h-8 w-8 ${service.iconColor} group-hover:scale-110 transition-transform duration-300`} />
          </div>

          {/* Title */}
          <h3
            className={`
            text-xl font-bold mb-3 text-gray-800 dark:text-gray-100
            group-hover:text-primary transition-colors duration-300
          `}
          >
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{service.description}</p>

          {/* Hover Effect Arrow */}
          <div
            className={`
            mt-4 flex items-center text-primary font-medium text-sm
            transform transition-all duration-300
            ${isHovered ? "translate-x-2 opacity-100" : "translate-x-0 opacity-0"}
          `}
          >
            <span>আরও জানুন</span>
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Decorative Elements */}
        <div
          className={`
          absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br ${service.color} 
          rounded-full opacity-5 group-hover:opacity-10 transition-opacity duration-300
        `}
        ></div>
        <div
          className={`
          absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-tr ${service.color} 
          rounded-full opacity-5 group-hover:opacity-10 transition-opacity duration-300
        `}
        ></div>

        {/* Shine Effect */}
        <div
          className={`
          absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
          transform -skew-x-12 -translate-x-full
          group-hover:translate-x-full transition-transform duration-700 ease-in-out
        `}
        ></div>
      </CardContent>
    </Card>
  )
}
