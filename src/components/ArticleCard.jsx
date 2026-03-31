import { Link } from 'preact-router'

export function ArticleCard({ article }) {
  const categories = {
    'type': '痔疮类型',
    'prevention': '预防方法',
    'treatment': '治疗方式',
    'care': '术后护理'
  }

  return (
    <Link href={`/knowledge/${article.slug}`} className="card overflow-hidden">
      <div className="p-6">
        <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">
          {categories[article.category] || '科普'}
        </span>
        
        <h3 className="text-lg font-bold text-secondary mt-3 mb-2 line-clamp-2">
          {article.title}
        </h3>
        
        <p className="text-sm text-gray-600 line-clamp-3 mb-4">
          {article.content?.substring(0, 100)}...
        </p>
        
        <div className="flex items-center text-xs text-gray-400">
          <span>👁 {article.views || 0} 阅读</span>
          <span className="mx-2">·</span>
          <span>{new Date(article.created_at).toLocaleDateString('zh-CN')}</span>
        </div>
      </div>
    </Link>
  )
}
