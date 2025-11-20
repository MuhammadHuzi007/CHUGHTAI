import { NextRequest, NextResponse } from 'next/server'
import {
  getTestimonials,
  createTestimonial,
} from '@/lib/data'

export async function GET() {
  try {
    const testimonials = getTestimonials()
    return NextResponse.json({ success: true, data: testimonials })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch testimonials' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const newTestimonial = createTestimonial(body)
    return NextResponse.json({ success: true, data: newTestimonial })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create testimonial' },
      { status: 500 }
    )
  }
}

