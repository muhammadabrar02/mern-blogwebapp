'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { jwtDecode } from "jwt-decode";


export default function CreatePostPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  // const [token, setToken] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const t = localStorage.getItem('token')
    if (t) {
      const decodedToken: any = jwtDecode(t)
      setUserId(decodedToken.userId)
    }
  }, [])


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const generatedSlug = title.toLowerCase().replace(/\s+/g, '-')

    try {
      const currentToken = localStorage.getItem('token')

      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(currentToken && { Authorization: `Bearer ${currentToken}` }),
        },
        body: JSON.stringify({
          title,
          content,
          slug: generatedSlug,
          userId: userId, // Send the userId in the request body
        }),
      })

      const data = await res.json()

      if (res.ok) {
        router.push('/')
      } else {
        alert(data.error || 'Failed to create post')
      }
    } catch (err) {
      alert('An error occurred.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          ✍️ Create a New Blog Post
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              placeholder="Enter post title"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Content</label>
            <textarea
              placeholder="Write your post content here..."
              className="w-full h-40 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition resize-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-md text-white font-semibold transition ${loading
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
              }`}
          >
            {loading ? 'Posting...' : '🚀 Submit Post'}
          </button>
        </form>
      </div>
    </div>
  )
}
