"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight, User, Users, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SharedLayout } from "@/components/shared-layout"
import { useUser, type UserRole } from "@/contexts/user-context"

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole>(null)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const router = useRouter()
  const { setUserRole } = useUser()

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

 // Replace the handleSubmit function:
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  console.log("Login with:", { role: selectedRole, ...formData })

  // Store the user role in context and localStorage
  setUserRole(selectedRole)
  console.log("Role set to:", selectedRole)

  // Wait a moment for the context to update
  await new Promise(resolve => setTimeout(resolve, 100))

  // Use router.push instead of window.location.href to preserve React state
  if (selectedRole === "জেলে") {
    router.push("/Jele")
  } else if (selectedRole === "আড়তদার") {
    router.push("/arotdar")
  } else if (selectedRole === "মৎস্য অধিদপ্তর") {
    router.push("/government-dashboard")
  }
}
  return (
    <SharedLayout hideAuthButtons>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center p-4 bg-gray-50 dark:bg-background">
        <div className="w-full max-w-md">
          <Card className="shadow-lg border-0 dark:border dark:border-border">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold">লগইন</CardTitle>
              <CardDescription className="text-lg">
                {selectedRole ? `${selectedRole} হিসাবে লগইন করুন` : "আপনার ব্যবহারকারী ধরন নির্বাচন করুন"}
              </CardDescription>
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  📝 যেকোনো ইমেইল বা পাসওয়ার্ড দিন
                </p>
              </div>
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
                    <Label htmlFor="username" className="text-lg">
                      ফোন নম্বর / ইউজারনেম
                    </Label>
                    <Input
                      id="username"
                      name="username"
                      placeholder="আপনার ফোন নম্বর বা ইউজারনেম লিখুন"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="text-lg p-6 h-14"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-lg">
                        পাসওয়ার্ড
                      </Label>
                      <Link href="/forgot-password" className="text-primary hover:underline text-base">
                        পাসওয়ার্ড ভুলে গেছেন?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="আপনার পাসওয়ার্ড লিখুন"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="text-lg p-6 h-14"
                      required
                    />
                  </div>
                  <div className="pt-2">
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-xl py-6">
                      লগইন করুন
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
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  অ্যাকাউন্ট নেই?{" "}
                  <Link href="/signup" className="text-primary hover:underline font-medium">
                    সাইন আপ করুন
                  </Link>
                </p>
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
