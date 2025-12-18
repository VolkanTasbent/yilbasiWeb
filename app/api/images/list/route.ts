import { list } from '@vercel/blob'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // List all blobs (no prefix filter to get all images)
    const { blobs } = await list()

    // Filter images that might be from this app (optional: you can remove filter to get all)
    const images = blobs
      .map((blob) => ({
        id: blob.pathname || blob.url,
        url: blob.url,
        uploadedAt: blob.uploadedAt ? blob.uploadedAt.getTime() : Date.now(),
      }))
      .sort((a, b) => b.uploadedAt - a.uploadedAt) // Newest first

    return NextResponse.json(images)
  } catch (error) {
    console.error('List error:', error)
    // Return empty array instead of error so frontend can handle it
    return NextResponse.json([])
  }
}

