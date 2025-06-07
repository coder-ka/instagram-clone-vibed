'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { Home, Search, PlusSquare, Heart, User, LogOut } from 'lucide-react'
import { clsx } from 'clsx'

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Search', href: '/search', icon: Search },
  { name: 'Create', href: '/create', icon: PlusSquare },
  { name: 'Activity', href: '/activity', icon: Heart },
  { name: 'Profile', href: '/profile', icon: User },
]

export function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session, status } = useSession()

  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push('/login')
  }

  if (pathname === '/login' || pathname === '/register') {
    return null
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 md:top-0 md:bottom-auto md:left-0 md:w-16 lg:w-64 md:h-screen md:border-t-0 md:border-r">
      <div className="flex md:flex-col h-16 md:h-full">
        <div className="hidden md:flex items-center justify-center lg:justify-start lg:px-6 h-16 border-b border-gray-200 dark:border-gray-800">
          <h1 className="text-xl font-bold lg:block hidden">Instagram</h1>
          <h1 className="text-xl font-bold lg:hidden block">IG</h1>
        </div>
        
        <div className="flex md:flex-col flex-1 justify-around md:justify-start md:px-3 md:py-6 md:space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  'flex items-center justify-center lg:justify-start px-3 py-3 rounded-lg transition-colors',
                  isActive
                    ? 'text-black dark:text-white'
                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-100'
                )}
              >
                <item.icon className="h-6 w-6" />
                <span className="ml-3 hidden lg:block">{item.name}</span>
              </Link>
            )
          })}
          
          {session && (
            <button
              onClick={handleLogout}
              className="flex items-center justify-center lg:justify-start px-3 py-3 rounded-lg transition-colors text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 mt-auto"
            >
              <LogOut className="h-6 w-6" />
              <span className="ml-3 hidden lg:block">Logout</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}