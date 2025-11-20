import { NextRequest, NextResponse } from 'next/server'
import {
  getTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '@/lib/data'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const testimonial = getTestimonial(id)
    
    if (!testimonial) {
      return NextResponse.json(
        { success: false, error: 'Testimonial not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true, data: testimonial })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch testimonial' },
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
    const updated = updateTestimonial(id, body)
    
    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Testimonial not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true, data: updated })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update testimonial' },
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
    const deleted = deleteTestimonial(id)
    
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Testimonial not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete testimonial' },
      { status: 500 }
    )
  }
}

