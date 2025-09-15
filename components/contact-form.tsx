"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateForm = () => {
    let valid = true
    const newErrors = {
      name: "",
      email: "",
      message: "",
    }

    if (!formData.name.trim()) {
      newErrors.name = "নাম আবশ্যক"
      valid = false
    }

    if (!formData.email.trim()) {
      newErrors.email = "ইমেইল আবশ্যক"
      valid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "সঠিক ইমেইল দিন"
      valid = false
    }

    if (!formData.message.trim()) {
      newErrors.message = "বার্তা আবশ্যক"
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)

      // Simulate form submission
      setTimeout(() => {
        setIsSubmitting(false)
        setIsSubmitted(true)
        setFormData({
          name: "",
          email: "",
          message: "",
        })

        // Reset success message after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false)
        }, 3000)
      }, 1000)
    }
  }

  return (
    <div className="bg-white dark:bg-card p-8 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Input
            name="name"
            placeholder="আপনার নাম"
            value={formData.name}
            onChange={handleChange}
            className={`text-xl p-4 h-16 ${errors.name ? "border-red-500" : ""}`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <Input
            name="email"
            type="email"
            placeholder="আপনার ইমেইল"
            value={formData.email}
            onChange={handleChange}
            className={`text-xl p-4 h-16 ${errors.email ? "border-red-500" : ""}`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <Textarea
            name="message"
            placeholder="আপনার বার্তা লিখুন"
            value={formData.message}
            onChange={handleChange}
            className={`text-xl p-4 ${errors.message ? "border-red-500" : ""}`}
            rows={5}
          />
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full text-xl py-7">
          {isSubmitting ? "পাঠানো হচ্ছে..." : "পাঠান"}
        </Button>
      </form>

      {isSubmitted && (
        <div className="mt-4 p-3 bg-green-100 dark:bg-opacity-20 text-green-700 dark:text-green-400 rounded-md text-lg">
          আপনার বার্তা সফলভাবে পাঠানো হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।
        </div>
      )}
    </div>
  )
}
