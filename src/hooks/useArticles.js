import { useState, useEffect } from 'preact/hooks'
import { supabase } from '../utils/supabaseClient'

export function useArticles(limit = 3) {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchArticles() {
      try {
        const { data, error } = await supabase
          .from('knowledge_articles')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(limit)

        if (error) throw error
        setArticles(data || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [limit])

  return { articles, loading, error }
}
