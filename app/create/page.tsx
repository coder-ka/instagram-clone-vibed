'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Upload, X } from 'lucide-react'

export default function CreatePostPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [caption, setCaption] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!image || !session?.user) return

    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append('image', image)
      formData.append('caption', caption)

      const response = await fetch('/api/posts', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        router.push('/')
      } else {
        console.error('Failed to create post')
      }
    } catch (error) {
      console.error('Error creating post:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const removeImage = () => {
    setImage(null)
    setImagePreview('')
  }

  if (!session) {
    router.push('/login')
    return null
  }

  return (
    <div className="max-w-lg mx-auto pt-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          {!imagePreview ? (
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-12 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <label htmlFor="image" className="cursor-pointer">
                <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  Upload a photo
                </span>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          ) : (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full aspect-square object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 p-1 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-75"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        <div>
          <label htmlFor="caption" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Caption
          </label>
          <textarea
            id="caption"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={!image || isLoading}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Sharing...' : 'Share Post'}
        </button>
      </form>
    </div>
  )
}