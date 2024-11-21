import MainLayout from '@/layout/main-layout'
import type { NextPage } from 'next'

const AboutPage: NextPage = () => {
  return (
    <MainLayout>
      <div style={{ padding: '3rem 1rem' }}>
        <div>
          This website is owned and operated by{' '}
          <b>Ameer Nuri (penser.co@gmail.com)</b>
        </div>
        <b>+251961004658 | +251944108619</b>
      </div>
    </MainLayout>
  )
}

export default AboutPage
