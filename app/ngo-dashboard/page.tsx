"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Clock, User, Filter, Map, Package, Truck } from "lucide-react"

const availableFood = [
  {
    id: 1,
    name: "Vegetable Biryani",
    type: "Vegetarian",
    quantity: "15 portions",
    expiry: "2 hours",
    location: "Downtown Restaurant",
    donor: "Spice Garden",
    distance: "1.2 km",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Chicken Curry",
    type: "Non-Vegetarian",
    quantity: "20 portions",
    expiry: "3 hours",
    location: "City Center",
    donor: "Royal Kitchen",
    distance: "2.1 km",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Fresh Salads",
    type: "Vegan",
    quantity: "12 portions",
    expiry: "4 hours",
    location: "Health Cafe",
    donor: "Green Bowl",
    distance: "0.8 km",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "Pasta & Bread",
    type: "Vegetarian",
    quantity: "18 portions",
    expiry: "5 hours",
    location: "Italian Corner",
    donor: "Bella Vista",
    distance: "1.5 km",
    image: "/placeholder.svg?height=100&width=100",
  },
]

const orders = [
  { id: 1, food: "Vegetable Biryani", status: "Delivered", time: "2 hours ago" },
  { id: 2, food: "Rice & Dal", status: "Picked Up", time: "4 hours ago" },
  { id: 3, food: "Mixed Curry", status: "Pending", time: "1 hour ago" },
  { id: 4, food: "Bread & Soup", status: "Accepted", time: "30 minutes ago" },
]

export default function NGODashboard() {
  const [selectedFood, setSelectedFood] = useState<any>(null)
  const [filters, setFilters] = useState({
    foodType: "All Types",
    expiry: "Any Time",
    location: "",
  })
  const [orderForm, setOrderForm] = useState({
    quantity: "",
    pickupTime: "",
    deliveryAddress: "",
  })

  const filteredFood = availableFood.filter((food) => {
    if (filters.foodType !== "All Types" && food.type !== filters.foodType) return false
    if (filters.location && !food.location.toLowerCase().includes(filters.location.toLowerCase())) return false
    return true
  })

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Order placed for ${selectedFood?.name}!`)
    setSelectedFood(null)
    setOrderForm({ quantity: "", pickupTime: "", deliveryAddress: "" })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800"
      case "Picked Up":
        return "bg-blue-100 text-blue-800"
      case "Accepted":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFCF2] to-[#F5EEDC]">
      <Navbar />

      <div className="pt-20 px-4 pb-8">
        <div className="container mx-auto">
          <div className="mb-8">
            <h1 className="varsity-font text-4xl text-[#4A7C59] mb-2">NGO Dashboard</h1>
            <p className="text-gray-600">Find and order food donations for your community</p>
          </div>

          <Tabs defaultValue="browse" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="browse">Browse Food</TabsTrigger>
              <TabsTrigger value="map">Map View</TabsTrigger>
              <TabsTrigger value="orders">My Orders</TabsTrigger>
            </TabsList>

            <TabsContent value="browse" className="space-y-6">
              {/* Filters */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Filter className="w-5 h-5 text-[#4A7C59]" />
                    <span>Filters</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="foodType">Food Type</Label>
                      <Select
                        value={filters.foodType}
                        onValueChange={(value) => setFilters((prev) => ({ ...prev, foodType: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="All types" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All Types">All Types</SelectItem>
                          <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                          <SelectItem value="Non-Vegetarian">Non-Vegetarian</SelectItem>
                          <SelectItem value="Vegan">Vegan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="expiry">Expiry Time</Label>
                      <Select
                        value={filters.expiry}
                        onValueChange={(value) => setFilters((prev) => ({ ...prev, expiry: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Any time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Any Time">Any Time</SelectItem>
                          <SelectItem value="1">Within 1 hour</SelectItem>
                          <SelectItem value="3">Within 3 hours</SelectItem>
                          <SelectItem value="6">Within 6 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={filters.location}
                        onChange={(e) => setFilters((prev) => ({ ...prev, location: e.target.value }))}
                        placeholder="Search by location"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Food Cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFood.map((food) => (
                  <Card key={food.id} className="shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                    <CardContent className="p-0">
                      <img
                        src={food.image || "/placeholder.svg"}
                        alt={food.name}
                        className="w-full h-32 object-cover rounded-t-lg"
                      />
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg">{food.name}</h3>
                          <Badge variant="secondary">{food.type}</Badge>
                        </div>

                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Package className="w-4 h-4" />
                            <span>{food.quantity}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4" />
                            <span>Expires in {food.expiry}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4" />
                            <span>
                              {food.location} ({food.distance})
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <User className="w-4 h-4" />
                            <span>{food.donor}</span>
                          </div>
                        </div>

                        <Button
                          onClick={() => setSelectedFood(food)}
                          className="w-full mt-4 bg-[#F28C8C] hover:bg-[#4A7C59] text-white rounded-full"
                        >
                          Order Food
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="map">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Map className="w-5 h-5 text-green-600" />
                    <span>Food Locations Near You</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Map className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Interactive map showing nearby food donations</p>
                      <p className="text-sm text-gray-500 mt-2">Map integration would be implemented here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Truck className="w-5 h-5 text-green-600" />
                    <span>Order Tracking</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-semibold text-gray-800">{order.food}</h4>
                          <p className="text-sm text-gray-600">{order.time}</p>
                        </div>
                        <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Order Modal */}
      {selectedFood && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Order {selectedFood.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleOrderSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="quantity">Quantity Needed</Label>
                  <Input
                    id="quantity"
                    value={orderForm.quantity}
                    onChange={(e) => setOrderForm((prev) => ({ ...prev, quantity: e.target.value }))}
                    placeholder="e.g., 10 portions"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="pickupTime">Desired Pickup Time</Label>
                  <Input
                    id="pickupTime"
                    type="datetime-local"
                    value={orderForm.pickupTime}
                    onChange={(e) => setOrderForm((prev) => ({ ...prev, pickupTime: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="deliveryAddress">Delivery Address</Label>
                  <Input
                    id="deliveryAddress"
                    value={orderForm.deliveryAddress}
                    onChange={(e) => setOrderForm((prev) => ({ ...prev, deliveryAddress: e.target.value }))}
                    placeholder="Enter complete delivery address"
                    required
                  />
                </div>
                <div className="flex space-x-3">
                  <Button type="submit" className="flex-1 bg-[#F28C8C] hover:bg-[#4A7C59] text-white">
                    Place Order
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setSelectedFood(null)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
