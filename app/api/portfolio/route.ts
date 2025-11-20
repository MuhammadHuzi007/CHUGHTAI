import { NextRequest, NextResponse } from 'next/server'
import {
  getPortfolioItems,
  createPortfolioItem,
} from '@/lib/data'

export async function GET() {
  try {
    const items = getPortfolioItems()
    return NextResponse.json({ success: true, data: items })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch portfolio items' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const newItem = createPortfolioItem(body)
    return NextResponse.json({ success: true, data: newItem })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create portfolio item' },
      { status: 500 }
    )
  }
}

