import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { AuthProvider } from "@/components/auth-provider"
import { Chatbot } from "@/components/chatbot"

export const metadata: Metadata = {
  title: "PlateFull - From your plate to someone's day",
  description: "Reduce food waste by connecting food donors with NGOs in real time",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <AuthProvider>
          {children}
          <Chatbot />
        </AuthProvider>
      </body>
    </html>
  )
}
