import styled from 'styled-components'

const Styled = styled.div`
  .weights-wrap {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0.5rem;

    .weight-time {
      font-size: 0.8rem;
      color: #ffffffaa;
      font-style: italic;
    }
  }
  .datepicker-wrap {
    display: grid;
    grid-template-columns: auto auto 1fr;
    align-items: center;
    gap: 1rem;
  }
  .table {
    display: table;
    width: 100%;
    border-spacing: 0;
    border: 1px solid black;
  }

  .thead {
    background-color: #ffffff55;
    .th {
      padding: 0.5rem;
    }
  }

  .mistake-row {
    background-color: #e75b5b54;
  }

  .unpaid-row {
    box-shadow: 0 0 0 100px #f1f11233 inset;
  }

  .tr {
    .td {
      border-bottom: 1px solid #ffffff55;
      padding: 0.5rem;
    }
    :last-child {
      .td {
        border-bottom: 0;
      }
    }
  }

  .serial {
    text-transform: uppercase;
  }
`

export default Styled
