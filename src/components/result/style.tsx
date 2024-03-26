import styled from 'styled-components'

const Styled = styled.div`
  .result-wrap {
    display: grid;
    grid-template-columns: auto;
    gap: 1rem;
  }

  .result-wrap.mistake-result {
    background: red;
    color: #ffffff88;
    z-index: 1;
  }

  .mistake-stamp {
    position: absolute;
    transform: rotate(-45deg);
    color: #ffffff66;
    z-index: 10;
    font-size: 100px;
    font-weight: bold;
    top: 180px;
    left: calc(50vw - 170px);
  }

  .serial {
    display: grid;
    grid-template-columns: auto auto;
    justify-content: start;
    align-items: center;
    gap: 0.5rem;

    div {
      text-transform: uppercase;
    }
  }

  .weight-row {
    display: grid;
    grid-auto-flow: column;
    gap: 1rem;
    grid-template-columns: auto 1fr;

    .weight-number {
      width: 5rem;
      height: 5rem;
      border: 1px solid ${({ theme }) => theme.colors.foreground || '#000'};
      display: grid;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      font-size: 2rem;
      font-weight: bold;
    }

    .weight-time {
      opacity: 0.6;
      font-weight: normal;
    }

    .weight-value {
      font-weight: bold;
      font-size: 2rem;

      &.weight-result {
        font-size: 3rem;
      }
    }
  }
`

export default Styled
