import { NextRequest, NextResponse } from 'next/server'

// In-memory store for draw state
interface DrawState {
  isDrawActive: boolean
  isDrawComplete: boolean
  countdown: number | null
  results: Array<{ giver: string; receiver: string }> | null
  participants: Array<{ id: number; name: string }>
}

let drawState: DrawState = {
  isDrawActive: false,
  isDrawComplete: false,
  countdown: null,
  results: null,
  participants: [
    { id: 1, name: 'kozalak' },
    { id: 2, name: 'volkanbabapro' },
    { id: 3, name: 'pişkinasker' },
    { id: 4, name: 'raniş' },
  ],
}

// Countdown start time
let countdownStartTime: number | null = null

// GET: Get current draw state
export async function GET() {
  // Calculate current countdown based on start time
  if (countdownStartTime && drawState.isDrawActive && !drawState.isDrawComplete) {
    const now = Date.now()
    const elapsed = Math.floor((now - countdownStartTime) / 1000)
    const remaining = Math.max(0, 10 - elapsed)
    
    drawState.countdown = remaining
    
    // If countdown finished but results not set, keep at 0
    if (remaining === 0 && !drawState.isDrawComplete) {
      drawState.countdown = 0
    }
  }

  return NextResponse.json({
    ...drawState,
    countdownStartTime, // Include start time so clients can calculate too
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  })
}

// POST: Update draw state (admin only - you can add auth check here)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, participants, results } = body

    if (action === 'start') {
      // Start countdown
      drawState.isDrawActive = true
      drawState.isDrawComplete = false
      drawState.countdown = 10
      drawState.results = null
      countdownStartTime = Date.now() // Record start time

      return NextResponse.json({
        success: true,
        state: {
          ...drawState,
          countdownStartTime,
        },
      })
    }

    if (action === 'complete' && results) {
      // Set results after countdown
      drawState.results = results
      drawState.isDrawComplete = true
      drawState.isDrawActive = false
      drawState.countdown = 0
      countdownStartTime = null

      return NextResponse.json({
        success: true,
        state: {
          ...drawState,
          countdownStartTime: null,
        },
      })
    }

    if (action === 'reset') {
      // Reset draw
      drawState = {
        isDrawActive: false,
        isDrawComplete: false,
        countdown: null,
        results: null,
        participants: participants || drawState.participants,
      }
      countdownStartTime = null

      return NextResponse.json({
        success: true,
        state: {
          ...drawState,
          countdownStartTime: null,
        },
      })
    }

    if (action === 'updateParticipants' && participants) {
      drawState.participants = participants
      return NextResponse.json({
        success: true,
        state: drawState,
      })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}

