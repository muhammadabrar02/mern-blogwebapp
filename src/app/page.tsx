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
    <main className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-6 text-center">
        <h1 className="text-5xl font-extrabold mb-4">Welcome to My Blog</h1>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Discover the latest posts, tutorials, and tech insights written with passion.
        </p>
        <Link
          href="/create-post"
          className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-gray-100 transition"
        >
          + Create a Post
        </Link>
      </section>

      {/* Categories */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-6">Popular Categories</h2>
        <div className="flex flex-wrap gap-4">
          {['Web Development', 'React', 'Next.js', 'Design', 'Career Tips'].map((cat) => (
            <span
              key={cat}
              className="bg-white border border-gray-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-50 transition"
            >
              #{cat}
            </span>
          ))}
        </div>
      </section>

      {/* Latest Posts */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">📝 Latest Posts</h2>
        </div>

        {loading && (
          <p className="text-center text-gray-500 animate-pulse">Loading posts...</p>
        )}

        {!loading && posts.length === 0 && (
          <p className="text-center text-gray-500">No posts available yet.</p>
        )}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {!loading &&
            posts.map((post) => (
              <div
                key={post._id}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-400 mb-3">
                  {new Date(post.createdAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p className="text-gray-700 mb-4 line-clamp-3">{post.content}</p>
                <Link
                  href={`/post/${post.slug}`}
                  className="text-blue-600 font-medium hover:underline"
                >
                  Read More →
                </Link>
              </div>
            ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-white py-14 px-6 border-t border-gray-200">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-2">Stay Updated</h2>
          <p className="text-gray-500 mb-6">Join our newsletter to receive the latest blog posts and updates.</p>
          <form className="flex flex-col sm:flex-row items-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-500 py-6 border-t border-gray-200 mt-10 text-sm">
        © {new Date().getFullYear()} My Blog. All rights reserved.
      </footer>
    </main>
  )
}
