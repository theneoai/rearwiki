# 痔疮科普网站实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建一个面向办公族和程序员的痔疮科普网站，包含科普文章、医院/科室排名、用户评论功能

**架构：** Preact + Vite + Tailwind CSS 构建SPA，Supabase提供后端数据库和API，静态托管部署

**技术栈：** Preact, Vite, Tailwind CSS, Supabase, React Router, Fuse.js

---

## 项目结构

```
rearwiki/
├── src/
│   ├── components/          # 可复用组件
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── HospitalCard.jsx
│   │   ├── ReviewCard.jsx
│   │   ├── ArticleCard.jsx
│   │   ├── SearchBar.jsx
│   │   ├── RatingStars.jsx
│   │   └── ReviewForm.jsx
│   ├── pages/              # 页面组件
│   │   ├── Home.jsx
│   │   ├── KnowledgeList.jsx
│   │   ├── KnowledgeDetail.jsx
│   │   ├── HospitalList.jsx
│   │   ├── HospitalDetail.jsx
│   │   └── SubmitHospital.jsx
│   ├── hooks/              # 自定义Hooks
│   │   ├── useSupabase.js
│   │   ├── useHospitals.js
│   │   ├── useReviews.js
│   │   └── useArticles.js
│   ├── utils/              # 工具函数
│   │   ├── supabaseClient.js
│   │   └── helpers.js
│   ├── styles/             # 样式文件
│   │   └── index.css
│   ├── App.jsx
│   └── main.jsx
├── public/                 # 静态资源
├── index.html
├── vite.config.js
├── tailwind.config.js
├── package.json
└── .env.example
```

---

## Task 1: 初始化项目和安装依赖

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `tailwind.config.js`
- Create: `index.html`
- Create: `.env.example`

- [ ] **Step 1: 创建 package.json**

```json
{
  "name": "rearwiki",
  "private": true,
  "version": "0.0.1",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "preact": "^10.19.3",
    "preact-router": "^4.1.2",
    "@supabase/supabase-js": "^2.39.0",
    "fuse.js": "^7.0.0",
    "marked": "^11.1.1"
  },
  "devDependencies": {
    "@preact/preset-vite": "^2.8.1",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.4.0",
    "vite": "^5.0.8"
  }
}
```

- [ ] **Step 2: 创建 vite.config.js**

```javascript
import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

export default defineConfig({
  plugins: [preact()],
  resolve: {
    alias: {
      'react': 'preact/compat',
      'react-dom': 'preact/compat'
    }
  }
})
```

- [ ] **Step 3: 创建 tailwind.config.js**

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B6B',
        secondary: '#2D3748',
        accent: '#4ECDC4',
      }
    },
  },
  plugins: [],
}
```

- [ ] **Step 4: 创建 index.html**

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>痔疮百科 - 程序员的第一道坎</title>
    <meta name="description" content="为办公族、程序员提供的痔疮科普知识、医院推荐和用户真实评价" />
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 5: 创建 .env.example**

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

- [ ] **Step 6: 安装依赖**

Run: `npm install`
Expected: 安装成功，生成 node_modules 目录

- [ ] **Step 7: 创建目录结构**

Run: `mkdir -p src/components src/pages src/hooks src/utils src/styles public`

- [ ] **Step 8: Commit**

```bash
git add .
git commit -m "chore: initialize project with Preact + Vite + Tailwind"
```

---

## Task 2: Supabase 配置和客户端

**Files:**
- Create: `src/utils/supabaseClient.js`

- [ ] **Step 1: 创建 Supabase 客户端**

```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
```

- [ ] **Step 2: Commit**

```bash
git add src/utils/supabaseClient.js
git commit -m "feat: add Supabase client configuration"
```

---

## Task 3: 全局样式和主入口

**Files:**
- Create: `src/styles/index.css`
- Create: `src/main.jsx`
- Create: `src/App.jsx`

- [ ] **Step 1: 创建全局样式**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-gray-50 text-secondary antialiased;
  }
}

@layer components {
  .btn-primary {
    @apply bg-primary text-white px-6 py-3 rounded-2xl font-medium 
           hover:bg-red-500 transition-colors shadow-lg shadow-primary/30;
  }
  
  .btn-secondary {
    @apply bg-white text-secondary px-6 py-3 rounded-2xl font-medium 
           border-2 border-gray-200 hover:border-primary hover:text-primary 
           transition-colors;
  }
  
  .card {
    @apply bg-white rounded-2xl shadow-sm border border-gray-100 
           hover:shadow-md transition-shadow;
  }
}
```

