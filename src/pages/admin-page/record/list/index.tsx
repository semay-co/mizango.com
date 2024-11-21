import Records from '@/components/record/list'
import AdminLayout from '@/layout/admin'

const ReportPage = () => {
  return (
    <AdminLayout>
      <h1>Records</h1>
      <Records />
    </AdminLayout>
  )
}

export default ReportPage
