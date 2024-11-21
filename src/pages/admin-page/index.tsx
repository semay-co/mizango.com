import Report from '@/components/report'
import AdminLayout from '@/layout/admin-layout'
import Link from 'next/link'

const ReportPage = () => {
  return (
    <AdminLayout>
      <Link href='/admin/report'>Report</Link>
    </AdminLayout>
  )
}

export default ReportPage
