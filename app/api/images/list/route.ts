import { list } from '@vercel/blob'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { blobs } = await list({
      prefix: 'yilbasi-',
    })

    const images = blobs
      .map((blob) => ({
        id: blob.pathname,
        url: blob.url,
        uploadedAt: blob.uploadedAt ? blob.uploadedAt.getTime() : Date.now(),
      }))
      .sort((a, b) => b.uploadedAt - a.uploadedAt) // Newest first

    return NextResponse.json(images)
  } catch (error) {
    console.error('List error:', error)
    return NextResponse.json(
      { error: 'Failed to list images' },
      { status: 500 }
    )
  }
}

