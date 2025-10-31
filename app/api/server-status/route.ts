import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Use your Playit tunnel public hostname
    const host = "those-boring.gl.joinmc.link"

    // Call MCServerStatus API server-side
    const apiUrl = `https://api.mcserverstatus.io/v2/status/java/${encodeURIComponent(host)}`

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
    return NextResponse.json({ error: "Could not fetch server status" }, { status: 500 })
  }
}
