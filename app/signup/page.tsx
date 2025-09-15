"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, User, Users, Building2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SharedLayout } from "@/components/shared-layout"

type UserRole = "জেলে" | "আড়তদার" | "মৎস্য অধিদপ্তর" | null

export default function SignupPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole>(null)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    nid: "",
    password: "",
    confirmPassword: "",
  
  
  })

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    nid: "",
    password: "",
    confirmPassword: "",
  
  })

   const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }

    // Check password match when typing in confirm password
    if (name === "confirmPassword" || (name === "password" && formData.confirmPassword)) {
      if (name === "password" && value !== formData.confirmPassword) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "পাসওয়ার্ড মিলছে না",
        }))
      } else if (name === "confirmPassword" && value !== formData.password) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "পাসওয়ার্ড মিলছে না",
        }))
      } else {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "",
        }))
      }
    }
  }

  const validateForm = () => {
    let isValid = true
    const newErrors = { ...errors }

    if (!formData.name.trim()) {
      newErrors.name = "নাম আবশ্যক"
      isValid = false
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "ফোন নম্বর আবশ্যক"
      isValid = false
    } else if (!/^01\d{9}$/.test(formData.phone)) {
      newErrors.phone = "সঠিক বাংলাদেশি ফোন নম্বর দিন"
      isValid = false
    }

    if (!formData.nid.trim()) {
      newErrors.nid = "এনআইডি নম্বর আবশ্যক"
      isValid = false
    } else if (!/^\d{10}$|^\d{13}$|^\d{17}$/.test(formData.nid)) {
      newErrors.nid = "সঠিক এনআইডি নম্বর দিন"
      isValid = false
    }

    if (!formData.password) {
      newErrors.password = "পাসওয়ার্ড আবশ্যক"
      isValid = false
    } else if (formData.password.length < 6) {
      newErrors.password = "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে"
      isValid = false
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "পাসওয়ার্ড নিশ্চিত করুন"
      isValid = false
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "পাসওয়ার্ড মিলছে না"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      // Handle signup logic here
      console.log("Signup with:", formData)
    }
  }

  return (
    <SharedLayout hideAuthButtons>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center p-4 bg-gray-50 dark:bg-background">
        <div className="w-full max-w-md">
          <Card className="shadow-lg border-0 dark:border dark:border-border">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold">সাইন আপ</CardTitle>
              <CardDescription className="text-lg">
                {selectedRole ? `${selectedRole} হিসাবে অ্যাকাউন্ট তৈরি করুন` : "আপনার ব্যবহারকারী ধরন নির্বাচন করুন"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!selectedRole ? (
                <div className="grid grid-cols-1 gap-4">
                  <RoleCard
                    title="জেলে"
                    description="মাছ ধরা এবং বিক্রয় করার জন্য"
                    icon={<User className="h-8 w-8" />}
                    onClick={() => handleRoleSelect("জেলে")}
                  />
                  <RoleCard
                    title="আড়তদার"
                    description="মাছ কেনা এবং বিক্রয় করার জন্য"
                    icon={<Users className="h-8 w-8" />}
                    onClick={() => handleRoleSelect("আড়তদার")}
                  />
                  <RoleCard
                    title="মৎস্য অধিদপ্তর"
                    description="সরকারি কর্মকর্তা হিসাবে"
                    icon={<Building2 className="h-8 w-8" />}
                    onClick={() => handleRoleSelect("মৎস্য অধিদপ্তর")}
                  />
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-lg">
                      নাম
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="আপনার পূর্ণ নাম লিখুন"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`text-lg p-6 h-14 ${errors.name ? "border-red-500" : ""}`}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-lg">
                      ফোন নম্বর
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="০১XXXXXXXXX"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`text-lg p-6 h-14 ${errors.phone ? "border-red-500" : ""}`}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nid" className="text-lg">
                      এনআইডি নম্বর
                    </Label>
                    <Input
                      id="nid"
                      name="nid"
                      placeholder="আপনার জাতীয় পরিচয়পত্র নম্বর"
                      value={formData.nid}
                      onChange={handleInputChange}
                      className={`text-lg p-6 h-14 ${errors.nid ? "border-red-500" : ""}`}
                    />
                    {errors.nid && <p className="text-red-500 text-sm mt-1">{errors.nid}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-lg">
                      পাসওয়ার্ড
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="নতুন পাসওয়ার্ড"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`text-lg p-6 h-14 ${errors.password ? "border-red-500" : ""}`}
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-lg">
                      পাসওয়ার্ড নিশ্চিত করুন
                    </Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="পাসওয়ার্ড আবার লিখুন"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`text-lg p-6 h-14 ${errors.confirmPassword ? "border-red-500" : ""}`}
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                  </div>

                  <div className="pt-2">
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-xl py-6">
                      অ্যাকাউন্ট তৈরি করুন
                    </Button>
                  </div>
                  <div className="text-center pt-2">
                    <Button
                      variant="ghost"
                      onClick={() => setSelectedRole(null)}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                      ফিরে যান
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
            <CardFooter className="flex justify-center border-t p-6">
              <div className="text-center">
                <Link href="/login" className="inline-flex items-center text-primary hover:underline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  <span>লগইন পেজে ফিরে যান</span>
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </SharedLayout>
  )
}

interface RoleCardProps {
  title: string
  description: string
  icon: React.ReactNode
  onClick: () => void
}

function RoleCard({ title, description, icon, onClick }: RoleCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center p-4 border rounded-lg hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors group"
    >
      <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-full mr-4 text-primary">{icon}</div>
      <div className="flex-1 text-left">
        <h3 className="text-xl font-medium">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400">{description}</p>
      </div>
      <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors" />
    </button>
  )
}
