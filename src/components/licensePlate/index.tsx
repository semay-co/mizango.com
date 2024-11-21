import { LicensePlate as LicensePlateInterface } from '@/interfaces/LicensePlate.interface'
import Style from './style'

interface LicensePlateProps {
  licensePlate: LicensePlateInterface
}

const LicensePlate = ({ licensePlate }: LicensePlateProps) => {
  return (
    <Style>
      <div className='license-plate'>
        <div className='plate-code'>{licensePlate.code}</div>
        <div className='plate-number'>{licensePlate.plate}</div>
        <div className='plate-region'>{licensePlate.region.code}</div>
      </div>
    </Style>
  )
}

export default LicensePlate
