import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const address = searchParams.get("address")

  if (!address) {
    return NextResponse.json({ error: "Server address is required" }, { status: 400 })
  }

  try {
    const apiUrl = `https://api.mcsrvstat.us/3/${encodeURIComponent(address)}`

    const response = await fetch(apiUrl, {
      headers: {
        "User-Agent": "Concord SMP Landing Page",
      },
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`)
    }

    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching server status:", error)
    return NextResponse.json({ error: "Failed to fetch server status" }, { status: 500 })
  }
}
