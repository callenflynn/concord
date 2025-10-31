'use client'
//439 is the line with the reccomended mods download  clickable cards are around 459
import * as React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Zap,
  Heart,
  Home,
  Compass,
  Settings,
  Cloud,
  Menu,
  X,
  ScrollText,
  Camera,
  Megaphone,
    Network, 
  ExternalLink,
  Trophy,
  Music,
  Moon,
  Sun,
  ChevronDown,
} from "lucide-react"
import { getAnnouncements } from "@/lib/announcements"

import concordLogo from './image.jpeg'
import kingsmc from './kings.png'

type CurrentView = "home" | "wiki" | "rules" | "screenshots" | "announcements" | "Discord" | "affiliates"

export default function ConcordSMPLanding() {
  const [copied, setCopied] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [currentView, setCurrentView] = useState<CurrentView>("home")
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [bannerVisible, setBannerVisible] = useState(true)
  const announcements = getAnnouncements()
  const latestAnnouncement = announcements.length > 0 ? announcements[0] : null

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true'
    setDarkMode(savedDarkMode)
    if (savedDarkMode) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setEnlargedImage(null)
      }
    }

    if (enlargedImage) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [enlargedImage])

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode.toString())
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

useEffect(() => {
  const screenshotPaths = [
    '/images/screenshot-1.png',
    '/images/screenshot-2.jpeg',
    '/images/screenshot-3.png',
    '/images/screenshot-4.png',
    '/images/screenshot-5.png',
    '/images/screenshot-6.png',
    '/images/screenshot-7.png',
    '/images/screenshot-8.png',
    '/images/screenshot-9.png',
    '/images/screenshot-10.png',
    '/images/screenshot-11.png',
    '/images/screenshot-12.png',
    '/images/screenshot-13.png',
    '/images/screenshot-14.png',
    '/images/screenshot-15.png',
    '/images/screenshot-16.png',
    '/images/screenshot-17.png',
    '/images/screenshot-18.png',
    '/images/screenshot-19.webp',
    '/images/screenshot-20.webp',
    '/images/screenshot-21.webp',
    '/images/screenshot-22.webp',
    '/images/screenshot-23.webp',
    '/images/screenshot-24.webp',
    '/images/screenshot-25.webp',
    '/images/screenshot-26.webp',
    '/images/screenshot-27.webp',
    '/images/screenshot-28.webp',
    '/images/screenshot-29.webp',
    '/images/screenshot-30.webp',
    '/images/screenshot-31.webp',
    '/images/coreprotect.jpg',
    '/images/distanthorizons.png'

  ]

  screenshotPaths.forEach(path => {
    const img = document.createElement('img')
    img.src = path
  })
}, [])

  const handleMenuClick = (view: CurrentView) => {
    setCurrentView(view)
    setMenuOpen(false)
    setDropdownOpen(false)
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const handleImageClick = (imageSrc: string) => {
    if (!isMobile) {
      setEnlargedImage(imageSrc)
    }
  }

  const closeEnlargedImage = () => {
    setEnlargedImage(null)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownOpen && !(event.target as Element).closest('.dropdown-container')) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownOpen])
 
  const renderHomePage = () => (
    <>
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-300/80 via-indigo-300/80 to-purple-300/80">
        <div className="absolute inset-0 bg-white/30 backdrop-blur-sm"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-center space-y-6">
            <div className="space-y-3">
              <div className="flex justify-center mb-4">
                <Image
                  src={concordLogo}
                  alt="Concord SMP Logo"
                  width={64}
                  height={64}
                  className="w-16 h-16 object-contain rounded-full"
                />
              </div>
              <h1 className="text-4xl sm:text-6xl font-light tracking-wide text-slate-700">Concord SMP</h1>
              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-light">
                A peaceful Minecraft community where creativity flows freely
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="secondary" className="bg-white/50 text-slate-600 border-white/30 rounded-full px-3 py-1">
                Versions 1.20-1.21.8
              </Badge>
              <Badge variant="secondary" className="bg-white/50 text-slate-600 border-white/30 rounded-full px-3 py-1">
                always updated
              </Badge>
              <Badge variant="secondary" className="bg-white/50 text-slate-600 border-white/30 rounded-full px-3 py-1">
                trust-based
              </Badge>
              <Badge variant="secondary" className="bg-white/50 text-slate-600 border-white/30 rounded-full px-3 py-1">
                chill vibes
              </Badge>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-slate-700 mb-3">what makes us special</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-light">
              a different kind of minecraft experience, built on trust and creativity
            </p>
          </div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
              <CardHeader className="pb-3">
                <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center mb-3">
                  <Heart className="w-5 h-5 text-rose-400" />
                </div>
                <CardTitle className="text-lg font-medium text-slate-700">built on trust</CardTitle>
                <CardDescription className="text-slate-500 font-light">
                  no strict rules or harsh punishments. just good people doing good things together.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
              <CardHeader className="pb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <Settings className="w-5 h-5 text-blue-400" />
                </div>
                <CardTitle className="text-lg font-medium text-slate-700">any client works</CardTitle>
                <CardDescription className="text-slate-500 font-light">
                  vanilla, fabric, optifine, neoforge - use whatever you want.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
              <CardHeader className="pb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                  <Shield className="w-5 h-5 text-purple-400" />
                </div>
                <CardTitle className="text-lg font-medium text-slate-700">no anticheat stress</CardTitle>
                <CardDescription className="text-slate-500 font-light">
                  play freely without worrying about false flags or restrictions.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
              <CardHeader className="pb-3">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mb-3">
                  <Home className="w-5 h-5 text-amber-400" />
                </div>
                <CardTitle className="text-lg font-medium text-slate-700">amazing builds</CardTitle>
                <CardDescription className="text-slate-500 font-light">
                  explore incredible creations from our talented community members.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
              <CardHeader className="pb-3">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mb-3">
                  <Compass className="w-5 h-5 text-teal-400" />
                </div>
                <CardTitle className="text-lg font-medium text-slate-700">endless exploration</CardTitle>
                <CardDescription className="text-slate-500 font-light">
                  vast worlds with hidden treasures and peaceful adventures.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
              <CardHeader className="pb-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mb-3">
                  <Zap className="w-5 h-5 text-emerald-400" />
                </div>
                <CardTitle className="text-lg font-medium text-slate-700">redstone friendly</CardTitle>
                <CardDescription className="text-slate-500 font-light">
                  perfect for engineers - no lag, no limits, just pure creativity.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
              <CardHeader className="pb-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mb-3">
                  <Trophy className="w-5 h-5 text-orange-400" />
                </div>
                <CardTitle className="text-lg font-medium text-slate-700">custom achievements</CardTitle>
                <CardDescription className="text-slate-500 font-light">
                  unlock unique challenges and milestones designed just for our community.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
              <CardHeader className="pb-3">
                <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center mb-3">
                  <Music className="w-5 h-5 text-pink-400" />
                </div>
                <CardTitle className="text-lg font-medium text-slate-700">custom music</CardTitle>
                <CardDescription className="text-slate-500 font-light">
                  immerse yourself with our carefully curated soundtrack and ambient sounds.
                </CardDescription>
              </CardHeader>
            </Card>
              <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
              <CardHeader className="pb-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mb-3">
                  {/* Using the image directly for the icon */}
                  <Image
                    src="/images/coreprotect.jpg"
                    alt="CoreProtect Logo"
                    width={20}
                    height={20}
                    className="w-10 h-10 object-cover rounded-full"
                  />
                </div>
                <CardTitle className="text-lg font-medium text-slate-700">anti-griefing & rollbacks</CardTitle>
                <CardDescription className="text-slate-500 font-light">
                  we use CoreProtect to log block changes, allowing us to easily rollback any major griefing.
                </CardDescription>
              </CardHeader>
            </Card>

                <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
              <CardHeader className="pb-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mb-3">
                  {/* Using the image directly for the icon */}
                  <Image
                    src="/images/distanthorizons.png"
                    alt="Distant Horizons Logo"
                    width={20}
                    height={20}
                    className="w-10 h-10 object-cover rounded-full"
                  />
                </div>
                <CardTitle className="text-lg font-medium text-slate-700">Distant Horizons</CardTitle>
                <CardDescription className="text-slate-500 font-light">
                  We have the Distant Horizons support plugin, allowing for Distant Horizons to be used client-side to the fullest potential.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
              <CardHeader className="pb-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-3">
                  <Image
                    src="/images/viaversion.png"
                    alt="ViaVersion Logo"
                    width={20}
                    height={20}
                    className="w-10 h-10 object-cover rounded-full"
                  />
                </div>
                <CardTitle className="text-lg font-medium text-slate-700">ViaVersion & ViaBackwards</CardTitle>
                <CardDescription className="text-slate-500 font-light">
                  Join with any client version 1.20-1.21.8! Our ViaVersion and ViaBackwards plugins ensure compatibility across versions.
                </CardDescription>
              </CardHeader>
            </Card>

          </div>
        </div>
      </section>
      {latestAnnouncement && (
        <section className="py-16 px-4 bg-white/40 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-slate-700 mb-3">latest news</h2>
              <p className="text-lg text-slate-500 font-light">stay informed with our most recent update</p>
            </div>

            <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-sm rounded-2xl overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-200 text-blue-600 rounded-full flex items-center justify-center font-medium text-sm">
                    <Megaphone className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-slate-700 mb-1">{latestAnnouncement.title}</h3>
                    <p className="text-sm text-slate-500 mb-3 font-light">{latestAnnouncement.date}</p>
                    <p className="text-slate-600 font-light">{latestAnnouncement.body}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="text-center mt-6">
              <Button
                variant="outline"
                className="bg-white/70 backdrop-blur-sm text-slate-700 hover:bg-white/90 rounded-full px-6 py-3 shadow-sm border-0"
                onClick={() => handleMenuClick("announcements")}
              >
                Click to see more announcements
              </Button>
            </div>
          </div>
        </section>
      )}

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-slate-700 mb-3">joining is easy</h2>
            <p className="text-lg text-slate-500 font-light">just a few simple steps to become part of our community</p>
          </div>

          <div className="space-y-6">
            <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-sm rounded-2xl overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-200 text-blue-600 rounded-full flex items-center justify-center font-medium text-sm">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-slate-700 mb-2">connect to the server</h3>
                    <p className="text-slate-500 mb-3 font-light">
                      add our server to your list and join with any minecraft client you like
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-sm rounded-2xl overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-purple-200 text-purple-600 rounded-full flex items-center justify-center font-medium text-sm">
                    2
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-slate-700 mb-2">explore in adventure mode</h3>
                    <p className="text-slate-500 font-light">
                      take your time to wander around, check out the builds, and get a feel for our peaceful community
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-sm rounded-2xl overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-emerald-200 text-emerald-600 rounded-full flex items-center justify-center font-medium text-sm">
                    3
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-slate-700 mb-2">ask the owner for permissions</h3>
                    <p className="text-slate-500 font-light">
                      when you're ready to start building and playing in survival, ask the server owner to add you to
                      the permissions list
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

<Card className="border-0 bg-white/70 backdrop-blur-sm shadow-sm rounded-2xl overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-rose-200 text-rose-600 rounded-full flex items-center justify-center font-medium text-sm">
                    4
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-slate-700 mb-2">start playing in survival</h3>
                    <p className="text-slate-500 font-light">
                      once added to the list, you'll have full building permissions and can play in survival mode
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-sm rounded-2xl overflow-hidden">
<CardContent className="p-6">
  <div className="flex items-start gap-4">
    <div className="w-8 h-8 bg-green-200 text-green-600 rounded-full flex items-center justify-center font-medium text-sm">
      5 A
    </div>
    <div className="flex-1">
      <h3 className="text-lg font-medium text-slate-700 mb-2">Manual client setup (optional)</h3>
<p className="text-slate-500 mb-3 font-light">
 Downloads the mods and shaders for 1.21.7 Fabric.
</p>

<a  href="https://drive.google.com/uc?export=download&id=1SlF-lpNbD9HJwuqBOlAjncPiGwwjr_5U"
  target="_blank"
  rel="noopener noreferrer"
>
        <Button className="bg-green-500 hover:bg-green-600 text-white rounded-lg px-4 py-2 text-sm">
          Download Zip
        </Button>
      </a>
    </div>
  </div>
</CardContent>
            </Card>
            <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-sm rounded-2xl overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-200 text-blue-600 rounded-full flex items-center justify-center font-medium text-sm">
                    5 B
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-slate-700 mb-2">preconfigured client installer (recommended, optional)</h3>
                    <p className="text-slate-500 mb-3 font-light">
                      Installs Java 21 JDK, Fabric 1.21.7, and all the mods and shaders. Recommended for those who have not yet modded minecraft or do not know how. After ran, please go to your Minecraft launcher and create a new instance with the 1.21.7 FABRIC version.
                    </p>
                    <p className="text-slate-500 mb-3 font-light">
                      Also includes the files in modrinth format, and the modrinth installer for an easier install and smoother experience.
                    </p>
                    <a  
                      href="https://drive.google.com/uc?export=download&id=1CcZg0i2XB2E9zmw8F5YurTHEqIC9dTBn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="bg-green-500 hover:bg-green-600 text-white rounded-lg px-4 py-2 text-sm">
                        Download Installer
                      </Button>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className="py-16 px-4 bg-white/40 backdrop-blur-sm">
  <div className="max-w-4xl mx-auto">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-light text-slate-700 mb-3">server trailers</h2>
      <p className="text-lg text-slate-500 font-light">see concord smp in action</p>
    </div>

    <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-sm rounded-2xl overflow-hidden">
      <CardContent className="p-6">
        <div className="aspect-video rounded-lg overflow-hidden bg-slate-100">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            controls
            className="w-full h-full object-cover"
          >
            <source src="/videos/s2trailer.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="mt-4 text-center">
          <h3 className="text-lg font-medium text-slate-700 mb-1">Season 2 Trailer</h3>
          <p className="text-slate-500 font-light">Season 2 is vanilla+, with minor tweaks to the base game.</p>
        </div>
      </CardContent>
    </Card>
  </div>
</section>
    </>
  )
  const renderRulesPage = () => (
    <section className="py-16 px-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light text-slate-700 mb-3">server rules</h2>
          <p className="text-lg text-slate-500 font-light">keeping concord smp fun and fair</p>
        </div>

        <div className="space-y-6">
          <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-sm rounded-2xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-200 text-blue-600 rounded-full flex items-center justify-center font-medium text-sm">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-slate-700 mb-2">no griefing</h3>
                  <p className="text-slate-500 font-light">
                    do not grief spawn. do not grief other players' builds unless.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-sm rounded-2xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-200 text-purple-600 rounded-full flex items-center justify-center font-medium text-sm">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-slate-700 mb-2">no hacks</h3>
                  <p className="text-slate-500 font-light">using any form of hacks will result in an immediate ban.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-sm rounded-2xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-emerald-200 text-emerald-600 rounded-full flex items-center justify-center font-medium text-sm">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-slate-700 mb-2">fair play with mods</h3>
                  <p className="text-slate-500 font-light">
                    any mods that give an unfair advantage will result in a temporary ban or kick, depending on
                    severity.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-sm rounded-2xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-rose-200 text-rose-600 rounded-full flex items-center justify-center font-medium text-sm">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-slate-700 mb-2">be kind and respectful</h3>
                  <p className="text-slate-500 font-light">treat all other players with kindness and respect.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-sm rounded-2xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-amber-200 text-amber-600 rounded-full flex items-center justify-center font-medium text-sm">
                  5
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-slate-700 mb-2">no stealing</h3>
                  <p className="text-slate-500 font-light">
                    do not steal items from players in the "spawn" area.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

                    <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-sm rounded-2xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-200 text-purple-600 rounded-full flex items-center justify-center font-medium text-sm">
                  6
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-slate-700 mb-2">no netherite armor</h3>
                  <p className="text-slate-500 font-light">
                    Netherite armor is not allowed and is not possible to make, however netherite tools are allowed.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-sm rounded-2xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-teal-200 text-teal-600 rounded-full flex items-center justify-center font-medium text-sm">
                  7
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-slate-700 mb-2">spawn protection</h3>
                  <p className="text-slate-500 font-light">
                    spawn is a safe zone and should not be messed with in terms of griefing, robbing, or spawnkilling.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
  const renderScreenshotsPage = () => {
    const screenshots = [
      { src: "/images/screenshot-42.png", alt: "Overview of spawn and surrounding areas showcasing countless amazing builds" },
      { src: "/images/screenshot-39.webp", alt: "Server screenshot" },
      { src: "/images/screenshot-38.webp", alt: "Server screenshot" },
      { src: "/images/screenshot-37.webp", alt: "Server screenshot" },
      { src: "/images/screenshot-34.webp", alt: "cal's new fountain" },
      { src: "/images/screenshot-33.webp", alt: "Jame" },
      { src: "/images/screenshot-32.webp", alt: "New shaders!!!" },
      { src: "/images/screenshot-31.webp", alt: "new build blah blah blah" },
      { src: "/images/screenshot-1.png", alt: "Minecraft interior with sunset view and campfire" },
      { src: "/images/screenshot-30.webp", alt: "too lazy to add alternate text" },
      { src: "/images/screenshot-40.png", alt: "Server screenshot" },
      { src: "/images/screenshot-41.png", alt: "Server screenshot" },
      { src: "/images/screenshot-29.webp", alt: "too lazy to add alternate text" },
      { src: "/images/screenshot-28.webp", alt: "too lazy to add alternate text" },
      { src: "/images/screenshot-27.webp", alt: "WIP underground hallways. bliss shaders 1800p (3k) with glowing ores and connected textures resource packs." },
      { src: "/images/screenshot-26.webp", alt: "Whole peninsula. 32 render distance, bliss shaders 1800p (3k)." },
      { src: "/images/screenshot-25.webp", alt: "mineshaft above glowsquids" },
      { src: "/images/screenshot-24.webp", alt: "deep dark below spawn" },
      { src: "/images/screenshot-23.webp", alt: "Spawn screenshot from the air by cal during rain" },
      { src: "/images/screenshot-22.webp", alt: "Spawn screenshot of castle and microwave by cal" },
      { src: "/images/screenshot-21.webp", alt: "screenshot of sunset by cal" },
      { src: "/images/screenshot-20.webp", alt: "Spawn screenshot from the air by cal" },
      { src: "/images/screenshot-19.webp", alt: "Spawn screenshot from the air by cal" },
      { src: "/images/screenshot-18.png", alt: "Spawn screenshot from the air by cal" },
      { src: "/images/screenshot-17.png", alt: "Spawn screenshot from the air by cal" },
      { src: "/images/screenshot-16.png", alt: "Spawn screenshot from the air by cal" },
      { src: "/images/screenshot-15.png", alt: "Spawn screenshot from the air by cal" },
      { src: "/images/screenshot-14.png", alt: "Spawn screenshot from the air by cal" },
      { src: "/images/screenshot-13.png", alt: "Spawn screenshot from the air by cal" },
      { src: "/images/screenshot-12.png", alt: "Spawn screenshot from the air by cal" },
      { src: "/images/screenshot-11.png", alt: "Callen's screenshot with shaders" },
      { src: "/images/screenshot-10.png", alt: "too lazy to add placeholder text LOL" },
      { src: "/images/screenshot-9.png", alt: "too lazy to add placeholder text LOL" },
      { src: "/images/screenshot-8.png", alt: "Minecraft player in golden armor in a cozy room" },
      { src: "/images/screenshot-7.png", alt: "AIDEN (July 25, 2025)" },
      { src: "/images/screenshot-6.png", alt: "scenery (July 25, 2025)" },
      { src: "/images/screenshot-36.webp", alt: "Server screenshot" },
      { src: "/images/screenshot-35.webp", alt: "Server screenshot" },
      { src: "/images/screenshot-5.png", alt: "A view of spawn without shaders (July 13, 2025)" },
      { src: "/images/screenshot-4.png", alt: "Nighttime Minecraft landscape with glowing purple structure" },
      { src: "/images/screenshot-3.png", alt: "Minecraft player in golden armor in a cozy room" },
      { src: "/images/screenshot-2.jpeg", alt: "Aerial view of Minecraft coastline with clear water" }
    ]

    return (
      <section className="py-16 px-4 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-slate-700 dark:text-slate-300 mb-3">server screenshots</h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-light">moments from our world</p>
            {!isMobile && (
              <p className="text-sm text-slate-400 dark:text-slate-500 mt-2">Click any image to enlarge</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {screenshots.map((screenshot, index) => (
              <Card key={index} className="border-0 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm shadow-sm rounded-2xl overflow-hidden">
                <Image
                  src={screenshot.src}
                  alt={screenshot.alt}
                  width={600}
                  height={400}
                  className={`w-full h-auto object-cover rounded-t-2xl ${!isMobile ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''}`}
                  onClick={() => handleImageClick(screenshot.src)}
                />
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  const renderAnnouncementsPage = () => (
    <section className="py-16 px-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light text-slate-700 mb-3">latest announcements</h2>
          <p className="text-lg text-slate-500 font-light">stay up-to-date with concord smp news</p>
        </div>

        {announcements.length > 0 ? (
          <div className="space-y-6">
            {announcements.map((announcement, index) => (
              <Card key={index} className="border-0 bg-white/70 backdrop-blur-sm shadow-sm rounded-2xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-200 text-blue-600 rounded-full flex items-center justify-center font-medium text-sm">
                      <Megaphone className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-slate-700 mb-1">{announcement.title}</h3>
                      <p className="text-sm text-slate-500 mb-3 font-light">{announcement.date}</p>
                      <p className="text-slate-600 font-light">{announcement.body}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Megaphone className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-light">no announcements available at the moment</p>
          </div>
        )}
      </div>
    </section>
  )

const renderAffiliatesPage = () => (
  <section className="py-16 px-4 min-h-screen">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-light text-slate-700 mb-3">our affiliates</h2>
        <p className="text-lg text-slate-500 font-light">partnerships that make our community stronger</p>
      </div>

      <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-sm rounded-2xl overflow-hidden">
  <CardContent className="p-6">
    <div className="flex items-center gap-4">
      <Image
        src="/images/concordmini.webp" 
        alt="Concord Mini Logo"
        width={64}
        height={64}
        className="w-16 h-16 object-contain rounded-full border border-slate-200"
      />
      <div className="flex-1">
        <h3 className="text-lg font-medium text-slate-700 mb-1">Concord Mini</h3>
        <p className="text-slate-500 font-light mb-2">
          A fast-paced 5v5 minigames server for small teams and intense competition. Version 1.8.8. 
        </p>
        <a
          href="https://concord-mini.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline text-sm font-medium flex items-center gap-1"
        >
          Visit Website <ExternalLink className="w-3 h-3" />
        </a>
        <div className="mt-2 flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-green-100 text-green-600">5v5 Minigames</Badge>
          <Badge variant="secondary" className="bg-purple-100 text-purple-600">Multiplayer</Badge>
          <Badge variant="secondary" className="bg-red-100 text-red-600">PVP</Badge>
          <Badge variant="secondary" className="bg-orange-100 text-orange-600">V1.8.8</Badge>


        </div>
      </div>
    </div>
  </CardContent>
</Card>

<div className="my-6 border-t border-slate-300/50"></div>

      
      <div className="space-y-6">
        <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-sm rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Image
                src={kingsmc} 
                alt="Kings MC Network Logo"
                width={64}
                height={64}
                className="w-16 h-16 object-contain rounded-full border border-slate-200"
              />
              <div className="flex-1">
                <h3 className="text-lg font-medium text-slate-700 mb-1">Kings MC Network *WARNING: WEBSITE NO LONGER ACTIVE*</h3>
                <p className="text-slate-500 font-light mb-2">
                  A network featuring both a traditional SMP and Lifesteal server.
                </p>
                <a
                  href="https://kings-mc.odoo.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline text-sm font-medium flex items-center gap-1"
                >
                  Visit Website <ExternalLink className="w-3 h-3" />
                </a>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-600">SMP</Badge>
                  <Badge variant="secondary" className="bg-red-100 text-red-600">Lifesteal</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
);

const renderWikiPage = () => (
  <section className="py-16 px-4 min-h-screen">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-light text-slate-700 dark:text-slate-300 mb-3">wiki</h2>
        <p className="text-lg text-slate-500 dark:text-slate-400 font-light">community knowledge base and guides</p>
      </div>

      <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 flex items-center justify-end">
          <a
            href="https://global-worm-2be.notion.site/28e4905203e28033ac59ecad9c63c898?v=28e4905203e28016aa6d000c54b119e4"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2"
          >
            <Button variant="outline" className="flex items-center">
              <ExternalLink className="w-4 h-4 mr-2" />
              Comment On The Wiki & See More resources
            </Button>
          </a>
        </div>
        <iframe 
          src="https://global-worm-2be.notion.site/ebd/28e4905203e28033ac59ecad9c63c898?v=28e4905203e2804cb92e000c7dd04bfb" 
          width="100%" 
          height="800" 
          className="w-full"
          frameBorder="0" 
          allowFullScreen
        />
      </div>
    </div>
  </section>
);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Image
                src={concordLogo}
                alt="Concord SMP Logo"
                width={32}
                height={32}
                className="w-8 h-8 rounded-full mr-2"
              />
              <span className="text-xl font-semibold text-slate-800 dark:text-slate-100">Concord SMP</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Horizontal Tabs */}
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  onClick={() => handleMenuClick("home")}
                  className={`text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 px-3 py-2 ${currentView === "home" ? "font-bold text-slate-900 dark:text-slate-100 bg-slate-100 dark:bg-slate-700" : ""}`}
                >
                  <Home className="w-4 h-4 mr-2" /> Home
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => handleMenuClick("screenshots")}
                  className={`text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 px-3 py-2 ${currentView === "screenshots" ? "font-bold text-slate-900 dark:text-slate-100 bg-slate-100 dark:bg-slate-700" : ""}`}
                >
                  <Camera className="w-4 h-4 mr-2" /> Screenshots
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => handleMenuClick("announcements")}
                  className={`text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 px-3 py-2 ${currentView === "announcements" ? "font-bold text-slate-900 dark:text-slate-100 bg-slate-100 dark:bg-slate-700" : ""}`}
                >
                  <Megaphone className="w-4 h-4 mr-2" /> Announcements
                </Button>
              </div>
              
              {/* Dropdown Menu */}
              <div className="dropdown-container relative">
                <Button
                  variant="ghost"
                  onClick={toggleDropdown}
                  className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 flex items-center px-3 py-2"
                >
                  Menu
                  <ChevronDown className={`w-4 h-4 ml-2 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                </Button>
                
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-2 animate-in slide-in-from-top-2 duration-200">
                    <Button
                      variant="ghost"
                      onClick={() => handleMenuClick("rules")}
                      className={`w-full justify-start text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 ${currentView === "rules" ? "font-bold bg-slate-100 dark:bg-slate-700" : ""}`}
                    >
                      <ScrollText className="w-4 h-4 mr-2" /> Rules
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => handleMenuClick("affiliates")}
                      className={`w-full justify-start text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 ${currentView === "affiliates" ? "font-bold bg-slate-100 dark:bg-slate-700" : ""}`}
                    >
                      <Network className="w-4 h-4 mr-2" /> Affiliates
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => handleMenuClick("wiki")}
                      className={`w-full justify-start text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 ${currentView === "wiki" ? "font-bold bg-slate-100 dark:bg-slate-700" : ""}`}
                    >
                      <ScrollText className="w-4 h-4 mr-2" /> Wiki
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => window.open('https://callenflynn.github.io/Modpacks/', '_blank')}
                      className={`w-full justify-start text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700`}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" /> Cal's Modpacks
                    </Button>
                    <div className="border-t border-slate-200 dark:border-slate-700 my-2"></div>
                    <a
                      href="https://discord.gg/V6xAeZecSr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 127.14 96.36" className="w-4 h-4 mr-2" fill="currentColor">
                          <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
                        </svg>
                        Discord
                      </Button>
                    </a>
                    <div className="border-t border-slate-200 dark:border-slate-700 my-2"></div>
                    <Button
                      variant="ghost"
                      onClick={toggleDarkMode}
                      className="w-full justify-start text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      {darkMode ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
                      {darkMode ? 'Light Mode' : 'Dark Mode'}
                    </Button>
                  </div>
                )}
              </div>
            </div>
            {/* Mobile Menu Button */}
            <div className="-mr-2 flex md:hidden">
              <Button
                variant="ghost"
                onClick={() => setMenuOpen(!menuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <span className="sr-only">Open main menu</span>
                {menuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {menuOpen && (
          <div className="md:hidden bg-white/95 dark:bg-slate-800/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-700 animate-in slide-in-from-top-2 duration-200">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Button
                variant="ghost"
                onClick={() => handleMenuClick("home")}
                className={`w-full justify-start text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 ${currentView === "home" ? "font-bold bg-slate-100 dark:bg-slate-700" : ""}`}
              >
                <Home className="w-4 h-4 mr-2" /> Home
              </Button>
              <Button
                variant="ghost"
                onClick={() => handleMenuClick("rules")}
                className={`w-full justify-start text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 ${currentView === "rules" ? "font-bold bg-slate-100 dark:bg-slate-700" : ""}`}
              >
                <ScrollText className="w-4 h-4 mr-2" /> Rules
              </Button>
              <Button
                variant="ghost"
                onClick={() => handleMenuClick("screenshots")}
                className={`w-full justify-start text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 ${currentView === "screenshots" ? "font-bold bg-slate-100 dark:bg-slate-700" : ""}`}
              >
                <Camera className="w-4 h-4 mr-2" /> Screenshots
              </Button>
              <Button
                variant="ghost"
                onClick={() => handleMenuClick("announcements")}
                className={`w-full justify-start text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 ${currentView === "announcements" ? "font-bold bg-slate-100 dark:bg-slate-700" : ""}`}
              >
                <Megaphone className="w-4 h-4 mr-2" /> Announcements
              </Button>
              <Button
                variant="ghost"
                onClick={() => handleMenuClick("affiliates")}
                className={`w-full justify-start text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 ${currentView === "affiliates" ? "font-bold bg-slate-100 dark:bg-slate-700" : ""}`}
              >
                <Network className="w-4 h-4 mr-2" /> Affiliates
              </Button>
              <Button
                variant="ghost"
                onClick={() => handleMenuClick("wiki")}
                className={`w-full justify-start text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 ${currentView === "wiki" ? "font-bold bg-slate-100 dark:bg-slate-700" : ""}`}
              >
                <ScrollText className="w-4 h-4 mr-2" /> Wiki
              </Button>
              <Button
                variant="ghost"
                onClick={() => window.open('https://callenflynn.github.io/Modpacks/', '_blank')}
                className="w-full justify-start text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <ExternalLink className="w-4 h-4 mr-2" /> Cal's Modpacks
              </Button>
              <div className="border-t border-slate-200 dark:border-slate-700 my-2"></div>
              <a
                href="https://discord.gg/V6xAeZecSr"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 127.14 96.36" className="w-4 h-4 mr-2" fill="currentColor">
                    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
                  </svg>
                  Discord
                </Button>
              </a>
              <div className="border-t border-slate-200 dark:border-slate-700 my-2"></div>
              <Button
                variant="ghost"
                onClick={toggleDarkMode}
                className="w-full justify-start text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                {darkMode ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </Button>
            </div>
          </div>
        )}
      </nav>

      {bannerVisible && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-red-600 text-white py-3 px-4 shadow-lg">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold">!</span>
              </div>
              <span className="font-medium">server address moved</span>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 text-sm"
                onClick={() => window.open('/articles/server-moved-1018/', '_blank')}
              >
                Read More
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setBannerVisible(false)}
                className="text-white hover:bg-white/10 p-1"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      <main className={bannerVisible ? "pt-28" : "pt-16"}> 
        {(() => {
          switch (currentView) {
            case "home":
              return renderHomePage()
            case "rules":
              return renderRulesPage()
            case "screenshots":
              return renderScreenshotsPage()
            case "announcements":
              return renderAnnouncementsPage()
            case "affiliates": 
              return renderAffiliatesPage()
            case "wiki":
              return renderWikiPage()
            default:
              return renderHomePage()
          }
        })()}
      </main>

      {/* Footer */}
<footer className="bg-slate-800 text-slate-300 py-8 px-4">
  <div className="max-w-7xl mx-auto text-center space-y-4">
    <div className="flex justify-center mb-4">
      <Image
        src={concordLogo}
        alt="Concord SMP Logo"
        width={48}
        height={48}
        className="w-12 h-12 object-contain rounded-full"
      />
    </div>
    <p className="text-xl font-light text-white">Concord SMP</p>
  </div>
</footer>

      {enlargedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-8"
          onClick={closeEnlargedImage}
        >
          <div className="relative max-w-[80vw] max-h-[80vh]">
            <Image
              src={enlargedImage}
              alt="Enlarged screenshot"
              width={1200}
              height={800}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={closeEnlargedImage}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
