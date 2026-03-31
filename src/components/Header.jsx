import { Link } from 'preact-router'

export function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🍑</span>
            <span className="text-xl font-bold text-secondary">
              痔疮百科
            </span>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link 
              href="/knowledge" 
              className="text-gray-600 hover:text-primary transition-colors"
            >
              科普知识
            </Link>
            <Link 
              href="/hospitals" 
              className="text-gray-600 hover:text-primary transition-colors"
            >
              找医院
            </Link>
            <Link 
              href="/submit" 
              className="btn-primary text-sm py-2"
            >
              提交医院
            </Link>
          </nav>
          
          <button className="md:hidden p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
