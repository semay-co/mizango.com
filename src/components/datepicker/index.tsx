import Picker from 'react-datepicker'
import Styled from './style'

interface DatepickerProps {
  startDate?: Date
  onChange: (date: Date) => void
}

const Datepicker = ({ startDate, onChange }: DatepickerProps) => {
  return (
    <Styled>
      <Picker startDate={startDate} onChange={onChange} />
    </Styled>
  )
}

export default Datepicker
