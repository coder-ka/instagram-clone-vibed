'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { PostCard } from '@/components/post-card'
import Link from 'next/link'

interface Post {
  id: string
  imageUrl: string
  caption: string
  createdAt: string
  user: {
    id: string
    email: string
    name: string | null
    avatar: string | null
  }
  _count: {
    likes: number
    comments: number
  }
}

export default function Home() {
  const { data: session, status } = useSession()
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts')
        if (response.ok) {
          const data = await response.json()
          setPosts(data)
        }
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (status === 'loading' || isLoading) {
    return (
      <div className="max-w-md mx-auto pt-8">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return (
      <div className="max-w-md mx-auto pt-8">
        <h1 className="text-2xl font-bold text-center mb-8">Instagram Clone</h1>
        <div className="text-center text-gray-500">
          <p>Welcome to Instagram Clone</p>
          <p className="mt-2">
            <Link href="/login" className="text-blue-600 hover:text-blue-500">
              Sign in
            </Link>{' '}
            to see posts from people you follow.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto pt-4">
      {posts.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          <p>No posts yet!</p>
          <p className="mt-2">
            <Link href="/create" className="text-blue-600 hover:text-blue-500">
              Create your first post
            </Link>
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
