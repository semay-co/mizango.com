import styled from 'styled-components'
// create a syled component for the license plate component
const LicensePlateStyle = styled.div`
  display: grid;
  grid-template-columns: auto;
  justify-content: start;

  .license-plate {
    display: grid;
    grid-auto-flow: column;
    justify-content: center;
    align-items: center;
    border: 1px solid
      ${({ theme }) => (theme as any)?.colors?.foreground || '#000'};
    border-radius: 5px;
    
    .plate-region {
      writing-mode: vertical-rl;
      text-orientation: upright;
      font-size: 1rem;
      margin: 1rem;
    }

    .plate-code {
      border: 1px solid
        ${({ theme }) => (theme as any)?.colors?.foreground || '#000'};
      margin: 1rem;
      text-align: center;
      font-size: 1rem;
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      display: grid;
      justify-content: center;
      align-content: center;
      box-shadow: 0 0 1px inset;
      font-weight: 600;
    }

    .plate-number {
      font-size: 2rem;
      min-width: 8rem;
      text-align: center;
    }
  }
`

export default LicensePlateStyle
