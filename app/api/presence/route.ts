import { NextRequest } from 'next/server'

// In-memory store for online users (for demo purposes)
// In production, use Redis or a database
interface OnlineUser {
  username: string
  lastSeen: number
}

let onlineUsers: OnlineUser[] = []

// Clean up inactive users (older than 10 seconds)
function cleanupInactiveUsers() {
  const now = Date.now()
  onlineUsers = onlineUsers.filter(u => now - u.lastSeen < 10000)
}

// GET: Get current online users
export async function GET(request: NextRequest) {
  cleanupInactiveUsers()
  
  return new Response(JSON.stringify(onlineUsers), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    },
  })
}

// POST: Update user presence
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username } = body
    
    if (!username) {
      return new Response(JSON.stringify({ error: 'Username required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }
    
    cleanupInactiveUsers()
    
    const now = Date.now()
    const userIndex = onlineUsers.findIndex(u => u.username === username)
    
    if (userIndex >= 0) {
      onlineUsers[userIndex].lastSeen = now
    } else {
      onlineUsers.push({ username, lastSeen: now })
    }
    
    cleanupInactiveUsers()
    
    return new Response(JSON.stringify({ success: true, users: onlineUsers }), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Invalid request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

// DELETE: Remove user
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const username = searchParams.get('username')
    
    if (!username) {
      return new Response(JSON.stringify({ error: 'Username required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }
    
    onlineUsers = onlineUsers.filter(u => u.username !== username)
    
    return new Response(JSON.stringify({ success: true, users: onlineUsers }), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Invalid request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

