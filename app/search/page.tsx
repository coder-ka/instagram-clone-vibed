'use client'

import { useState } from 'react'
import { Search as SearchIcon } from 'lucide-react'

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="max-w-md mx-auto pt-4">
      <div className="p-4">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search users, posts..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
        <p>Search functionality coming soon!</p>
      </div>
    </div>
  )
}