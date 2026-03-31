export function Footer() {
  return (
    <footer className="bg-secondary text-white py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <span className="text-2xl">🍑</span>
            <span className="text-lg font-bold">痔疮百科</span>
          </div>
          
          <p className="text-gray-400 text-sm">
            为程序员和办公族提供专业的痔疮科普和医院推荐
          </p>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>© 2024 痔疮百科 - 程序员的第一道坎</p>
          <p className="mt-2">免责声明：本网站内容仅供参考，不能替代专业医疗建议</p>
        </div>
      </div>
    </footer>
  )
}
