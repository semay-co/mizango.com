import styled from 'styled-components'

const Styled = styled.svg<{ height?: string | number | undefined }>`
  svg {
    height: ${(props) => props.height};
  }

  path,
  polygon {
    fill: ${({ theme }) => theme.colors.foreground};
  }
`

export default Styled