- [ ] **Step 2: 创建主入口文件**

```javascript
import { render } from 'preact'
import { App } from './App.jsx'
import './styles/index.css'

render(<App />, document.getElementById('app'))
```

- [ ] **Step 3: 创建 App 组件**

```javascript
import Router from 'preact-router'
import { Home } from './pages/Home.jsx'
import { KnowledgeList } from './pages/KnowledgeList.jsx'
import { KnowledgeDetail } from './pages/KnowledgeDetail.jsx'
import { HospitalList } from './pages/HospitalList.jsx'
import { HospitalDetail } from './pages/HospitalDetail.jsx'
import { SubmitHospital } from './pages/SubmitHospital.jsx'
import { Header } from './components/Header.jsx'
import { Footer } from './components/Footer.jsx'

export function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Router>
          <Home path="/" />
          <KnowledgeList path="/knowledge" />
          <KnowledgeDetail path="/knowledge/:slug" />
          <HospitalList path="/hospitals" />
          <HospitalDetail path="/hospitals/:id" />
          <SubmitHospital path="/submit" />
        </Router>
      </main>
      <Footer />
    </div>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add src/styles/index.css src/main.jsx src/App.jsx
git commit -m "feat: add global styles and main App component"
```

---

## Task 4: 公共组件 - Header 和 Footer

**Files:**
- Create: `src/components/Header.jsx`
- Create: `src/components/Footer.jsx`

- [ ] **Step 1: 创建 Header 组件**

```javascript
import { Link } from 'preact-router'

export function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🍑</span>
            <span className="text-xl font-bold text-secondary">
              痔疮百科
            </span>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link 
              href="/knowledge" 
              className="text-gray-600 hover:text-primary transition-colors"
            >
              科普知识
            </Link>
            <Link 
              href="/hospitals" 
              className="text-gray-600 hover:text-primary transition-colors"
            >
              找医院
            </Link>
            <Link 
              href="/submit" 
              className="btn-primary text-sm py-2"
            >
              提交医院
            </Link>
          </nav>
          
          {/* 移动端菜单按钮 */}
          <button className="md:hidden p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
```

- [ ] **Step 2: 创建 Footer 组件**

```javascript
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
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Header.jsx src/components/Footer.jsx
git commit -m "feat: add Header and Footer components"
```

---

## Task 5: 首页 (Home)

**Files:**
- Create: `src/pages/Home.jsx`
- Create: `src/hooks/useHospitals.js`
- Create: `src/hooks/useArticles.js`

- [ ] **Step 1: 创建 useHospitals Hook**

```javascript
import { useState, useEffect } from 'preact/hooks'
import { supabase } from '../utils/supabaseClient'

export function useHospitals(limit = 10) {
  const [hospitals, setHospitals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchHospitals() {
      try {
        const { data, error } = await supabase
          .from('hospitals')
          .select('*')
          .eq('status', 'approved')
          .order('rating', { ascending: false })
          .limit(limit)

        if (error) throw error
        setHospitals(data || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchHospitals()
  }, [limit])

  return { hospitals, loading, error }
}
```

- [ ] **Step 2: 创建 useArticles Hook**

```javascript
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
```

- [ ] **Step 3: 创建 Home 页面**

