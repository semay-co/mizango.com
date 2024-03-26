import styled from 'styled-components'

const Styled = styled.svg<{ height?: number }>`
  svg {
    height: ${(props) => props.height};
  }

  path,
  polygon {
    fill: ${({ theme }) => theme.colors.foreground};
  }
`

export default Styled
