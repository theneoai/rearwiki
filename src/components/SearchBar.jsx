import { useState } from 'preact/hooks'

export function SearchBar({ onSearch, placeholder = "搜索..." }) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch?.(query)
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 pr-12 rounded-2xl border border-gray-200 
                   focus:border-primary focus:ring-2 focus:ring-primary/20 
                   outline-none transition-all"
      />
      <button
        type="submit"
        className="absolute right-3 top-1/2 -translate-y-1/2 
                   text-gray-400 hover:text-primary transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </form>
  )
}