```javascript
import { Link } from 'preact-router'
import { useHospitals } from '../hooks/useHospitals'
import { useArticles } from '../hooks/useArticles'
import { HospitalCard } from '../components/HospitalCard'
import { ArticleCard } from '../components/ArticleCard'

export function Home() {
  const { hospitals, loading: hospitalsLoading } = useHospitals(5)
  const { articles, loading: articlesLoading } = useArticles(3)

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl mb-6">🍑💻</div>
          <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
            程序员的第一道坎
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            久坐办公，痔疮来袭？别慌！这里有最实用的科普知识、最真实的医院评价，帮你找到最适合的治疗方案。
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/knowledge" className="btn-primary">
              了解痔疮
            </Link>
            <Link href="/hospitals" className="btn-secondary">
              找医院
            </Link>
          </div>
        </div>
      </section>

      {/* 热门医院 */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-secondary">热门医院推荐</h2>
            <Link href="/hospitals" className="text-primary hover:underline">
              查看全部 →
            </Link>
          </div>

          {hospitalsLoading ? (
            <div className="text-center py-8">加载中...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hospitals.map(hospital => (
                <HospitalCard key={hospital.id} hospital={hospital} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 最新科普 */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-secondary">最新科普</h2>
            <Link href="/knowledge" className="text-primary hover:underline">
              查看全部 →
            </Link>
          </div>

          {articlesLoading ? (
            <div className="text-center py-8">加载中...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {articles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 快速入口 */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-secondary text-center mb-8">
            快速导航
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/knowledge" className="card p-6 hover:scale-105 transition-transform">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-lg font-bold mb-2">科普知识</h3>
              <p className="text-gray-600">了解痔疮类型、预防方法和治疗方案</p>
            </Link>
            
            <Link href="/hospitals" className="card p-6 hover:scale-105 transition-transform">
              <div className="text-4xl mb-4">🏥</div>
              <h3 className="text-lg font-bold mb-2">找医院</h3>
              <p className="text-gray-600">查看各地肛肠科医院排名和真实评价</p>
            </Link>
            
            <Link href="/submit" className="card p-6 hover:scale-105 transition-transform">
              <div className="text-4xl mb-4">➕</div>
              <h3 className="text-lg font-bold mb-2">提交医院</h3>
              <p className="text-gray-600">分享你知道的好医院，帮助他人</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add src/pages/Home.jsx src/hooks/useHospitals.js src/hooks/useArticles.js
git commit -m "feat: add Home page with hooks"
```

---

## Task 6: 卡片组件

**Files:**
- Create: `src/components/HospitalCard.jsx`
- Create: `src/components/ArticleCard.jsx`

- [ ] **Step 1: 创建 HospitalCard 组件**

```javascript
import { Link } from 'preact-router'
import { RatingStars } from './RatingStars'

export function HospitalCard({ hospital }) {
  return (
    <Link href={`/hospitals/${hospital.id}`} className="card overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-secondary line-clamp-1">
            {hospital.name}
          </h3>
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
            {hospital.level}
          </span>
        </div>
        
        <div className="flex items-center mb-3">
          <RatingStars rating={hospital.rating} />
          <span className="ml-2 text-sm text-gray-500">
            {hospital.rating.toFixed(1)} ({hospital.review_count}条评价)
          </span>
        </div>
        
        <p className="text-sm text-gray-500 mb-3">
          📍 {hospital.city} · {hospital.address}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {hospital.departments?.slice(0, 3).map((dept, idx) => (
            <span 
              key={idx}
              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
            >
              {dept}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
```

- [ ] **Step 2: 创建 ArticleCard 组件**

```javascript
import { Link } from 'preact-router'

export function ArticleCard({ article }) {
  const categories = {
    'type': '痔疮类型',
    'prevention': '预防方法',
    'treatment': '治疗方式',
    'care': '术后护理'
  }

  return (
    <Link href={`/knowledge/${article.slug}`} className="card overflow-hidden">
      <div className="p-6">
        <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">
          {categories[article.category] || '科普'}
        </span>
        
        <h3 className="text-lg font-bold text-secondary mt-3 mb-2 line-clamp-2">
          {article.title}
        </h3>
        
        <p className="text-sm text-gray-600 line-clamp-3 mb-4">
          {article.content?.substring(0, 100)}...
        </p>
        
        <div className="flex items-center text-xs text-gray-400">
          <span>👁 {article.views || 0} 阅读</span>
          <span className="mx-2">·</span>
          <span>{new Date(article.created_at).toLocaleDateString('zh-CN')}</span>
        </div>
      </div>
    </Link>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/HospitalCard.jsx src/components/ArticleCard.jsx
git commit -m "feat: add HospitalCard and ArticleCard components"
```

---

## Task 7: 评分和搜索组件

**Files:**
- Create: `src/components/RatingStars.jsx`
- Create: `src/components/SearchBar.jsx`

- [ ] **Step 1: 创建 RatingStars 组件**

```javascript
export function RatingStars({ rating, size = 'sm', interactive = false, onRate }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  const stars = [1, 2, 3, 4, 5]

  return (
    <div className="flex">
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => interactive && onRate?.(star)}
          className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
        >
          <svg
            className={`${sizeClasses[size]} ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: 创建 SearchBar 组件**

```javascript
import { useState } from 'preact/hooks'

export function SearchBar({ onSearch, placeholder = "搜索..." }) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch?.(query)
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 pr-12 rounded-2xl border border-gray-200 
                   focus:border-primary focus:ring-2 focus:ring-primary/20 
                   outline-none transition-all"
      />
      <button
        type="submit"
        className="absolute right-3 top-1/2 -translate-y-1/2 
                   text-gray-400 hover:text-primary transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </form>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/RatingStars.jsx src/components/SearchBar.jsx
git commit -m "feat: add RatingStars and SearchBar components"
```

