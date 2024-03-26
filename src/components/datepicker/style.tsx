import styled from 'styled-components'

const Styled = styled.div`
  /* .react-datepicker-wrapper
  .react-datepicker__input-container
  .react-datepicker__tab-loop
  .react-datepicker__tab-loop__start
  .react-datepicker-popper
  .react-datepicker
  .react-datepicker__triangle
  .react-datepicker__navigation .react-datepicker__navigation--previous
  .react-datepicker__navigation .react-datepicker__navigation--next
  .react-datepicker__navigation-icon .react-datepicker__navigation-icon--next
  .react-datepicker__month-container
  .react-datepicker__header 
  .react-datepicker__current-month
  .react-datepicker__header__dropdown .react-datepicker__header__dropdown--scroll
  .react-datepicker__day-names
  .react-datepicker__day-name
  .react-datepicker__month
  .react-datepicker__week
  .react-datepicker__day
  .react-datepicker__day--weekend 
  .react-datepicker__day--outside-month */

  .react-datepicker {
    background: #000000;
    display: grid;
    grid-template-areas: 'prev next' 'days days';

    .react-datepicker__navigation {
      background: none;
      border: none;
      cursor: pointer;
      outline: none;
      padding: 0.5rem;
      transition: 0.3s;
      color: #fff;

      .react-datepicker__navigation--previous {
        grid-area: prev;

        &:before {
          content: '<';
        }
      }

      .react-datepicker__navigation--next {
        grid-area: next;
      }
    }

    .react-datepicker__month-container {
      grid-area: days;
    }
  }

  .react-datepicker__input-container input {
    background: none;
    border: 1px solid #fff;
    padding: 0.5rem;
    color: #fff;
  }

  .react-datepicker-popper {
    display: grid;
    background: #000000;
    padding: 1rem;
    border-radius: 0.5rem;
    border: 1px solid #ffffff55;
  }

  .react-datepicker__current-month {
    padding: 0.5rem;
    text-align: center;
    font-size: 1.5rem;
    font-weight: 600;
  }

  .react-datepicker__day-names,
  .react-datepicker__week {
    display: grid;
    grid-template-columns: repeat(7, 1fr);

    .react-datepicker__day {
      text-align: center;
      padding: 0.5rem;
      cursor: pointer;
      transition: 0.3s;
      border-radius: 5rem;
      width: 2rem;
      height: 2rem;

      &:hover {
        background: #ffffff33;
      }
    }

    .react-datepicker__day--selected {
      border: 1px solid #ffffff55x;
      background: #4c5e3ebb;
    }

    .react-datepicker__day--today {
      border: 1px solid #ffffff55x;
      background: #4c5e3ebb;
    }

    .react-datepicker__day-name {
      text-align: center;
      font-weight: 600;
    }

    .react-datepicker__day--selected {
      background: #ffffff33;
    }

    .react-datepicker__day--weekend {
      color: #ffcccc;
    }
    .react-datepicker__day--outside-month {
      color: #ffffff55;
    }
  }
`

export default Styled
