import { NextRequest, NextResponse } from 'next/server'
import {
  getBlogPosts,
  createBlogPost,
} from '@/lib/data'

export async function GET() {
  try {
    const posts = getBlogPosts()
    return NextResponse.json({ success: true, data: posts })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const newPost = createBlogPost(body)
    return NextResponse.json({ success: true, data: newPost })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create blog post' },
      { status: 500 }
    )
  }
}

