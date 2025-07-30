"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send } from "lucide-react"

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm your PlateFull Assistant — how can I help you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Mock bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Thanks for your message! I'm here to help with FAQs, order tracking, and food requests. How can I assist you further?",
        isBot: true,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)
  }

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#F28C8C] hover:bg-[#4A7C59] shadow-lg hover:shadow-xl transition-all z-50 ${
          isOpen ? "hidden" : "flex"
        } items-center justify-center`}
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-80 h-96 z-50 shadow-2xl">
          <CardHeader className="bg-[#F28C8C] text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">PlateFull Assistant</CardTitle>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-[#4A7C59]"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-0 flex flex-col h-full">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                      message.isBot ? "bg-[#F5EEDC] text-[#4A7C59]" : "bg-[#F28C8C] text-white"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="sm" className="bg-[#F28C8C] hover:bg-[#4A7C59]">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
            {/* Contact Info Section */}
            <div className="p-4 border-t bg-[#F5EEDC] text-[#4A7C59] text-xs rounded-b-lg">
              <div className="font-semibold mb-1">Contact Info (Co-Founders):</div>
              <div className="mb-1">
                <span className="font-medium">Kunika Prajapat</span><br />
                Phone: <a href="tel:8003535828" className="underline">8003535828</a><br />
                Email: <a href="mailto:kunikaprajapat1026@gmail.com" className="underline">kunikaprajapat1026@gmail.com</a>
              </div>
              <div>
                <span className="font-medium">Suhana Laddha</span><br />
                Phone: <a href="tel:7878943493" className="underline">7878943493</a><br />
                Email: <a href="mailto:laddhasuhana@gmail.com" className="underline">laddhasuhana@gmail.com</a>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
