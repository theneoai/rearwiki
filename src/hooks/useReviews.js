import { useState, useEffect, useCallback } from 'preact/hooks'
import { supabase } from '../utils/supabase'

export function useReviews(hospitalId) {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const fetchReviews = useCallback(async () => {
    if (!hospitalId) return
    
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('hospital_id', hospitalId)
        .eq('status', 'approved')
        .order('created_at', { ascending: false })

      if (error) throw error
      setReviews(data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [hospitalId])

  useEffect(() => {
    fetchReviews()
  }, [fetchReviews])

  useEffect(() => {
    if (!hospitalId) return

    const subscription = supabase
      .channel(`reviews-${hospitalId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'reviews',
          filter: `hospital_id=eq.${hospitalId}`
        },
        (payload) => {
          if (payload.new.status === 'approved') {
            setReviews((prev) => [payload.new, ...prev])
          }
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [hospitalId])

  const addReview = async (reviewData) => {
    if (!hospitalId) {
      throw new Error('Hospital ID is required')
    }

    setSubmitting(true)
    try {
      const { data, error } = await supabase
        .from('reviews')
        .insert([
          {
            hospital_id: hospitalId,
            nickname: reviewData.nickname || '匿名用户',
            rating: reviewData.rating,
            content: reviewData.content,
            status: 'pending'
          }
        ])
        .select()

      if (error) throw error
      return data[0]
    } catch (err) {
      throw new Error(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const ratingStats = {
    average: reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : '0.0',
    total: reviews.length,
    distribution: [5, 4, 3, 2, 1].map((star) => ({
      star,
      count: reviews.filter((r) => r.rating === star).length,
      percentage: reviews.length > 0
        ? Math.round((reviews.filter((r) => r.rating === star).length / reviews.length) * 100)
        : 0
    }))
  }

  return {
    reviews,
    loading,
    error,
    submitting,
    addReview,
    ratingStats,
    refetch: fetchReviews
  }
}
