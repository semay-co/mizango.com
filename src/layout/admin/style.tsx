import styled from 'styled-components'

const Styled = styled.div`
  .header {
    display: grid;
    /* justify-content: space-between; */
    /* align-items: center; */
    padding: 1rem;
    grid-template-columns: 1fr auto;

    .account-info {
      display: grid;
      gap: 1rem;
      grid-auto-flow: column;
      align-items: center;

      button {
        background: none;
        border: 1px solid #ffffff;
        padding: 0.5rem;
        border-radius: 0.25rem;
        color: #ffffff;
        cursor: pointer;
      }
    }
  }
`

export default Styled
