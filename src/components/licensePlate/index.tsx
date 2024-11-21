import { LicensePlate as LicensePlateInterface } from '@/interfaces/LicensePlate.interface'

interface LicensePlateProps {
  licensePlate: LicensePlateInterface
  type: 'simple' | 'outline' | 'color'
}

const LicensePlate = ({
  licensePlate,
  type = 'outline',
}: LicensePlateProps) => {
  return (
    <div
      className={`${
        type === 'simple'
          ? 'bg-slate-400/30 px-2 py-1'
          : 'px-3 py-2 border-[0.5px] border-white'
      } justify-between items-center gap-3 grid grid-cols-[auto,1fr,auto]  rounded-md`}
    >
      <div
        className={`border-[0.5px] border-white align-middle rounded-full w-5 h-5 text-sm text-center aspect-auto `}
      >
        {licensePlate.code}
      </div>
      <div className='text-center text-lg'>{licensePlate.plate}</div>
      <div className='[writing-mode:vertical-lr] [text-orientation:upright] text-sm'>
        {licensePlate.region.code}
      </div>
    </div>
  )
}

export default LicensePlate
