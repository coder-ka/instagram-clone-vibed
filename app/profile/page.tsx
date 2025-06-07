'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Settings, Grid } from 'lucide-react'

interface UserProfile {
  id: string
  email: string
  name: string | null
  bio: string | null
  avatar: string | null
  _count: {
    posts: number
    followers: number
    following: number
  }
  posts: Array<{
    id: string
    imageUrl: string
  }>
}

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
      return
    }

    if (status === 'authenticated' && session?.user?.email) {
      fetchProfile()
    }
  }, [status, session, router])

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/profile')
      if (response.ok) {
        const data = await response.json()
        setProfile(data)
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="max-w-md mx-auto pt-8">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="max-w-md mx-auto pt-8">
        <div className="text-center text-red-500">Profile not found</div>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto pt-4">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
              {profile.avatar ? (
                <Image
                  src={profile.avatar}
                  alt={profile.email}
                  width={80}
                  height={80}
                  className="rounded-full"
                />
              ) : (
                <span className="text-2xl font-bold text-gray-600 dark:text-gray-300">
                  {profile.email[0].toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {profile.name || profile.email.split('@')[0]}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {profile.email}
              </p>
            </div>
          </div>
          <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
            <Settings className="h-6 w-6" />
          </button>
        </div>

        {profile.bio && (
          <p className="text-gray-900 dark:text-white mb-4">{profile.bio}</p>
        )}

        <div className="flex justify-around py-4 border-y border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="font-bold text-lg text-gray-900 dark:text-white">
              {profile._count.posts}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Posts</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-lg text-gray-900 dark:text-white">
              {profile._count.followers}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Followers</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-lg text-gray-900 dark:text-white">
              {profile._count.following}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Following</div>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-center mb-4">
            <Grid className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </div>
          
          {profile.posts.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              <p>No posts yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-1">
              {profile.posts.map((post) => (
                <div key={post.id} className="aspect-square relative">
                  <Image
                    src={post.imageUrl}
                    alt="Post"
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}