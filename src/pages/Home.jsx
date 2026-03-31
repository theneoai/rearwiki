import { useHospitals } from '../hooks/useHospitals'
import { useArticles } from '../hooks/useArticles'
import { HospitalCard } from '../components/HospitalCard'
import { ArticleCard } from '../components/ArticleCard'

export function Home() {
  const { hospitals, loading: hospitalsLoading } = useHospitals(6)
  const { articles, loading: articlesLoading } = useArticles(3)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            程序员的第一道坎
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            久坐、加班、熬夜——痔疮正在悄悄找上你
          </p>
          <p className="text-lg mb-8 text-blue-200 max-w-2xl mx-auto">
            我们理解程序员的痛，提供专业的痔疮防治知识和优质医院推荐
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/hospitals"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              查找医院
            </a>
            <a
              href="/knowledge"
              className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors border border-blue-500"
            >
              了解更多
            </a>
          </div>
        </div>
      </section>

      {/* Popular Hospitals Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">热门医院</h2>
            <a
              href="/hospitals"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              查看全部 →
            </a>
          </div>
          
          {hospitalsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hospitals.map(hospital => (
                <HospitalCard key={hospital.id} hospital={hospital} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">最新文章</h2>
            <a
              href="/knowledge"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              查看全部 →
            </a>
          </div>
          
          {articlesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-6 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Quick Navigation Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            快速导航
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="/knowledge"
              className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow text-center"
            >
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">知识库</h3>
              <p className="text-gray-600">了解痔疮的成因、症状和治疗方法</p>
            </a>
            <a
              href="/hospitals"
              className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow text-center"
            >
              <div className="text-4xl mb-4">🏥</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">医院推荐</h3>
              <p className="text-gray-600">找到您附近的专业痔疮治疗医院</p>
            </a>
            <a
              href="/about"
              className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow text-center"
            >
              <div className="text-4xl mb-4">ℹ️</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">关于我们</h3>
              <p className="text-gray-600">了解我们的使命和团队</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
