"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  role: "donor" | "ngo"
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, role: "donor" | "ngo") => Promise<boolean>
  signup: (userData: any) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = async (email: string, password: string, role: "donor" | "ngo") => {
    // Mock authentication
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockUser: User = {
      id: "1",
      name: "John Doe",
      email,
      role,
    }

    setUser(mockUser)
    return true
  }

  const signup = async (userData: any) => {
    // Mock signup
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockUser: User = {
      id: "1",
      name: userData.fullName,
      email: userData.email,
      role: userData.role,
    }

    setUser(mockUser)
    return true
  }

  const logout = () => {
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, signup, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
