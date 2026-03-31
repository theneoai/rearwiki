import { useEffect, useState } from 'preact/hooks'
import { route } from 'preact-router'
import { marked } from 'marked'
import { supabase } from '../utils/supabase'

const CATEGORIES = {
  'type': '痔疮类型',
  'prevention': '预防方法',
  'treatment': '治疗方式',
  'care': '术后护理'
}

export function KnowledgeDetail({ slug }) {
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchArticle() {
      if (!slug) return

      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('knowledge_articles')
          .select('*')
          .eq('slug', slug)
          .single()

        if (error) throw error
        if (!data) {
          route('/knowledge', true)
          return
        }
        setArticle(data)

        // Increment view count
        await supabase
          .from('knowledge_articles')
          .update({ views: (data.views || 0) + 1 })
          .eq('id', data.id)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-24 mb-4"></div>
            <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-8"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-red-50 border border-red-200 rounded-lg p-8 text-center">
            <h2 className="text-xl font-semibold text-red-700 mb-2">加载失败</h2>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  if (!article) {
    return null
  }

  const htmlContent = marked(article.content || '')

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Back Link */}
          <a
            href="/knowledge"
            className="inline-flex items-center text-gray-500 hover:text-primary mb-6 transition-colors"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回列表
          </a>

          {/* Article Card */}
          <article className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-8">
              {/* Category Badge */}
              <span className="inline-block text-xs bg-accent/10 text-accent px-3 py-1 rounded-full mb-4">
                {CATEGORIES[article.category] || '科普'}
              </span>

              {/* Title */}
              <h1 className="text-3xl font-bold text-secondary mb-4">
                {article.title}
              </h1>

              {/* Meta Info */}
              <div className="flex items-center text-sm text-gray-500 mb-8 pb-8 border-b border-gray-100">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {article.views || 0} 阅读
                </span>
                <span className="mx-3">·</span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {new Date(article.created_at).toLocaleDateString('zh-CN')}
                </span>
              </div>

              {/* Content */}
              <div
                className="prose prose-lg max-w-none prose-headings:text-secondary prose-a:text-primary hover:prose-a:text-primary/80"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            </div>
          </article>
        </div>
      </div>
    </div>
  )
}
