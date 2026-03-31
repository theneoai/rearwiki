import { RatingStars } from './RatingStars'

export function ReviewCard({ review }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getInitial = (nickname) => {
    return nickname.charAt(0).toUpperCase()
  }

  const getAvatarColor = (nickname) => {
    const colors = [
      'bg-red-500',
      'bg-orange-500',
      'bg-amber-500',
      'bg-green-500',
      'bg-emerald-500',
      'bg-teal-500',
      'bg-cyan-500',
      'bg-sky-500',
      'bg-blue-500',
      'bg-indigo-500',
      'bg-violet-500',
      'bg-purple-500',
      'bg-fuchsia-500',
      'bg-pink-500',
      'bg-rose-500'
    ]
    let hash = 0
    for (let i = 0; i < nickname.length; i++) {
      hash = nickname.charCodeAt(i) + ((hash << 5) - hash)
    }
    return colors[Math.abs(hash) % colors.length]
  }

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-100">
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-full ${getAvatarColor(review.nickname)} flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
          {getInitial(review.nickname)}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-gray-900 truncate">
              {review.nickname}
            </h4>
            <span className="text-sm text-gray-400">
              {formatDate(review.created_at)}
            </span>
          </div>
          
          <div className="mb-3">
            <RatingStars rating={review.rating} size="sm" />
          </div>
          
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {review.content}
          </p>
        </div>
      </div>
    </div>
  )
}