---

## Task 8: 医院列表页面

**Files:**
- Create: `src/pages/HospitalList.jsx`

- [ ] **Step 1: 创建 HospitalList 页面**

```javascript
import { useState, useMemo } from 'preact/hooks'
import { useHospitals } from '../hooks/useHospitals'
import { HospitalCard } from '../components/HospitalCard'
import { SearchBar } from '../components/SearchBar'
import Fuse from 'fuse.js'

const CITIES = ['全部', '北京', '上海', '广州', '深圳', '成都', '杭州', '武汉']
const LEVELS = ['全部', '三甲', '三乙', '二甲', '二乙']

export function HospitalList() {
  const { hospitals, loading } = useHospitals(100)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCity, setSelectedCity] = useState('全部')
  const [selectedLevel, setSelectedLevel] = useState('全部')
  const [sortBy, setSortBy] = useState('rating')

  const fuse = useMemo(() => {
    return new Fuse(hospitals, {
      keys: ['name', 'city', 'address', 'departments'],
      threshold: 0.3
    })
  }, [hospitals])

  const filteredHospitals = useMemo(() => {
    let result = hospitals

    // 搜索过滤
    if (searchQuery) {
      result = fuse.search(searchQuery).map(r => r.item)
    }

    // 城市过滤
    if (selectedCity !== '全部') {
      result = result.filter(h => h.city === selectedCity)
    }

    // 等级过滤
    if (selectedLevel !== '全部') {
      result = result.filter(h => h.level === selectedLevel)
    }

    // 排序
    result = [...result].sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating
      if (sortBy === 'reviews') return b.review_count - a.review_count
      return 0
    })

    return result
  }, [hospitals, searchQuery, selectedCity, selectedLevel, sortBy, fuse])

  return (
    <div className="py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-secondary mb-8">找医院</h1>

        {/* 搜索栏 */}
        <div className="mb-6">
          <SearchBar 
            onSearch={setSearchQuery}
            placeholder="搜索医院名称、城市或症状..."
          />
        </div>

        {/* 筛选器 */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">城市：</span>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none"
            >
              {CITIES.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">等级：</span>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none"
            >
              {LEVELS.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">排序：</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none"
            >
              <option value="rating">评分最高</option>
              <option value="reviews">评价最多</option>
            </select>
          </div>
        </div>

        {/* 结果列表 */}
        {loading ? (
          <div className="text-center py-12">加载中...</div>
        ) : filteredHospitals.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            没有找到匹配的医院
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHospitals.map(hospital => (
              <HospitalCard key={hospital.id} hospital={hospital} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/HospitalList.jsx
git commit -m "feat: add HospitalList page with search and filter"
```

---

## Task 9: 医院详情页面和评论功能

**Files:**
- Create: `src/pages/HospitalDetail.jsx`
- Create: `src/components/ReviewCard.jsx`
- Create: `src/components/ReviewForm.jsx`
- Create: `src/hooks/useReviews.js`

- [ ] **Step 1: 创建 useReviews Hook**

```javascript
import { useState, useEffect } from 'preact/hooks'
import { supabase } from '../utils/supabaseClient'

export function useReviews(hospitalId) {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!hospitalId) return

    async function fetchReviews() {
      try {
        const { data, error } = await supabase
          .from('reviews')
          .select('*')
          .eq('hospital_id', hospitalId)
          .order('created_at', { ascending: false })

        if (error) throw error
        setReviews(data || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()

    // 实时订阅新评论
    const subscription = supabase
      .channel(`reviews:${hospitalId}`)
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'reviews', filter: `hospital_id=eq.${hospitalId}` },
        (payload) => {
          setReviews(prev => [payload.new, ...prev])
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [hospitalId])

  const addReview = async (reviewData) => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .insert([{ ...reviewData, hospital_id: hospitalId }])
        .select()

      if (error) throw error
      return { success: true, data }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }

  return { reviews, loading, error, addReview }
}
```

- [ ] **Step 2: 创建 ReviewCard 组件**

