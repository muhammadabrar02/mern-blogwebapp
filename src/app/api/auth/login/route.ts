import dbConnect from '../../../../../lib/dbConnect';
import User from '../../../../../models/User';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  await dbConnect();

  const { email, password } = await req.json();

  console.log('Checking user for email:', email);

  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json({ error: 'User not found. Please sign up first.' }, { status: 404 });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return NextResponse.json({ error: 'Incorrect password. Please try again.' }, { status: 401 });
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });

  return NextResponse.json({
    token,
    user: {
      username: user.username,
      email: user.email,
    },
  }, { status: 200 });
}
