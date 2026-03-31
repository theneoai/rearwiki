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
