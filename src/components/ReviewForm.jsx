import { useState } from 'preact/hooks'
import { RatingStars } from './RatingStars'

export function ReviewForm({ onSubmit, submitting }) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [nickname, setNickname] = useState('')
  const [content, setContent] = useState('')
  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}
    
    if (rating === 0) {
      newErrors.rating = '请选择评分'
    }
    
    if (content.length < 10) {
      newErrors.content = '评价内容至少需要10个字符'
    } else if (content.length > 500) {
      newErrors.content = '评价内容不能超过500个字符'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validate()) return
    
    try {
      await onSubmit({
        rating,
        nickname: nickname.trim() || '匿名用户',
        content: content.trim()
      })
      
      setRating(0)
      setNickname('')
      setContent('')
      setErrors({})
    } catch (err) {
      setErrors({ submit: err.message })
    }
  }

  const contentLength = content.length
  const isContentValid = contentLength >= 10 && contentLength <= 500

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        写评价
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            评分 <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-2">
            <div
              onMouseLeave={() => setHoverRating(0)}
              className="flex"
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <svg
                    className={`w-8 h-8 ${
                      star <= (hoverRating || rating)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-2">
              {rating > 0 && ['非常差', '差', '一般', '好', '非常好'][rating - 1]}
            </span>
          </div>
          {errors.rating && (
            <p className="text-red-500 text-sm mt-1">{errors.rating}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            昵称 <span className="text-gray-400">(可选)</span>
          </label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="您的昵称"
            maxLength={20}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            评价内容 <span className="text-red-500">*</span>
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="分享您的就诊体验..."
            rows={4}
            maxLength={500}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
              errors.content ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          <div className="flex justify-between mt-1">
            {errors.content ? (
              <p className="text-red-500 text-sm">{errors.content}</p>
            ) : (
              <span></span>
            )}
            <span className={`text-sm ${
              isContentValid ? 'text-green-600' : 'text-gray-400'
            }`}>
              {contentLength}/500
            </span>
          </div>
        </div>

        {errors.submit && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-600 text-sm">{errors.submit}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={submitting || rating === 0 || !isContentValid}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {submitting ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              提交中...
            </>
          ) : (
            '提交评价'
          )}
        </button>
      </form>
    </div>
  )
}
