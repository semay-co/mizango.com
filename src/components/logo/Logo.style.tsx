import styled from 'styled-components'

const Styled = styled.svg`
  svg {
    height: ${props => props.height};
  }

  path,
  polygon {
    fill: ${({ theme }) => theme.colors.foreground};
  }
`

export default Styled