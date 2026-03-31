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