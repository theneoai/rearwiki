import { useEffect, useState } from 'preact/hooks'
import { route } from 'preact-router'
import { supabase } from '../utils/supabase'
import { useReviews } from '../hooks/useReviews'
import { RatingStars } from '../components/RatingStars'
import { ReviewCard } from '../components/ReviewCard'
import { ReviewForm } from '../components/ReviewForm'

export function HospitalDetail({ id }) {
  const [hospital, setHospital] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { reviews, loading: reviewsLoading, submitting, addReview, ratingStats } = useReviews(id)

  useEffect(() => {
    async function fetchHospital() {
      if (!id) return
      
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('hospitals')
          .select('*')
          .eq('id', id)
          .eq('status', 'approved')
          .single()

        if (error) throw error
        if (!data) {
          route('/hospitals', true)
          return
        }
        setHospital(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchHospital()
  }, [id])

  const handleSubmitReview = async (reviewData) => {
    await addReview(reviewData)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-8 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
            <h2 className="text-xl font-semibold text-red-700 mb-2">加载失败</h2>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  if (!hospital) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500 mb-6">
            <a href="/" className="hover:text-blue-600">首页</a>
            <span className="mx-2">/</span>
            <a href="/hospitals" className="hover:text-blue-600">医院推荐</a>
            <span className="mx-2">/</span>
            <span className="text-gray-700">{hospital.name}</span>
          </nav>

          {/* Hospital Info Card */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {hospital.name}
                </h1>
                <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                  {hospital.level}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <RatingStars rating={Math.round(hospital.rating)} size="lg" />
                <span className="text-2xl font-bold text-gray-900">
                  {hospital.rating.toFixed(1)}
                </span>
              </div>
            </div>

            <div className="space-y-3 text-gray-600">
              <div className="flex items-start gap-2">
                <span className="text-gray-400">📍</span>
                <span>{hospital.city} · {hospital.address}</span>
              </div>
              {hospital.phone && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">📞</span>
                  <span>{hospital.phone}</span>
                </div>
              )}
            </div>

            {hospital.departments && hospital.departments.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">特色科室</h3>
                <div className="flex flex-wrap gap-2">
                  {hospital.departments.map((dept, idx) => (
                    <span
                      key={idx}
                      className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                    >
                      {dept}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {hospital.description && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">医院简介</h3>
                <p className="text-gray-600 leading-relaxed">
                  {hospital.description}
                </p>
              </div>
            )}
          </div>

          {/* Reviews Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Rating Stats */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h2 className="text-xl font-bold text-gray-900 mb-6">评价统计</h2>
                
                <div className="text-center mb-6">
                  <div className="text-5xl font-bold text-gray-900 mb-2">
                    {ratingStats.average}
                  </div>
                  <div className="flex justify-center mb-2">
                    <RatingStars rating={Math.round(parseFloat(ratingStats.average))} size="md" />
                  </div>
                  <p className="text-gray-500">{ratingStats.total} 条评价</p>
                </div>

                <div className="space-y-2">
                  {ratingStats.distribution.map(({ star, count, percentage }) => (
                    <div key={star} className="flex items-center gap-3">
                      <span className="text-sm text-gray-600 w-8">{star}星</span>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-yellow-400 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-500 w-12 text-right">
                        {count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Reviews List & Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Review Form */}
              <ReviewForm onSubmit={handleSubmitReview} submitting={submitting} />

              {/* Reviews List */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  患者评价
                  <span className="text-base font-normal text-gray-500 ml-2">
                    ({ratingStats.total})
                  </span>
                </h2>

                {reviewsLoading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="bg-white rounded-lg p-6 border border-gray-100 animate-pulse">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                            <div className="h-16 bg-gray-200 rounded w-full"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : reviews.length === 0 ? (
                  <div className="bg-white rounded-lg p-12 text-center border border-gray-100">
                    <div className="text-4xl mb-4">📝</div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      暂无评价
                    </h3>
                    <p className="text-gray-500">
                      成为第一个评价这家医院的人吧！
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <ReviewCard key={review.id} review={review} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
