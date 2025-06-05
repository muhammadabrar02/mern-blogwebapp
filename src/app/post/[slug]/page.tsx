'use client'

import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import ConfirmModal from '../../../../components/ConfirmModal'

interface Post {
  _id: string
  title: string
  content: string
  createdAt: string
  slug: string
}

export default function PostPage() {
  const { slug } = useParams() as { slug: string } // ✅ fix the type here
  const router = useRouter()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch('/api/posts') // ✅ Make sure this returns all posts or support a `slug` param
        const posts: Post[] = await res.json()
        const found = posts.find((p) => p.slug === slug)
        if (found) {
          setPost(found)
        }
      } catch (error) {
        console.error('Failed to fetch post', error)
      } finally {
        setLoading(false)
      }
    }

    if (slug) fetchPost()
  }, [slug])


  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/posts/${post?.slug}`, { method: 'DELETE' })

      if (!res.ok) {
        throw new Error('Failed to delete post')
      }

      alert('Post deleted successfully')
      router.push('/posts')
    } catch (error) {
      console.error(error)
      alert('Failed to delete post')
    }
  }

  if (loading || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        <p>Loading post...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-6 py-12">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8 space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">{post.title}</h1>

        <p className="text-sm text-gray-500">
          📅 Published on {new Date(post.createdAt).toLocaleDateString()}
        </p>

        <hr className="border-t border-gray-200" />

        <div className="prose prose-lg prose-gray max-w-none text-gray-800">
          <p>{post.content}</p>
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-6">
          <Link href={`/post/${post.slug}/edit`}>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg shadow-md transition">
              ✏️ Edit Post
            </button>
          </Link>

          <button
            onClick={() => setModalOpen(true)}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg shadow-md transition"
          >
            🗑️ Delete Post
          </button>
        </div>
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Post"
        message="Are you sure you want to delete this post? This action cannot be undone."
      />
    </div>
  )
}
