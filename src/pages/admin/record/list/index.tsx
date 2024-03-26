import Records from '@app/components/record/list'
import AdminLayout from '@app/layout/admin'

const ReportPage = () => {
  return (
    <AdminLayout>
      <h1>Records</h1>
      <Records />
    </AdminLayout>
  )
}

export default ReportPage
