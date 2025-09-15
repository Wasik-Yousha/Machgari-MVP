"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { useSwipeable } from "react-swipeable"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  {
    id: 1,
    image: "/images/fish1.jpg",
    title: "তাজা মাছ সরাসরি আপনার দোরগোড়ায়",
    description: "আমাদের প্রিমিয়াম ডেলিভারি সার্ভিসের মাধ্যমে সেরা মানের মাছ পান",
  },
  {
    id: 2,
    image: "/images/fish2.jpg",
    title: "সরাসরি জেলেদের কাছ থেকে কিনুন",
    description: "মধ্যস্থতাকারী ছাড়াই সেরা দামে মাছ কিনুন",
  },
  {
    id: 3,
    image: "/images/fish3.jpg",
    title: "ডিজিটাল মাছ বাজার",
    description: "আধুনিক প্রযুক্তির মাধ্যমে মাছ কেনাবেচা করুন",
  },
]

export function ImageSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Auto-rotate slides
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        nextSlide()
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isPaused, nextSlide])

  // Swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: () => nextSlide(),
    onSwipedRight: () => prevSlide(),
    trackMouse: true,
  })

  return (
    <div
      className="relative h-[350px] md:h-[600px] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      {...handlers}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <Image
            src={slide.image || "/placeholder.svg"}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white p-4">
            <h2 className="text-4xl md:text-6xl font-bold text-center mb-4 md:mb-8">{slide.title}</h2>
            <p className="text-xl md:text-3xl text-center mb-8 md:mb-10 max-w-4xl">{slide.description}</p>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-2xl py-7 px-10">
              এখন কিনুন
            </Button>
          </div>
        </div>
      ))}

      {/* Navigation arrows - make them bigger */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-8 w-8" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="h-8 w-8" />
      </button>

      {/* Dots indicator - make them bigger */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 rounded-full transition-all ${
              index === currentSlide ? "bg-white scale-125" : "bg-white bg-opacity-50 hover:bg-opacity-75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
