'use client'

export default function ActivityPage() {
  return (
    <div className="max-w-md mx-auto pt-4">
      <div className="p-4">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Activity
        </h1>
        
        <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
          <p>No recent activity</p>
          <p className="mt-2 text-sm">
            When people like and comment on your posts, you'll see it here.
          </p>
        </div>
      </div>
    </div>
  )
}