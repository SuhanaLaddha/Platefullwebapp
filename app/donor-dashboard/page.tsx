"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"
import { Upload, TrendingUp, Award, Calendar } from "lucide-react"

const impactData = [
  { name: "Meals Donated", value: 245, color: "#4A7C59" },
  { name: "CO₂ Saved (kg)", value: 180, color: "#F28C8C" },
  { name: "NGOs Helped", value: 12, color: "#B7C4A1" },
]

const monthlyData = [
  { month: "Jan", donations: 20 },
  { month: "Feb", donations: 35 },
  { month: "Mar", donations: 28 },
  { month: "Apr", donations: 42 },
  { month: "May", donations: 38 },
  { month: "Jun", donations: 45 },
]

const donationHistory = [
  {
    id: 1,
    food: "Vegetable Curry",
    quantity: "5 portions",
    date: "2024-01-15",
    ngo: "Hope Foundation",
    status: "Delivered",
  },
  { id: 2, food: "Rice & Dal", quantity: "10 portions", date: "2024-01-14", ngo: "Care Society", status: "Picked Up" },
  {
    id: 3,
    food: "Mixed Vegetables",
    quantity: "8 portions",
    date: "2024-01-13",
    ngo: "Helping Hands",
    status: "Delivered",
  },
]

export default function DonorDashboard() {
  const [formData, setFormData] = useState({
    foodName: "",
    foodType: "",
    quantity: "",
    expiryTime: "",
    pickupTime: "",
    pickupLocation: "",
    deliveryPartner: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock submission
    alert("Food donation submitted successfully!")
    setFormData({
      foodName: "",
      foodType: "",
      quantity: "",
      expiryTime: "",
      pickupTime: "",
      pickupLocation: "",
      deliveryPartner: "",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFCF2] to-[#F5EEDC]">
      <Navbar />

      <div className="pt-20 px-4 pb-8">
        <div className="container mx-auto">
          <div className="mb-8">
            <h1 className="varsity-font text-4xl text-[#4A7C59] mb-2">Donor Dashboard</h1>
            <p className="text-gray-600">Make a difference by donating surplus food</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Upload Food Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Upload className="w-5 h-5 text-[#4A7C59]" />
                    <span>Donate Food</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="foodName">Food Name</Label>
                        <Input
                          id="foodName"
                          value={formData.foodName}
                          onChange={(e) => setFormData((prev) => ({ ...prev, foodName: e.target.value }))}
                          placeholder="e.g., Vegetable Curry"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="foodType">Food Type</Label>
                        <Select
                          value={formData.foodType}
                          onValueChange={(value) => setFormData((prev) => ({ ...prev, foodType: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select food type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="vegetarian">Vegetarian</SelectItem>
                            <SelectItem value="non-vegetarian">Non-Vegetarian</SelectItem>
                            <SelectItem value="vegan">Vegan</SelectItem>
                            <SelectItem value="dessert">Dessert</SelectItem>
                            <SelectItem value="beverages">Beverages</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="quantity">Quantity</Label>
                        <Input
                          id="quantity"
                          value={formData.quantity}
                          onChange={(e) => setFormData((prev) => ({ ...prev, quantity: e.target.value }))}
                          placeholder="e.g., 10 portions"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="expiryTime">Expiry Time</Label>
                        <Input
                          id="expiryTime"
                          type="datetime-local"
                          value={formData.expiryTime}
                          onChange={(e) => setFormData((prev) => ({ ...prev, expiryTime: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="pickupTime">Pickup Time</Label>
                        <Input
                          id="pickupTime"
                          type="datetime-local"
                          value={formData.pickupTime}
                          onChange={(e) => setFormData((prev) => ({ ...prev, pickupTime: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="deliveryPartner">Delivery Partner (Optional)</Label>
                        <Select
                          value={formData.deliveryPartner}
                          onValueChange={(value) => setFormData((prev) => ({ ...prev, deliveryPartner: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Choose delivery partner" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="self">Self Pickup</SelectItem>
                            <SelectItem value="partner1">QuickDeliver</SelectItem>
                            <SelectItem value="partner2">FoodRush</SelectItem>
                            <SelectItem value="partner3">CareTransport</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="pickupLocation">Pickup Location</Label>
                      <Textarea
                        id="pickupLocation"
                        value={formData.pickupLocation}
                        onChange={(e) => setFormData((prev) => ({ ...prev, pickupLocation: e.target.value }))}
                        placeholder="Enter complete pickup address with landmarks"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[#F5EEDC] hover:bg-[#B7C4A1] text-white rounded-full py-3"
                    >
                      Submit Donation
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Donation History */}
              <Card className="shadow-lg mt-8">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-orange-600" />
                    <span>Donation History</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {donationHistory.map((donation) => (
                      <div key={donation.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-semibold text-gray-800">{donation.food}</h4>
                          <p className="text-sm text-gray-600">
                            {donation.quantity} • {donation.ngo}
                          </p>
                          <p className="text-xs text-gray-500">{donation.date}</p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            donation.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {donation.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* CSR Impact Panel */}
            <div className="space-y-6">
              {/* Impact Stats */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span>Your Impact</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {impactData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{item.name}</span>
                        <span className="font-bold text-lg" style={{ color: item.color }}>
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie data={impactData} cx="50%" cy="50%" innerRadius={40} outerRadius={80} dataKey="value">
                          {impactData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Monthly Donations Chart */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-blue-600" />
                    <span>Monthly Progress</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="donations" stroke="#4A7C59" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Achievement Badge */}
              <Card className="shadow-lg bg-gradient-to-r from-[#F28C8C] to-[#B7C4A1] text-white">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Award className="w-12 h-12 mx-auto mb-3" />
                    <h3 className="font-bold text-lg mb-2">Food Hero</h3>
                    <p className="text-sm opacity-90">You've donated over 200 meals! Keep up the amazing work.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
