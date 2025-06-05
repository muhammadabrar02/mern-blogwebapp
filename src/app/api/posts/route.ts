import dbConnect from '../../../../lib/dbConnect';
import Post from '../../../../models/Post';
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '../../../../lib/auth';





export async function POST(req: NextRequest) {
  await dbConnect();
  const body = await req.json();

  // Destructure all required fields
  const { title, slug, content, userId } = body;

  // Check for missing fields
  if (!title || !slug || !content || !userId) {
    return NextResponse.json({ error: 'Missing required fields: title, slug, content, or userId' }, { status: 400 });
  }

  try {
    // Check if post already exists with the same slug
    const existingPost = await Post.findOne({ slug });
    if (existingPost) {
      return NextResponse.json({ error: 'A post with this slug already exists' }, { status: 400 });
    }

    // Create post with userId
    const post = await Post.create({ title, slug, content, userId });
    return NextResponse.json(post, { status: 201 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: 'Failed to create post', details: err.message },
      { status: 500 }
    );
  }
}


export async function GET() {
  await dbConnect();
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    return NextResponse.json(posts);
  } catch (err : any) {
    console.error(err); // Log the error to console for debugging
    return NextResponse.json({ error: 'Failed to fetch posts', details: err.message }, { status: 500 });
  }
}