```javascript
import { RatingStars } from './RatingStars'

export function ReviewCard({ review }) {
  return (
    <div className="card p-6">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
            {review.nickname?.[0] || '匿'}
          </div>
          <div>
            <p className="font-medium text-secondary">{review.nickname || '匿名用户'}</p>
            <RatingStars rating={review.rating} size="sm" />
          </div>
        </div>
        
        <span className="text-sm text-gray-400">
          {new Date(review.created_at).toLocaleDateString('zh-CN')}
        </span>
      </div>
      
      <p className="text-gray-600 mt-3">{review.content}</p>
    </div>
  )
}
```

- [ ] **Step 3: 创建 ReviewForm 组件**

```javascript
import { useState } from 'preact/hooks'
import { RatingStars } from './RatingStars'

export function ReviewForm({ onSubmit, loading }) {
  const [rating, setRating] = useState(5)
  const [content, setContent] = useState('')
  const [nickname, setNickname] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (content.length < 10) {
      alert('评论内容至少需要10个字')
      return
    }
    onSubmit({ rating, content, nickname: nickname || '匿名用户' })
    setContent('')
  }

  return (
    <form onSubmit={handleSubmit} className="card p-6">
      <h3 className="text-lg font-bold text-secondary mb-4">写评价</h3>
      
      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-2">评分</label>
        <RatingStars rating={rating} size="lg" interactive onRate={setRating} />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-2">昵称（可选）</label>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="怎么称呼你？"
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none"
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-2">评价内容</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="分享你的就医体验，帮助其他人..."
          rows={4}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none resize-none"
          required
        />
        <p className="text-xs text-gray-400 mt-1">{content.length}/500 字</p>
      </div>
      
      <button
        type="submit"
        disabled={loading || content.length < 10}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? '提交中...' : '提交评价'}
      </button>
    </form>
  )
}
```

- [ ] **Step 4: 创建 HospitalDetail 页面**

```javascript
import { useState, useEffect } from 'preact/hooks'
import { supabase } from '../utils/supabaseClient'
import { useReviews } from '../hooks/useReviews'
import { RatingStars } from '../components/RatingStars'
import { ReviewCard } from '../components/ReviewCard'
import { ReviewForm } from '../components/ReviewForm'

export function HospitalDetail({ id }) {
  const [hospital, setHospital] = useState(null)
  const [loading, setLoading] = useState(true)
  const { reviews, loading: reviewsLoading, addReview } = useReviews(id)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    async function fetchHospital() {
      try {
        const { data, error } = await supabase
          .from('hospitals')
          .select('*')
          .eq('id', id)
          .single()

        if (error) throw error
        setHospital(data)
      } catch (err) {
        console.error('Error fetching hospital:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchHospital()
  }, [id])

  const handleSubmitReview = async (reviewData) => {
    setSubmitting(true)
    const result = await addReview(reviewData)
    setSubmitting(false)
    
    if (result.success) {
      alert('评价提交成功！')
    } else {
      alert('提交失败：' + result.error)
    }
  }

  if (loading) return <div className="text-center py-12">加载中...</div>
  if (!hospital) return <div className="text-center py-12">医院不存在</div>

  // 计算评分分布
  const ratingCounts = [0, 0, 0, 0, 0]
  reviews.forEach(r => {
    if (r.rating >= 1 && r.rating <= 5) {
      ratingCounts[5 - r.rating]++
    }
  })

  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 医院基本信息 */}
        <div className="card p-6 mb-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-secondary">{hospital.name}</h1>
                <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                  {hospital.level}
                </span>
              </div>
              
              <p className="text-gray-600 mb-2">📍 {hospital.city} · {hospital.address}</p>
              
              <div className="flex flex-wrap gap-2 mt-3">
                {hospital.departments?.map((dept, idx) => (
                  <span 
                    key={idx}
                    className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full"
                  >
                    {dept}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">
                  {hospital.rating?.toFixed(1) || '0.0'}
                </div>
                <RatingStars rating={Math.round(hospital.rating || 0)} />
                <p className="text-sm text-gray-500 mt-1">{hospital.review_count}条评价</p>
              </div>
            </div>
          </div>
        </div>

        {/* 评分分布 */}
        {reviews.length > 0 && (
          <div className="card p-6 mb-6">
            <h2 className="text-lg font-bold text-secondary mb-4">评分分布</h2>
            
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((star, idx) => {
                const count = ratingCounts[idx]
                const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0
                
                return (
                  <div key={star} className="flex items-center gap-3">
                    <span className="text-sm w-8">{star}星</span>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500 w-12 text-right">{count}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 评论列表 */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-bold text-secondary mb-4">用户评价</h2>
            
            {reviewsLoading ? (
              <div className="text-center py-8">加载中...</div>
            ) : reviews.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                暂无评价，成为第一个评价的人吧！
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map(review => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            )}
          </div>

          {/* 写评论表单 */}
          <div>
            <ReviewForm onSubmit={handleSubmitReview} loading={submitting} />
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Commit**

```bash
git add src/pages/HospitalDetail.jsx src/components/ReviewCard.jsx src/components/ReviewForm.jsx src/hooks/useReviews.js
git commit -m "feat: add HospitalDetail page with review system"
```

---

## Task 10: 科普知识页面

**Files:**
- Create: `src/pages/KnowledgeList.jsx`
- Create: `src/pages/KnowledgeDetail.jsx`

- [ ] **Step 1: 创建 KnowledgeList 页面**

```javascript
import { useState, useMemo } from 'preact/hooks'
import { useArticles } from '../hooks/useArticles'
import { ArticleCard } from '../components/ArticleCard'

