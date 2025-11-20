import { NextRequest, NextResponse } from 'next/server'
import {
  getPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
} from '@/lib/data'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const item = getPortfolioItem(id)
    
    if (!item) {
      return NextResponse.json(
        { success: false, error: 'Portfolio item not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true, data: item })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch portfolio item' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const body = await request.json()
    const updated = updatePortfolioItem(id, body)
    
    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Portfolio item not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true, data: updated })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update portfolio item' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const deleted = deletePortfolioItem(id)
    
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Portfolio item not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete portfolio item' },
      { status: 500 }
    )
  }
}

