"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogIn, UserPlus, Menu, LogOut, User, Users, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Logo } from "@/components/logo"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useRouter } from "next/navigation"
import { useUser } from "@/contexts/user-context"

export function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { userRole, logout, isLoaded } = useUser()

  // Debug logging
  console.log("Header - userRole:", userRole, "isLoaded:", isLoaded, "pathname:", pathname)

  // Don't render auth-dependent content until context is loaded
  if (!isLoaded) {
    return (
      <header className="sticky top-0 z-50 bg-white dark:bg-card shadow-md">
        <div className="container mx-auto px-2 py-1 flex items-center justify-between">
          <Logo />
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <div className="hidden md:flex items-center space-x-2">
              <div className="w-20 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="w-20 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>
    )
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "জেলে":
        return <User className="h-4 w-4" />
      case "আড়তদার":
        return <Users className="h-4 w-4" />
      case "মৎস্য অধিদপ্তর":
        return <Building2 className="h-4 w-4" />
      default:
        return null
    }
  }

  const getRoleDashboardPath = (role: string) => {
    switch (role) {
      case "জেলে":
        return "/Jele"
      case "আড়তদার":
        return "/arotdar"
      case "মৎস্য অধিদপ্তর":
        return "/government-dashboard"
      default:
        return "/"
    }
  }

  const handleLogout = () => {
    logout()
    router.push('/')
    setOpen(false)
  }

  const handleRoleClick = () => {
    if (userRole) {
      router.push(getRoleDashboardPath(userRole))
    }
  }

  const routes = [
    {
      href: "/",
      label: "হোম",
    },
    {
      href: "/about",
      label: "আমাদের সম্পর্কে",
    },
    {
      href: "/services",
      label: "সেবাসমূহ",
    },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-card shadow-md">
      <div className="container mx-auto px-2 py-1 flex items-center justify-between">
        <Logo />

        {/* Navigation - Show in middle when logged in, otherwise hidden on mobile */}
        <nav className={`hidden md:flex items-center space-x-6 ${userRole ? 'flex-1 justify-center ml-14' : ''}`}>
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`text-lg ${
                pathname === route.href
                  ? "text-primary font-medium"
                  : "text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors"
              }`}
            >
              {route.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-2">
          <ThemeToggle />

          {userRole && (
            <Button
              onClick={handleRoleClick}
              variant="outline"
              className="hidden md:flex items-center text-gray-700 dark:text-gray-200 hover:text-primary hover:bg-primary/10"
            >
              {getRoleIcon(userRole)}
              <span className="ml-2">{userRole}</span>
            </Button>
          )}

          {userRole ? (
            <Button 
              onClick={handleLogout}
              variant="outline" 
              className="hidden md:flex items-center text-gray-700 dark:text-gray-200 hover:text-primary hover:bg-primary/10"
            >
              <LogOut className="h-4 w-4 mr-2" />
              লগআউট
            </Button>
          ) : (
            <>
              <Link href="/login" className="hidden md:block">
                <Button variant="ghost" className="text-gray-700 dark:text-gray-200 hover:text-primary hover:bg-primary/10">
                  <LogIn className="h-4 w-4 mr-2" />
                  লগইন
                </Button>
              </Link>

              <Link href="/signup" className="hidden md:block">
                <Button className="bg-primary hover:bg-primary/90">
                  <UserPlus className="h-4 w-4 mr-2" />
                  সাইন আপ
                </Button>
              </Link>
            </>
          )}

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden h-8 w-8 p-0">
                <Menu className="h-5 w-5" />
                <span className="sr-only">মেনু</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-4 px-2 py-4">
                <nav className="flex flex-col gap-3">
                  {routes.map((route) => (
                    <Link
                      key={route.href}
                      href={route.href}
                      onClick={() => setOpen(false)}
                      className={`text-lg px-2 py-1 rounded-md ${
                        pathname === route.href
                          ? "text-primary font-medium"
                          : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      {route.label}
                    </Link>
                  ))}
                  <div className="border-t my-2 pt-2">
                    {userRole && (
                      <Button
                        onClick={() => {
                          handleRoleClick()
                          setOpen(false)
                        }}
                        variant="ghost"
                        className="flex items-center justify-start w-full text-lg px-2 py-1 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 mb-2"
                      >
                        {getRoleIcon(userRole)}
                        <span className="ml-2">{userRole}</span>
                      </Button>
                    )}

                    {userRole ? (
                      <Button
                        onClick={handleLogout}
                        variant="ghost"
                        className="flex items-center justify-start w-full text-lg px-2 py-1 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        লগআউট
                      </Button>
                    ) : (
                      <>
                        <Link
                          href="/login"
                          onClick={() => setOpen(false)}
                          className="flex items-center text-lg px-2 py-1 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          <LogIn className="h-4 w-4 mr-2" />
                          লগইন
                        </Link>
                        <Link
                          href="/signup"
                          onClick={() => setOpen(false)}
                          className="flex items-center text-lg px-2 py-1 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          <UserPlus className="h-4 w-4 mr-2" />
                          সাইন আপ
                        </Link>
                      </>
                    )}
                  </div>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}