const CATEGORIES = [
  { key: 'all', label: '全部' },
  { key: 'type', label: '痔疮类型' },
  { key: 'prevention', label: '预防方法' },
  { key: 'treatment', label: '治疗方式' },
  { key: 'care', label: '术后护理' }
]

export function KnowledgeList() {
  const { articles, loading } = useArticles(100)
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredArticles = useMemo(() => {
    if (selectedCategory === 'all') return articles
    return articles.filter(a => a.category === selectedCategory)
  }, [articles, selectedCategory])

  return (
    <div className="py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-secondary mb-8">科普知识</h1>

        {/* 分类筛选 */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(cat => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === cat.key
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 文章列表 */}
        {loading ? (
          <div className="text-center py-12">加载中...</div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            该分类下暂无文章
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: 创建 KnowledgeDetail 页面**

```javascript
import { useState, useEffect } from 'preact/hooks'
import { Link } from 'preact-router'
import { supabase } from '../utils/supabaseClient'
import { marked } from 'marked'

export function KnowledgeDetail({ slug }) {
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchArticle() {
      try {
        const { data, error } = await supabase
          .from('knowledge_articles')
          .select('*')
          .eq('slug', slug)
          .single()

        if (error) throw error
        setArticle(data)
        
        // 增加阅读量
        await supabase
          .from('knowledge_articles')
          .update({ views: (data.views || 0) + 1 })
          .eq('id', data.id)
      } catch (err) {
        console.error('Error fetching article:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [slug])

  if (loading) return <div className="text-center py-12">加载中...</div>
  if (!article) return <div className="text-center py-12">文章不存在</div>

  const categories = {
    'type': '痔疮类型',
    'prevention': '预防方法',
    'treatment': '治疗方式',
    'care': '术后护理'
  }

  return (
    <div className="py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/knowledge" className="text-primary hover:underline mb-4 inline-block">
          ← 返回科普列表
        </Link>

        <article className="card p-8">
          <header className="mb-8">
            <span className="inline-block bg-accent/10 text-accent px-3 py-1 rounded-full text-sm mb-4">
              {categories[article.category] || '科普'}
            </span>
            
            <h1 className="text-3xl font-bold text-secondary mb-4">{article.title}</h1>
            
            <div className="flex items-center text-sm text-gray-500">
              <span>👁 {article.views || 0} 阅读</span>
              <span className="mx-3">·</span>
              <span>{new Date(article.created_at).toLocaleDateString('zh-CN')}</span>
            </div>
          </header>

          <div 
            className="prose prose-lg max-w-none prose-headings:text-secondary prose-a:text-primary"
            dangerouslySetInnerHTML={{ __html: marked(article.content) }}
          />
        </article>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/KnowledgeList.jsx src/pages/KnowledgeDetail.jsx
git commit -m "feat: add KnowledgeList and KnowledgeDetail pages"
```

---

## Task 11: 提交医院页面

**Files:**
- Create: `src/pages/SubmitHospital.jsx`

- [ ] **Step 1: 创建 SubmitHospital 页面**

```javascript
import { useState } from 'preact/hooks'
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
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
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
    
    if (!formData.name || !formData.city) {
      alert('请填写医院名称和城市')
      return
    }

    setSubmitting(true)

    try {
      const { error } = await supabase
        .from('hospitals')
        .insert([{
          ...formData,
          status: 'pending'
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
          <a href="/hospitals" className="btn-primary">
            查看医院列表
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-secondary mb-4">提交医院</h1>
        
        <p className="text-gray-600 mb-8">
          分享你知道的优质医院，帮助更多病友找到合适的治疗方案。
        </p>

        <form onSubmit={handleSubmit} className="card p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                医院名称 *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="如：北京协和医院"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                所在城市 *
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="如：北京"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                required
              />
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
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
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
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
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
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary w-full mt-8 disabled:opacity-50"
          >
            {submitting ? '提交中...' : '提交医院'}
          </button>
        </form>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/SubmitHospital.jsx
git commit -m "feat: add SubmitHospital page"
```

---

## Task 12: Supabase 数据库设置

**Files:**
- Create: `supabase/migrations/001_initial_schema.sql`

- [ ] **Step 1: 创建数据库迁移文件**

```sql
-- 创建 hospitals 表
CREATE TABLE hospitals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  address TEXT,
  level TEXT CHECK (level IN ('三甲', '三乙', '二甲', '二乙', '其他')),
  departments JSONB DEFAULT '[]',
  rating DECIMAL(2,1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP DEFAULT NOW()
);

-- 创建 reviews 表
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hospital_id UUID REFERENCES hospitals(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  content TEXT NOT NULL,
  nickname TEXT DEFAULT '匿名用户',
  ip_address TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 创建 knowledge_articles 表
CREATE TABLE knowledge_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  content TEXT NOT NULL,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 创建更新医院评分的函数
CREATE OR REPLACE FUNCTION update_hospital_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE hospitals
  SET 
    rating = (
      SELECT COALESCE(AVG(rating), 0)
      FROM reviews
      WHERE hospital_id = COALESCE(NEW.hospital_id, OLD.hospital_id)
    ),
    review_count = (
      SELECT COUNT(*)
      FROM reviews
      WHERE hospital_id = COALESCE(NEW.hospital_id, OLD.hospital_id)
    )
  WHERE id = COALESCE(NEW.hospital_id, OLD.hospital_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- 创建触发器
CREATE TRIGGER update_rating_on_review
AFTER INSERT OR UPDATE OR DELETE ON reviews
FOR EACH ROW
EXECUTE FUNCTION update_hospital_rating();

-- 设置 RLS (Row Level Security)
ALTER TABLE hospitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_articles ENABLE ROW LEVEL SECURITY;

-- 创建策略
CREATE POLICY "Allow read hospitals" ON hospitals
  FOR SELECT USING (status = 'approved');

CREATE POLICY "Allow insert hospitals" ON hospitals
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow read reviews" ON reviews
  FOR SELECT USING (true);

CREATE POLICY "Allow insert reviews" ON reviews
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow read articles" ON knowledge_articles
  FOR SELECT USING (true);
```

- [ ] **Step 2: 创建种子数据文件**

Create: `supabase/seed.sql`

```sql
-- 插入示例医院数据
INSERT INTO hospitals (name, city, address, level, departments, rating, review_count, status) VALUES
('北京协和医院', '北京', '东城区帅府园1号', '三甲', '["肛肠科", "普外科"]', 4.8, 156, 'approved'),
('中日友好医院', '北京', '朝阳区樱花园东街2号', '三甲', '["肛肠科", "结直肠外科"]', 4.6, 89, 'approved'),
('上海长海医院', '上海', '杨浦区长海路168号', '三甲', '["肛肠科", "普外科"]', 4.7, 124, 'approved'),
('上海瑞金医院', '上海', '黄浦区瑞金二路197号', '三甲', '["消化内科", "普外科"]', 4.5, 78, 'approved'),
('中山大学附属第六医院', '广州', '天河区员村二横路26号', '三甲', '["肛肠科", "结直肠外科", "胃肠外科"]', 4.9, 203, 'approved'),
('四川大学华西医院', '成都', '武侯区国学巷37号', '三甲', '["肛肠科", "普外科"]', 4.7, 167, 'approved');

-- 插入示例科普文章
INSERT INTO knowledge_articles (title, slug, category, content, views) VALUES
('内痔、外痔、混合痔，你真的了解吗？', 'types-of-hemorrhoids', 'type', '
# 内痔、外痔、混合痔，你真的了解吗？

痔疮是肛门直肠底部及肛门粘膜的静脉丛发生曲张而形成的一个或多个柔软的静脉团的一种慢性疾病。

## 内痔

内痔位于齿状线以上，由直肠上静脉丛形成。主要症状是便血和脱出。

### 特点：
- 无痛性便血
- 痔核脱出
- 好发于截石位3、7、11点

## 外痔

外痔位于齿状线以下，由直肠下静脉丛形成。主要症状是疼痛和异物感。

### 特点：
- 疼痛明显
- 异物感
- 可见痔核

## 混合痔

混合痔是内痔和外痔的联合体，跨越齿状线。

### 特点：
- 兼具内痔和外痔的症状
- 治疗相对复杂
', 1250),

('程序员为什么容易得痔疮？', 'why-programmers-get-hemorrhoids', 'prevention', '
# 程序员为什么容易得痔疮？

作为一名程序员，你可能每天要在电脑前坐8-12小时。这种久坐不动的生活方式，正是痔疮的高危因素。

## 主要原因

### 1. 久坐不动
长时间保持坐姿，会导致肛门直肠部位的血液循环不畅，静脉丛淤血扩张。

### 2. 饮食不规律
经常点外卖、吃辛辣食物、喝水少，这些都会增加便秘的风险。

### 3. 缺乏运动
代码写多了，运动时间少了，肠道蠕动减慢。

### 4. 精神压力大
项目deadline、bug修复，精神长期处于紧张状态。

## 预防措施

1. **定时起身**：每1小时起身活动5-10分钟
2. **多喝水**：每天至少8杯水
3. **多吃纤维**：蔬菜、水果、全谷物
4. **提肛运动**：每天做几组提肛运动
5. **规律排便**：不要憋便，不要久蹲
', 2340),

('痔疮手术方式对比', 'hemorrhoid-surgery-comparison', 'treatment', '
# 痔疮手术方式对比

当保守治疗无效时，手术可能是必要的选择。以下是常见的手术方式：

## 1. 传统外剥内扎术 (Milligan-Morgan)

### 优点：
- 效果确切
- 适用范围广
- 费用较低

### 缺点：
- 术后疼痛明显
- 恢复时间较长
- 可能有肛门狭窄风险

## 2. PPH (吻合器痔上黏膜环切术)

### 优点：
- 疼痛较轻
- 恢复快
- 住院时间短

### 缺点：
- 费用较高
- 对严重外痔效果有限
- 可能有吻合口狭窄风险

## 3. RPH (自动痔疮套扎术)

### 优点：
- 操作简单
- 门诊即可完成
- 费用低

### 缺点：
- 主要适用于内痔
- 可能需要多次治疗

## 选择建议

具体选择哪种手术方式，需要根据痔疮的类型、严重程度以及个人情况，咨询专业医生。
', 1890);
```

- [ ] **Step 3: Commit**

```bash
git add supabase/
git commit -m "chore: add Supabase schema and seed data"
```

---

## Task 13: 构建和部署配置

**Files:**
- Modify: `vite.config.js`
- Create: `.github/workflows/deploy.yml` (可选)

- [ ] **Step 1: 更新 vite.config.js 支持生产构建**

```javascript
import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

export default defineConfig({
  plugins: [preact()],
  resolve: {
    alias: {
      'react': 'preact/compat',
      'react-dom': 'preact/compat'
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
```

- [ ] **Step 2: 添加 .gitignore**

```
node_modules
dist
.env
.env.local
.DS_Store
*.log
```

- [ ] **Step 3: Commit**

```bash
git add vite.config.js .gitignore
git commit -m "chore: update build configuration"
```

---

## Task 14: 运行和测试

- [ ] **Step 1: 本地开发测试**

Run: `npm run dev`
Expected: 开发服务器启动，访问 http://localhost:5173

- [ ] **Step 2: 生产构建测试**

Run: `npm run build`
Expected: 成功构建到 dist 目录

- [ ] **Step 3: 预览生产版本**

Run: `npm run preview`
Expected: 生产版本预览服务器启动

---

## 部署清单

### Supabase 设置
1. 在 supabase.com 创建新项目
2. 在 SQL Editor 中运行 `supabase/migrations/001_initial_schema.sql`
3. 运行 `supabase/seed.sql` 插入初始数据
4. 复制 Project URL 和 Anon Key 到 `.env` 文件

### 前端部署 (以 Vercel 为例)
1. 推送代码到 GitHub
2. 在 Vercel 导入项目
3. 设置环境变量：
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. 部署

---

## 后续优化建议

1. **图片优化**：添加医院图片上传功能
2. **地图集成**：显示医院位置地图
3. **医生信息**：添加医生列表和评分
4. **症状自测**：添加简单的症状评估工具
5. **社区功能**：治疗经验分享板块
6. **消息通知**：评论回复通知
7. **数据导出**：医院数据导出功能
