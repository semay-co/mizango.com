'use client'

import { useRouter } from 'next/navigation'

const Report = () => {
  const router = useRouter()

  router.push('/admin')
  return <div>Report page tbd</div>
}

export default Report
