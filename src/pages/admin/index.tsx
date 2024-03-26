import Report from '@app/components/report'
import AdminLayout from '@app/layout/admin'
import Link from 'next/link'

const ReportPage = () => {
  return (
    <AdminLayout>
      <Link href='/admin/report'>Report</Link>
    </AdminLayout>
  )
}

export default ReportPage
