import { useState, useMemo } from 'preact/hooks'
import { useArticles } from '../hooks/useArticles'
import { ArticleCard } from '../components/ArticleCard'

const CATEGORIES = [
  { key: 'all', label: '全部' },
  { key: 'type', label: '痔疮类型' },
  { key: 'prevention', label: '预防方法' },
  { key: 'treatment', label: '治疗方式' },
  { key: 'care', label: '术后护理' }
]

export function KnowledgeList() {
  const { articles, loading, error } = useArticles(100)
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredArticles = useMemo(() => {
    if (selectedCategory === 'all') {
      return articles
    }
    return articles.filter(article => article.category === selectedCategory)
  }, [articles, selectedCategory])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">加载失败: {error}</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-secondary mb-8">健康知识</h1>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === key
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <p className="text-gray-500 mb-4">共 {filteredArticles.length} 篇文章</p>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">该分类下暂无文章</p>
        </div>
      )}
    </div>
  )
}
