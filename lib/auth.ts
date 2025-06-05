import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export function verifyToken(token: string): string | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    return decoded.id;
  } catch (err) {
    return null;
  }
}

export function signToken(id: string) {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '7d' });
}




// import jwt from 'jsonwebtoken';

// const JWT_SECRET = process.env.JWT_SECRET || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODMzNjc3NDU3YmMzMTAyZjc5ZjljNWUiLCJlbWFpbCI6ImJpbGFsQGV4YW1wbGUuY29tIiwiaWF0IjoxNzQ4NTQ5Nzk2LCJleHAiOjE3NDg1NTMzOTZ9.lTHu1Xmhyifruk6nfxgM75WNRK3a1H5esETtsk7xkZc';

// export function verifyToken(token: string): string | null {
//   try {
//     const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
//     return decoded.id;
//   } catch (err) {
//     return null;
//   }
// }
