import { useState, useMemo } from 'preact/hooks'
import { useHospitals } from '../hooks/useHospitals'
import { HospitalCard } from '../components/HospitalCard'
import { SearchBar } from '../components/SearchBar'
import Fuse from 'fuse.js'

const CITIES = ['全部', '北京', '上海', '广州', '深圳', '成都', '杭州', '武汉']
const LEVELS = ['全部', '三甲', '三乙', '二甲', '二乙']

export function HospitalList() {
  const { hospitals, loading, error } = useHospitals(100)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCity, setSelectedCity] = useState('全部')
  const [selectedLevel, setSelectedLevel] = useState('全部')
  const [sortBy, setSortBy] = useState('rating')

  const fuse = useMemo(() => {
    return new Fuse(hospitals, {
      keys: ['name', 'address', 'departments'],
      threshold: 0.3,
    })
  }, [hospitals])

  const filteredHospitals = useMemo(() => {
    let result = hospitals

    if (searchQuery) {
      result = fuse.search(searchQuery).map(r => r.item)
    }

    if (selectedCity !== '全部') {
      result = result.filter(h => h.city === selectedCity)
    }

    if (selectedLevel !== '全部') {
      result = result.filter(h => h.level === selectedLevel)
    }

    return result.sort((a, b) => {
      if (sortBy === 'rating') {
        return b.rating - a.rating
      }
      return b.review_count - a.review_count
    })
  }, [hospitals, searchQuery, selectedCity, selectedLevel, sortBy, fuse])

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
      <h1 className="text-3xl font-bold text-secondary mb-8">医院列表</h1>

      <div className="mb-6">
        <SearchBar
          onSearch={setSearchQuery}
          placeholder="搜索医院名称、地址或科室..."
        />
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none"
        >
          {CITIES.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>

        <select
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none"
        >
          {LEVELS.map(level => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none"
        >
          <option value="rating">按评分排序</option>
          <option value="reviews">按评价数排序</option>
        </select>
      </div>

      <p className="text-gray-500 mb-4">共找到 {filteredHospitals.length} 家医院</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHospitals.map(hospital => (
          <HospitalCard key={hospital.id} hospital={hospital} />
        ))}
      </div>

      {filteredHospitals.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">没有找到符合条件的医院</p>
        </div>
      )}
    </div>
  )
}
