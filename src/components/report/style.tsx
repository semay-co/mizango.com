import styled from 'styled-components'

const Styled = styled.div`
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

  .manual-input {
    color: yellow;

    &::before {
      content: 'MANUAL';
      padding: 10px;
      font-size: .8rem;
      border-radius: 5px;
      # border: 1px solid yellow;
    }
  }

  .weights-list {
    padding: 0;
    margin: 0;

    li {
      text-align: right;
      padding: 0;
      list-style: none;
      &::after {
        content: 'KG';
        padding: 10px;
        font-size: .6rem;
      }
    }
  }
`

export default Styled
