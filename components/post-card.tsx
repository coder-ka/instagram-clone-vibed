'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Heart, MessageCircle, Share, Bookmark } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface PostCardProps {
  post: {
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
}

export function PostCard({ post }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(post._count.likes)

  const handleLike = async () => {
    try {
      const response = await fetch(`/api/posts/${post.id}/like`, {
        method: 'POST',
      })

      if (response.ok) {
        setIsLiked(!isLiked)
        setLikesCount(prev => isLiked ? prev - 1 : prev + 1)
      }
    } catch (error) {
      console.error('Error liking post:', error)
    }
  }

  return (
    <article className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
      <div className="flex items-center p-4">
        <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center mr-3">
          {post.user.avatar ? (
            <Image
              src={post.user.avatar}
              alt={post.user.email}
              width={32}
              height={32}
              className="rounded-full"
            />
          ) : (
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {post.user.email[0].toUpperCase()}
            </span>
          )}
        </div>
        <div>
          <h3 className="font-semibold text-sm text-gray-900 dark:text-white">
            {post.user.name || post.user.email.split('@')[0]}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {post.user.email}
          </p>
        </div>
      </div>

      <div className="relative aspect-square">
        <Image
          src={post.imageUrl}
          alt={post.caption || 'Post image'}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className={`transition-colors ${
                isLiked ? 'text-red-500' : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Heart className={`h-6 w-6 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            <button className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              <MessageCircle className="h-6 w-6" />
            </button>
            <button className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              <Share className="h-6 w-6" />
            </button>
          </div>
          <button className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            <Bookmark className="h-6 w-6" />
          </button>
        </div>

        {likesCount > 0 && (
          <p className="font-semibold text-sm text-gray-900 dark:text-white mb-2">
            {likesCount} {likesCount === 1 ? 'like' : 'likes'}
          </p>
        )}

        {post.caption && (
          <div className="mb-2">
            <span className="font-semibold text-sm text-gray-900 dark:text-white mr-2">
              {post.user.name || post.user.email.split('@')[0]}
            </span>
            <span className="text-sm text-gray-900 dark:text-white">
              {post.caption}
            </span>
          </div>
        )}

        {post._count.comments > 0 && (
          <button className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            View all {post._count.comments} comments
          </button>
        )}

        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">
          {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
        </p>
      </div>
    </article>
  )
}