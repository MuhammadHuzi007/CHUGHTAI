import { NextRequest, NextResponse } from 'next/server'
import {
  getSiteSettings,
  updateSiteSettings,
} from '@/lib/data'

export async function GET() {
  try {
    const settings = getSiteSettings()
    return NextResponse.json({ success: true, data: settings })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch settings' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const updated = updateSiteSettings(body)
    return NextResponse.json({ success: true, data: updated })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update settings' },
      { status: 500 }
    )
  }
}

