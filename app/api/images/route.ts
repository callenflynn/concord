// app/api/images/route.ts
import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const imagesDirectory = path.join(process.cwd(), 'public/images')
    
    // Check if directory exists
    if (!fs.existsSync(imagesDirectory)) {
      console.log('Images directory not found:', imagesDirectory)
      return NextResponse.json([])
    }
    
    // Read all files in the images directory
    const filenames = fs.readdirSync(imagesDirectory)
    
    // Filter for image files and create full paths
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp']
    const imagePaths = filenames
      .filter(name => {
        const ext = path.extname(name).toLowerCase()
        return imageExtensions.includes(ext)
      })
      .map(name => `/images/${name}`)
    
    console.log(`Found ${imagePaths.length} images to serve:`, imagePaths)
    return NextResponse.json(imagePaths)
  } catch (error) {
    console.error('Error reading images directory:', error)
    return NextResponse.json([])
  }
}
