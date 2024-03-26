import { MainLayout } from '@app/layout/Main'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <MainLayout>
      <div style={{ maxWidth: 500, padding: 10 }}>
        <p style={{ fontFamily: 'NokiaPureHeadline' }}>
          ዘመናዊ የምድር ሚዛን እቃዎች ማቅረብ እና የሚዛን ሶፍትዌር ሲስተም ዝርጋታ እንሰራለን።
        </p>
        <h3>Modern Software System Installation</h3>
        <ul>
          <li>Operator dashboard</li>
          <li>Result printing</li>
          <li>IP Camera integration</li>
          <li>SMS result delivery</li>
          <li>Online result publishing</li>
        </ul>
        <h3>Weighbridge Parts</h3>
        <ul>
          <li>Junction boxes</li>
          <li>Digital load cells</li>
          <li>Digital indicators</li>
          <li>Analog to digital convertors</li>
        </ul>
        <p>Please contact us on +251-94-410-8619 or visit our shop</p>
      </div>
    </MainLayout>
  )
}

export default Home
