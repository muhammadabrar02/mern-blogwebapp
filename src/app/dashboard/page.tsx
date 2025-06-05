'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Post {
  _id: string
  title: string
  slug: string
  content: string
  createdAt: string
}

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/posts')
        const data = await res.json()
        setPosts(data)
      } catch (err) {
        console.error('Error fetching posts:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          📚 Latest Blog Posts
        </h1>
        <Link
          href="/create-post"
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition duration-300 font-medium"
        >
          + Create Post
        </Link>
      </div>

      {loading && (
        <p className="text-center text-gray-500 text-lg animate-pulse">
          Fetching awesome posts...
        </p>
      )}

      {!loading && posts.length === 0 && (
        <p className="text-center text-gray-500 text-lg">
          No posts found. Start by creating one!
        </p>
      )}

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {!loading &&
          posts.map((post) => (
            <div
              key={post._id}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition duration-300 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-400 mb-3">
                  {new Date(post.createdAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p className="text-gray-700 mb-4 line-clamp-4">
                  {post.content}
                </p>
              </div>
              <Link
                href={`/post/${post.slug}`}
                className="mt-auto text-blue-600 hover:text-blue-800 font-semibold transition-colors"
              >
                Read More →
              </Link>
            </div>
          ))}
      </section>
    </main>
  )
}
