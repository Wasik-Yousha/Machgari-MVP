import type React from "react"
import type { Metadata } from "next"
import { Hind_Siliguri } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LiveChatButton } from "@/components/chat-button"
import { UserProvider } from "@/contexts/user-context"
import { FishDataProvider } from "@/contexts/fish-data-context"
import { FarmingProfileProvider } from "@/contexts/farming-profile-context"
import { TransactionsProvider } from "@/contexts/transactions-context"
import { LocalStorageDebugger } from "@/components/local-storage-debugger"

const hindSiliguri = Hind_Siliguri({ 
  subsets: ["latin"],
  weight: ["400", "500", "700"]
})

export const metadata: Metadata = {
  title: "মাছগাড়ি - মাছ পরিবহন এবং বাজার ব্যবস্থাপনা",
  description: "বাংলাদেশের প্রথম ডিজিটাল মাছ পরিবহন এবং বাজার ব্যবস্থাপনা প্ল্যাটফর্ম",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body className={hindSiliguri.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <UserProvider>
            {/* Providers are ordered by dependency - fish data doesn't depend on others */}
            <FishDataProvider>
              {/* Transactions provider may reference fish data */}
              <TransactionsProvider>
                {/* Farming profile may reference both fish and transactions */}
                <FarmingProfileProvider>
                  {/* Debugger should be last to access all contexts */}
                  <LocalStorageDebugger />
                  {children}
                  <LiveChatButton />
                </FarmingProfileProvider>
              </TransactionsProvider>
            </FishDataProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}