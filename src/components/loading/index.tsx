import { Oval } from 'react-loader-spinner'

const Loading = () => {
  return (
    <Oval
      visible={true}
      height={50}
      width={50}
      color='#fff'
      secondaryColor='#fff8'
    />
  )
}

export default Loading
