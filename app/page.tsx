'use client'

import { useState, useEffect } from "react"
import Image from "next/image"
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
import { getAnnouncements } from "@/lib/announcements"

import concordLogo from './image.jpeg'

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
  const announcements = getAnnouncements()
  const latestAnnouncement = announcements.length > 0 ? announcements[0] : null

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
    const interval = setInterval(fetchServerStatus, 30000)

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
    return "1.21.7" // Default version if not fetched
  }

  const getSoftwareInfo = () => {
    if (serverStatus?.software) {
      return serverStatus.software
    }
    return "Paper" // Default software if not fetched
  }

  const handleMenuClick = (view: CurrentView) => {
    setCurrentView(view)
    setMenuOpen(false)
  }

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
                    do not grief spawn. do not grief other players' builds unless you both agreed you are at war.
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
                    do not steal items from other players unless you both agreed you are at war.
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

  const renderScreenshotsPage = () => (
    <section className="py-16 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light text-slate-700 mb-3">server screenshots</h2>
          <p className="text-lg text-slate-500 font-light">moments from our world</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-sm rounded-2xl overflow-hidden">
            <Image
              src="/images/screenshot-1.png"
              alt="Minecraft interior with sunset view and campfire"
              width={600}
              height={400}
              className="w-full h-auto object-cover rounded-t-2xl"
            />
          </Card>

          <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-sm rounded-2xl overflow-hidden">
            <Image
              src="/images/screenshot-2.jpeg"
              alt="Aerial view of Minecraft coastline with clear water"
              width={600}
              height={400}
              className="w-full h-auto object-cover rounded-t-2xl"
            />
          </Card>

          <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-sm rounded-2xl overflow-hidden">
            <Image
              src="/images/screenshot-3.png"
              alt="Minecraft player in golden armor in a cozy room"
              width={600}
              height={400}
              className="w-full h-auto object-cover rounded-t-2xl"
            />
          </Card>

          <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-sm rounded-2xl overflow-hidden">
            <Image
              src="/images/screenshot-4.png"
              alt="Nighttime Minecraft landscape with glowing purple structure"
              width={600}
              height={400}
              className="w-full h-auto object-cover rounded-t-2xl"
            />
          </Card>

                    <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-sm rounded-2xl overflow-hidden">
            <Image
              src="/images/screenshot-5.png"
              alt="A view of spawn without shaders (July 13, 2025)"
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 text-slate-800">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-lg shadow-sm">
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
              <span className="text-xl font-semibold text-slate-800">Concord SMP</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6">
              <Button
                variant="ghost"
                onClick={() => handleMenuClick("home")}
                className={`text-slate-600 hover:text-slate-900 ${currentView === "home" ? "font-bold text-slate-900" : ""}`}
              >
                <Home className="w-4 h-4 mr-2" /> Home
              </Button>
              <Button
                variant="ghost"
                onClick={() => handleMenuClick("status")}
                className={`text-slate-600 hover:text-slate-900 ${currentView === "status" ? "font-bold text-slate-900" : ""}`}
              >
                <Cloud className="w-4 h-4 mr-2" /> Status
              </Button>
              <Button
                variant="ghost"
                onClick={() => handleMenuClick("players")}
                className={`text-slate-600 hover:text-slate-900 ${currentView === "players" ? "font-bold text-slate-900" : ""}`}
              >
                <Users className="w-4 h-4 mr-2" /> Players
              </Button>
              <Button
                variant="ghost"
                onClick={() => handleMenuClick("rules")}
                className={`text-slate-600 hover:text-slate-900 ${currentView === "rules" ? "font-bold text-slate-900" : ""}`}
              >
                <ScrollText className="w-4 h-4 mr-2" /> Rules
              </Button>
              <Button
                variant="ghost"
                onClick={() => handleMenuClick("screenshots")}
                className={`text-slate-600 hover:text-slate-900 ${currentView === "screenshots" ? "font-bold text-slate-900" : ""}`}
              >
                <Camera className="w-4 h-4 mr-2" /> Screenshots
              </Button>
              <Button
                variant="ghost"
                onClick={() => handleMenuClick("announcements")}
                className={`text-slate-600 hover:text-slate-900 ${currentView === "announcements" ? "font-bold text-slate-900" : ""}`}
              >
                <Megaphone className="w-4 h-4 mr-2" /> Announcements
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="-mr-2 flex md:hidden">
              <Button
                variant="ghost"
                onClick={() => setMenuOpen(!menuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
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
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Button
                variant="ghost"
                onClick={() => handleMenuClick("home")}
                className={`w-full justify-start text-slate-700 hover:bg-slate-100 ${currentView === "home" ? "font-bold bg-slate-100" : ""}`}
              >
                <Home className="w-4 h-4 mr-2" /> Home
              </Button>
              <Button
                variant="ghost"
                onClick={() => handleMenuClick("status")}
                className={`w-full justify-start text-slate-700 hover:bg-slate-100 ${currentView === "status" ? "font-bold bg-slate-100" : ""}`}
              >
                <Cloud className="w-4 h-4 mr-2" /> Status
              </Button>
              <Button
                variant="ghost"
                onClick={() => handleMenuClick("players")}
                className={`w-full justify-start text-slate-700 hover:bg-slate-100 ${currentView === "players" ? "font-bold bg-slate-100" : ""}`}
              >
                <Users className="w-4 h-4 mr-2" /> Players
              </Button>
              <Button
                variant="ghost"
                onClick={() => handleMenuClick("rules")}
                className={`w-full justify-start text-slate-700 hover:bg-slate-100 ${currentView === "rules" ? "font-bold bg-slate-100" : ""}`}
              >
                <ScrollText className="w-4 h-4 mr-2" /> Rules
              </Button>
              <Button
                variant="ghost"
                onClick={() => handleMenuClick("screenshots")}
                className={`w-full justify-start text-slate-700 hover:bg-slate-100 ${currentView === "screenshots" ? "font-bold bg-slate-100" : ""}`}
              >
                <Camera className="w-4 h-4 mr-2" /> Screenshots
              </Button>
              <Button
                variant="ghost"
                onClick={() => handleMenuClick("announcements")}
                className={`w-full justify-start text-slate-700 hover:bg-slate-100 ${currentView === "announcements" ? "font-bold bg-slate-100" : ""}`}
              >
                <Megaphone className="w-4 h-4 mr-2" /> Announcements
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content based on currentView */}
      <main className="pt-16"> {/* Add padding-top to account for fixed navbar */}
        {(() => {
          switch (currentView) {
            case "home":
              return renderHomePage()
            case "status":
              return renderServerStatus()
            case "players":
              return renderActivePlayers()
            case "rules":
              return renderRulesPage()
            case "screenshots":
              return renderScreenshotsPage()
            case "announcements":
              return renderAnnouncementsPage()
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
    <p className="text-lg font-mono text-blue-300">concord.my.pebble.host</p>
  </div>
</footer>
    </div>
  )
}
