import { NextRequest, NextResponse } from 'next/server'
import { verifyPassword } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    if (verifyPassword(password)) {
      return NextResponse.json({ success: true })
    }

    return NextResponse.json(
      { success: false, error: 'Invalid password' },
      { status: 401 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    )
  }
}

