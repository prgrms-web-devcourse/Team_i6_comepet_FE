import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import LineBreakWrapper from '../Common/LineBreakWrapper';
import { Label } from '@/components/Label';
import { SelectionBox } from '@/components/SelectionBox';

const Date = ({ margin, onChange }) => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  const handleChange = (e) => {
    if (isYearSelection(e)) {
      isDefalutOptionSelected(e) ? setSelectedYear(null) : setSelectedYear(Number(e.target.value));
      return;
    }

    if (isMonthSelection(e)) {
      isDefalutOptionSelected(e)
        ? setSelectedMonth(null)
        : setSelectedMonth(Number(e.target.value));
      return;
    }

    if (isDaySelection(e)) {
      isDefalutOptionSelected(e) ? setSelectedDay(null) : setSelectedDay(Number(e.target.value));
      return;
    }
  };

  useEffect(() => {
    if (
      !Number.isNaN(Number(selectedYear)) &&
      selectedYear !== null &&
      selectedYear !== undefined &&
      !Number.isNaN(Number(selectedMonth)) &&
      selectedMonth !== null &&
      selectedMonth !== undefined &&
      !Number.isNaN(Number(selectedDay)) &&
      selectedDay !== null &&
      selectedDay !== undefined
    ) {
      onChange({
        target: {
          name: 'date',
          value: `${selectedYear}-${makeYYYYMMDDForm(selectedMonth)}-${makeYYYYMMDDForm(
            selectedDay
          )}`
        }
      });
    } else {
      onChange({
        target: { name: 'date', value: null }
      });
    }
  }, [selectedYear, selectedMonth, selectedDay]);

  return (
    <Wrapper margin={margin}>
      <Label forHtml="year" bgColor="brand">
        날짜
      </Label>
      <LineBreakWrapper margin="1.8rem 0 0 0">
        <SelectionBox
          id="year"
          onChange={handleChange}
          options={getRangeOfYear()}
          defaultOption="년"
          required={true}
        />
        <SelectionBox
          id="month"
          onChange={handleChange}
          options={getRangeOfMonth(selectedYear)}
          defaultOption="월"
          required={true}
          margin="0 0 0 2rem"
        />
        <SelectionBox
          id="day"
          onChange={handleChange}
          options={getRangeOfDay(selectedMonth, selectedYear)}
          defaultOption="일"
          required={true}
          margin="0 0 0 2rem"
        />
      </LineBreakWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: ${({ margin }) => margin};
`;

Date.propTypes = {
  onChange: PropTypes.func.isRequired,
  margin: PropTypes.string
};

export default Date;

const getRangeOfYear = () => {
  const thisYear = new window.Date().getFullYear();
  const TenYearsAgo = thisYear - 10;
  const res = new Array(thisYear - TenYearsAgo + 1).fill(0).map((_, i) => i + TenYearsAgo);
  return res;
};

const getRangeOfMonth = (selectedYear) => {
  const thisYear = new window.Date().getFullYear();

  if (selectedYear === thisYear) {
    const thisMonth = new window.Date().getMonth() + 1;
    const res = new Array(thisMonth).fill(0).map((_, i) => i + 1);
    return res;
  }

  const res = new Array(12).fill(0).map((_, i) => i + 1);
  return res;
};

const getRangeOfDay = (selectedMonth, selectedYear) => {
  const thisYear = new window.Date().getFullYear();
  const thisMonth = new window.Date().getMonth() + 1;
  let res = null;

  if (selectedYear === thisYear && selectedMonth === thisMonth) {
    const today = new window.Date().getDate();
    res = new Array(today).fill(0).map((_, i) => i + 1);
    return res;
  }

  if (selectedMonth === February) {
    if (isLeapYear(selectedYear)) {
      res = new Array(29).fill(0).map((_, i) => i + 1);
      return res;
    }

    if (!isLeapYear(selectedYear)) {
      res = new Array(28).fill(0).map((_, i) => i + 1);
      return res;
    }
  }

  if (selectedMonth !== February) {
    if (isMonthThatHas30Days(selectedMonth)) {
      res = new Array(30).fill(0).map((_, i) => i + 1);
      return res;
    }

    if (isMonthThatHas31Days(selectedMonth)) {
      res = new Array(31).fill(0).map((_, i) => i + 1);
      return res;
    }
  }

  return (res = []);
};

const isLeapYear = (year) => {
  return (
    (year % 4 === 0 && year % 100 !== 0) || (year % 4 === 0 && year % 100 === 0 && year % 400 === 0)
  );
};

const isMonthThatHas31Days = (month) => [1, 3, 5, 7, 8, 10, 12].includes(month);
const isMonthThatHas30Days = (month) => [4, 6, 9, 11].includes(month);
const isYearSelection = (e) => e.target[0].textContent === '년';
const isMonthSelection = (e) => e.target[0].textContent === '월';
const isDaySelection = (e) => e.target[0].textContent === '일';
const isDefalutOptionSelected = (e) => e.target[0].textContent === e.target.value;
const makeYYYYMMDDForm = (number) => (number < 10 && `0${number}`) || number;
const February = 2;
