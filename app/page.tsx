"use client"

import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { ScrollAnimation } from "@/components/scroll-animation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, Leaf, MapPin, Clock, Award } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      if (user.role === "donor") {
        router.push("/donor-dashboard")
      } else {
        router.push("/ngo-dashboard")
      }
    }
  }, [user, router])

  if (user) {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-16 px-4">
        <div className="container mx-auto text-center">
          <ScrollAnimation>
            <div className="max-w-4xl mx-auto">
              <h1 className="varsity-font text-6xl md:text-8xl text-[#4A7C59] mb-6">PlateFull</h1>
              <p className="text-2xl md:text-3xl text-gray-700 mb-4 font-medium">From your plate... to someone's day</p>
              <p className="text-xl md:text-2xl text-[#F28C8C] mb-8 font-medium">Don't Waste, Donate a Plate</p>
              <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
                Join our mission to reduce food waste by connecting food donors with NGOs in real time. Every plate
                saved makes a difference.
              </p>
              <Link href="/auth">
                <Button className="bg-[#F5EEDC] hover:bg-[#B7C4A1] text-[#4A7C59] text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all">
                  Start Making a Difference
                </Button>
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <ScrollAnimation>
            <div className="text-center mb-12">
              <h2 className="varsity-font text-4xl md:text-5xl text-[#4A7C59] mb-4">About PlateFull</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We're bridging the gap between food surplus and food insecurity through technology, creating a
                sustainable ecosystem where nothing goes to waste.
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-3 gap-8">
            <ScrollAnimation>
              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-[#B7C4A1]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-[#B7C4A1]" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">For Donors</h3>
                  <p className="text-gray-600">
                    Restaurants, caterers, and individuals can easily donate surplus food and track their positive
                    impact on the community.
                  </p>
                </CardContent>
              </Card>
            </ScrollAnimation>

            <ScrollAnimation>
              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-[#B7C4A1]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-[#B7C4A1]" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">For NGOs</h3>
                  <p className="text-gray-600">
                    NGOs can discover available food donations nearby, place orders, and coordinate pickups efficiently
                    through our platform.
                  </p>
                </CardContent>
              </Card>
            </ScrollAnimation>

            <ScrollAnimation>
              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-[#B7C4A1]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Leaf className="w-8 h-8 text-[#B7C4A1]" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">For Environment</h3>
                  <p className="text-gray-600">
                    Every donation reduces food waste, lowers carbon footprint, and contributes to a more sustainable
                    future for all.
                  </p>
                </CardContent>
              </Card>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-16 px-4">
        <div className="container mx-auto">
          <ScrollAnimation>
            <div className="text-center mb-12">
              <h2 className="varsity-font text-4xl md:text-5xl text-[#4A7C59] mb-4">Our Impact</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Together, we're making a real difference in fighting food waste and hunger.
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-4 gap-8">
            <ScrollAnimation>
              <div className="text-center">
                <div className="w-20 h-20 bg-[#B7C4A1]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-[#4A7C59]">2.5K</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Meals Saved</h3>
                <p className="text-gray-600">Plates that found their way to those in need</p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation>
              <div className="text-center">
                <div className="w-20 h-20 bg-[#B7C4A1]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-[#F28C8C]">150+</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Active NGOs</h3>
                <p className="text-gray-600">Organizations working with us</p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation>
              <div className="text-center">
                <div className="w-20 h-20 bg-[#B7C4A1]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-[#B7C4A1]">300+</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Food Donors</h3>
                <p className="text-gray-600">Restaurants and individuals contributing</p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation>
              <div className="text-center">
                <div className="w-20 h-20 bg-[#B7C4A1]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-[#4A7C59]">1.2T</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">CO₂ Saved</h3>
                <p className="text-gray-600">Tons of carbon emissions prevented</p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <ScrollAnimation>
            <div className="text-center mb-12">
              <h2 className="varsity-font text-4xl md:text-5xl text-[#4A7C59] mb-4">Get In Touch</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Have questions or want to learn more about PlateFull? We'd love to hear from you.
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <ScrollAnimation>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#B7C4A1]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-[#B7C4A1]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Visit Us</h3>
                <p className="text-gray-600">
                  123 Impact Street
                  <br />
                  Sustainability City, SC 12345
                  <br />
                  United States
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#B7C4A1]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-[#B7C4A1]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Support Hours</h3>
                <p className="text-gray-600">
                  Monday - Friday
                  <br />
                  9:00 AM - 6:00 PM EST
                  <br />
                  Saturday: 10:00 AM - 2:00 PM
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#B7C4A1]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-[#B7C4A1]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Email & Phone</h3>
                <p className="text-gray-600">
                  hello@platefull.org
                  <br />
                  support@platefull.org
                  <br />
                  +1 (555) 123-4567
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#B7C4A1]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-[#B7C4A1]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Partnership</h3>
                <p className="text-gray-600">
                  partnerships@platefull.org
                  <br />
                  For NGOs & Restaurants
                  <br />
                  Join our mission
                </p>
              </div>
            </ScrollAnimation>
          </div>

          {/* Additional Contact Info */}
          <ScrollAnimation>
            <div className="mt-12 text-center">
              <div className="bg-[#F5EEDC] rounded-lg p-8 max-w-4xl mx-auto">
                <h3 className="text-2xl font-semibold text-[#4A7C59] mb-4">Ready to Make a Difference?</h3>
                <p className="text-gray-600 mb-6">
                  Whether you're a restaurant looking to donate surplus food, an NGO seeking to help those in need, 
                  or an individual wanting to contribute to our mission, we're here to help you get started.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/auth">
                    <Button className="bg-[#4A7C59] hover:bg-[#3A6B4A] text-white px-6 py-3 rounded-full">
                      Join PlateFull Today
                    </Button>
                  </Link>
                  <Button variant="outline" className="border-[#4A7C59] text-[#4A7C59] hover:bg-[#4A7C59] hover:text-white px-6 py-3 rounded-full">
                    Download Our App
                  </Button>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">P</span>
            </div>
            <span className="varsity-font text-xl text-orange-400">PlateFull</span>
          </div>
          <p className="text-gray-400 mb-4">From your plate... to someone's day</p>
          <p className="text-sm text-gray-500">
            © 2024 PlateFull. All rights reserved. Making the world a better place, one plate at a time.
          </p>
        </div>
      </footer>
    </div>
  )
}
