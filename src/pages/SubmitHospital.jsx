import { useState } from 'preact/hooks'
import { Link } from 'preact-router'
import { supabase } from '../utils/supabaseClient'

const DEPARTMENTS = [
  '肛肠科',
  '普外科',
  '消化内科',
  '胃肠外科',
  '结直肠外科'
]

const LEVELS = ['三甲', '三乙', '二甲', '二乙', '其他']

export function SubmitHospital() {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    address: '',
    level: '三甲',
    departments: []
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = '请输入医院名称'
    }
    
    if (!formData.city.trim()) {
      newErrors.city = '请输入所在城市'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  const handleDepartmentToggle = (dept) => {
    setFormData(prev => ({
      ...prev,
      departments: prev.departments.includes(dept)
        ? prev.departments.filter(d => d !== dept)
        : [...prev.departments, dept]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setSubmitting(true)

    try {
      const { error } = await supabase
        .from('hospitals')
        .insert([{
          name: formData.name.trim(),
          city: formData.city.trim(),
          address: formData.address.trim() || null,
          level: formData.level,
          departments: formData.departments,
          status: 'pending',
          rating: 0,
          review_count: 0
        }])

      if (error) throw error
      
      setSubmitted(true)
      setFormData({
        name: '',
        city: '',
        address: '',
        level: '三甲',
        departments: []
      })
    } catch (err) {
      alert('提交失败：' + err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-2xl font-bold text-secondary mb-4">提交成功！</h1>
          <p className="text-gray-600 mb-8">
            感谢你的贡献！医院信息将在审核后显示在列表中。
          </p>
          <Link href="/hospitals" className="btn-primary inline-block">
            查看医院列表
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/hospitals" className="text-primary hover:underline mb-4 inline-block">
            ← 返回医院列表
          </Link>
          <h1 className="text-3xl font-bold text-secondary mb-4">提交医院</h1>
          <p className="text-gray-600">
            分享你知道的优质医院，帮助更多病友找到合适的治疗方案。
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                医院名称 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="如：北京协和医院"
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-primary/20 outline-none transition-colors ${
                  errors.name 
                    ? 'border-red-500 focus:border-red-500' 
                    : 'border-gray-200 focus:border-primary'
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                所在城市 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="如：北京"
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-primary/20 outline-none transition-colors ${
                  errors.city 
                    ? 'border-red-500 focus:border-red-500' 
                    : 'border-gray-200 focus:border-primary'
                }`}
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">{errors.city}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                详细地址
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="如：东城区帅府园1号"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                医院等级
              </label>
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors bg-white"
              >
                {LEVELS.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                相关科室
              </label>
              <div className="flex flex-wrap gap-2">
                {DEPARTMENTS.map(dept => (
                  <button
                    key={dept}
                    type="button"
                    onClick={() => handleDepartmentToggle(dept)}
                    className={`px-4 py-2 rounded-full text-sm transition-colors ${
                      formData.departments.includes(dept)
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
              {formData.departments.length > 0 && (
                <p className="text-sm text-gray-500 mt-2">
                  已选择: {formData.departments.join('、')}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary w-full mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? '提交中...' : '提交医院'}
          </button>
        </form>
      </div>
    </div>
  )
}
