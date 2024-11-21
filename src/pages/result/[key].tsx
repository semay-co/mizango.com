import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Result from '@/components/result'
import MainLayout from '@/layout/main-layout'
import Loading from '@/components/loading'

const ResultPage = () => {
  const router = useRouter()

  const [data, setData] = useState({} as any)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!router.isReady) return
    setLoading(true)

    const key = router.query.key

    console.log({ key })

    fetch(`/api/getRecordByShortKey/${key}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res)
        setLoading(false)
      })
  }, [router.isReady])

  return (
    <MainLayout>
      {loading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <Result data={data} />
      )}
    </MainLayout>
  )
}

export default ResultPage
