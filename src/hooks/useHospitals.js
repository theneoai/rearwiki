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
