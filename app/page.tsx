"use client"

import { useState, useEffect } from "react"
import Image from "next/image" // Import Image component
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Server,
  Users,
  Shield,
  Zap,
  Copy,
  CheckCircle,
  Heart,
  Home,
  Compass,
  Settings,
  Cloud,
  Menu,
  X,
  Activity,
  ScrollText,
  Camera,
  Megaphone,
} from "lucide-react"
import { getAnnouncements } from "@/lib/announcements" // Import announcements

interface ServerStatus {
  online: boolean
  version?: string
  players?: {
    online: number
    max: number
    list?: string[]
  }
  software?: string
  motd?: {
    clean: string[]
  }
}

type CurrentView = "home" | "status" | "players" | "rules" | "screenshots" | "announcements"

export default function ConcordSMPLanding() {
  const [serverStatus, setServerStatus] = useState<ServerStatus | null>(null)
  const [copied, setCopied] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [currentView, setCurrentView] = useState<CurrentView>("home")
  const serverIP = "concord.my.pebble.host"
  const announcements = getAnnouncements() // Get sorted announcements
  const latestAnnouncement = announcements.length > 0 ? announcements[0] : null // Get the very latest

  useEffect(() => {
    const fetchServerStatus = async () => {
      try {
        const response = await fetch(`/api/server-status?address=${serverIP}`)
        const data = await response.json()
        setServerStatus(data)
      } catch (error) {
        console.error("Failed to fetch server status:", error)
      }
    }

    fetchServerStatus()
    const interval = setInterval(fetchServerStatus, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const copyServerIP = async () => {
    try {
      await navigator.clipboard.writeText(serverIP)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  const getVersionInfo = () => {
    if (serverStatus?.version) {
      return serverStatus.version
    }
    return "1.21.7"
  }

  const getSoftwareInfo = () => {
    if (serverStatus?.software) {
      return serverStatus.software
    }
    return "Paper"
  }

  const handleMenuClick = (view: CurrentView) => {
    setCurrentView(view)
    setMenuOpen(false)
  }

  const renderHomePage = () => (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-300/80 via-indigo-300/80 to-purple-300/80">
        <div className="absolute inset-0 bg-white/30 backdrop-blur-sm"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-center space-y-6">
            <div className="space-y-3">
              <div className="flex justify-center mb-4">
                <Cloud className="w-16 h-16 text-blue-400/70" />
              </div>
              <h1 className="text-4xl sm:text-6xl font-light tracking-wide text-slate-700">Concord SMP</h1>
              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-light">
                A peaceful Minecraft community where creativity flows freely
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-5 py-2 shadow-sm">
                <Server className="w-4 h-4 text-slate-500" />
                <span className="font-mono text-slate-700">{serverIP}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyServerIP}
                  className="text-slate-500 hover:bg-white/50 p-1 h-auto rounded-full"
                >
                  {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>

              {serverStatus && (
                <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-5 py-2 shadow-sm">
                  <div
                    className={`w-2 h-2 rounded-full ${serverStatus.online ? "bg-emerald-400" : "bg-rose-400"}`}
                  ></div>
                  <span className="text-slate-700 text-sm">
                    {serverStatus.online ? "online" : "offline"}
                    {serverStatus.players && ` • ${serverStatus.players.online} playing`}
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="secondary" className="bg-white/50 text-slate-600 border-white/30 rounded-full px-3 py-1">
                {getSoftwareInfo()} {getVersionInfo()}
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

      {/* Features Section */}
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
          </div>
        </div>
      </section>

      {/* Latest Announcement Section */}
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

      {/* How to Join Section */}
      <section className="py-16 px-4">
        {" "}
        {/* Removed bg-white/40 backdrop-blur-sm to avoid double background */}
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
                    <div className="flex items-center gap-2">
                      <code className="bg-slate-100 px-3 py-2 rounded-lg font-mono text-sm text-slate-600">
                        {serverIP}
                      </code>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={copyServerIP}
                        className="rounded-lg border-slate-200 bg-transparent"
                      >
                        {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
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
          </div>
        </div>
      </section>
    </>
  )

  const renderServerStatus = () => (
    <section className="py-16 px-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light text-slate-700 mb-3">server status</h2>
          <p className="text-lg text-slate-500 font-light">real-time information about concord smp</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-medium text-slate-700">
                <Server className="w-5 h-5 text-slate-400" />
                technical info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-light">server ip</span>
                <code className="font-mono text-sm text-slate-600">{serverIP}</code>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-light">version</span>
                <span className="text-slate-600">
                  {getSoftwareInfo()} {getVersionInfo()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-light">status</span>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${serverStatus?.online ? "bg-emerald-400" : "bg-rose-400"}`}
                  ></div>
                  <span className="text-slate-600">{serverStatus?.online ? "online" : "offline"}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-light">players</span>
                <span className="text-slate-600">
                  {serverStatus?.players ? `${serverStatus.players.online}/${serverStatus.players.max}` : "0/0"}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-medium text-slate-700">
                <Activity className="w-5 h-5 text-slate-400" />
                server details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-light">updates</span>
                <span className="text-slate-600">always latest</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-light">clients</span>
                <span className="text-slate-600">all supported</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-light">anticheat</span>
                <span className="text-slate-600">none</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-light">permissions</span>
                <span className="text-slate-600">owner approval</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {serverStatus?.motd && (
          <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-sm rounded-2xl mt-6">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-slate-700">message of the day</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-100 p-4 rounded-lg">
                {serverStatus.motd.clean?.map((line, index) => (
                  <div key={index} className="text-sm text-slate-600">
                    {line || "\u00A0"}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  )

  const renderActivePlayers = () => (
    <section className="py-16 px-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light text-slate-700 mb-3">active players</h2>
          <p className="text-lg text-slate-500 font-light">who's currently online</p>
        </div>

        <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-sm rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-medium text-slate-700">
              <Users className="w-5 h-5 text-slate-400" />
              online now ({serverStatus?.players?.online || 0}/{serverStatus?.players?.max || 0})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {serverStatus?.online ? (
              serverStatus.players?.list && serverStatus.players.list.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {serverStatus.players.list.map((player, index) => (
                    <div key={index} className="flex items-center gap-3 bg-white/50 backdrop-blur-sm rounded-lg p-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-400 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm font-medium">{player.charAt(0).toUpperCase()}</span>
                      </div>
                      <span className="text-slate-700 font-medium">{player}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500 font-light">no players currently online</p>
                  <p className="text-slate-400 text-sm mt-1">or player list is not visible</p>
                </div>
              )
            ) : (
              <div className="text-center py-8">
                <Server className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 font-light">server is currently offline</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )

  const renderRulesPage = () => (
    <section className="py-16 px-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light text-slate-700 mb-3">server rules</h2>
          <p className="text-lg text-slate-500 font-light">keeping concord smp chill and fair</p>
        </div>

        <div className="space-y-6">
          <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-sm rounded-2xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-200 text-blue-600 rounded-full flex items-center justify-center font-medium text-sm">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-slate-700 mb-2">no griefing (unless at war)</h3>
                  <p className="text-slate-500 font-light">
                    do not grief spawn. do not grief other players' builds unless you are officially at war with them.
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
                  <h3 className="text-lg font-medium text-slate-700 mb-2">no stealing (unless at war)</h3>
                  <p className="text-slate-500 font-light">
                    do not steal items from other players unless you are officially at war with them.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-sm rounded-2xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-teal-200 text-teal-600 rounded-full flex items-center justify-center font-medium text-sm">
                  6
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

  const renderScreenshotsPage = () => (
    <section className="py-16 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light text-slate-700 mb-3">server screenshots</h2>
          <p className="text-lg text-slate-500 font-light">moments from our peaceful world</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-sm rounded-2xl overflow-hidden">
            <Image
              src="/images/screenshot-1.png" // Corrected path
              alt="Minecraft interior with sunset view and campfire"
              width={600}
              height={400}
              className="w-full h-auto object-cover rounded-t-2xl"
            />
          </Card>

          <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-sm rounded-2xl overflow-hidden">
            <Image
              src="/images/screenshot-2.jpeg" // Corrected path
              alt="Aerial view of Minecraft coastline with clear water"
              width={600}
              height={400}
              className="w-full h-auto object-cover rounded-t-2xl"
            />
          </Card>

          <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-sm rounded-2xl overflow-hidden">
            <Image
              src="/images/screenshot-3.png" // Corrected path
              alt="Minecraft player in golden armor in a cozy room"
              width={600}
              height={400}
              className="w-full h-auto object-cover rounded-t-2xl"
            />
          </Card>

          <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-sm rounded-2xl overflow-hidden">
            <Image
              src="/images/screenshot-4.png" // Corrected path
              alt="Nighttime Minecraft landscape with glowing purple structure"
              width={600}
              height={400}
              className="w-full h-auto object-cover rounded-t-2xl"
            />
          </Card>
        </div>
      </div>
    </section>
  )

  const renderAnnouncementsPage = () => (
    <section className="py-16 px-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light text-slate-700 mb-3">latest announcements</h2>
          <p className="text-lg text-slate-500 font-light">stay up-to-date with concord smp news</p>
        </div>

        <div className="space-y-6">
          {announcements.length > 0 ? (
            announcements.map((announcement) => (
              <Card
                key={announcement.id}
                className="border-0 bg-white/70 backdrop-blur-sm shadow-sm rounded-2xl overflow-hidden"
              >
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
            ))
          ) : (
            <div className="text-center py-8">
              <Megaphone className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 font-light">no announcements yet</p>
              <p className="text-slate-400 text-sm mt-1">check back soon for updates!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="fixed top-4 right-4 z-50">
        <div className="relative">
          <Button
            onClick={() => setMenuOpen(!menuOpen)}
            className="bg-white/80 backdrop-blur-sm text-slate-700 hover:bg-white/90 rounded-full p-3 shadow-lg border-0"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>

          {menuOpen && (
            <div className="absolute top-full right-0 mt-2 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border-0 overflow-hidden min-w-48">
              <button
                onClick={() => handleMenuClick("home")}
                className={`w-full text-left px-4 py-3 hover:bg-white/50 transition-colors flex items-center gap-2 ${
                  currentView === "home" ? "bg-white/50" : ""
                }`}
              >
                <Home className="w-4 h-4" />
                <span className="text-slate-700 font-medium">homepage</span>
              </button>
              <button
                onClick={() => handleMenuClick("status")}
                className={`w-full text-left px-4 py-3 hover:bg-white/50 transition-colors flex items-center gap-2 ${
                  currentView === "status" ? "bg-white/50" : ""
                }`}
              >
                <Server className="w-4 h-4" />
                <span className="text-slate-700 font-medium">server status</span>
              </button>
              <button
                onClick={() => handleMenuClick("players")}
                className={`w-full text-left px-4 py-3 hover:bg-white/50 transition-colors flex items-center gap-2 ${
                  currentView === "players" ? "bg-white/50" : ""
                }`}
              >
                <Users className="w-4 h-4" />
                <span className="text-slate-700 font-medium">active players</span>
              </button>
              <button
                onClick={() => handleMenuClick("rules")}
                className={`w-full text-left px-4 py-3 hover:bg-white/50 transition-colors flex items-center gap-2 ${
                  currentView === "rules" ? "bg-white/50" : ""
                }`}
              >
                <ScrollText className="w-4 h-4" />
                <span className="text-slate-700 font-medium">server rules</span>
              </button>
              <button
                onClick={() => handleMenuClick("screenshots")}
                className={`w-full text-left px-4 py-3 hover:bg-white/50 transition-colors flex items-center gap-2 ${
                  currentView === "screenshots" ? "bg-white/50" : ""
                }`}
              >
                <Camera className="w-4 h-4" />
                <span className="text-slate-700 font-medium">screenshots</span>
              </button>
              <button
                onClick={() => handleMenuClick("announcements")}
                className={`w-full text-left px-4 py-3 hover:bg-white/50 transition-colors flex items-center gap-2 ${
                  currentView === "announcements" ? "bg-white/50" : ""
                }`}
              >
                <Megaphone className="w-4 h-4" />
                <span className="text-slate-700 font-medium">announcements</span>
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Content */}
      {currentView === "home" && renderHomePage()}
      {currentView === "status" && renderServerStatus()}
      {currentView === "players" && renderActivePlayers()}
      {currentView === "rules" && renderRulesPage()}
      {currentView === "screenshots" && renderScreenshotsPage()}
      {currentView === "announcements" && renderAnnouncementsPage()}

      {/* Footer */}
      <footer className="bg-slate-100/50 backdrop-blur-sm py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <h3 className="text-xl font-light text-slate-700 mb-2">ready to join us?</h3>
            <div className="flex items-center justify-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-6 py-3 inline-flex shadow-sm">
              <Server className="w-4 h-4 text-slate-400" />
              <span className="font-mono text-slate-700">{serverIP}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={copyServerIP}
                className="text-slate-400 hover:bg-white/50 p-1 h-auto ml-2 rounded-full"
              >
                {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          <div className="text-slate-400 text-sm font-light">
            <p>concord smp</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
