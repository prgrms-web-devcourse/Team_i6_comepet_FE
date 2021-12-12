import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import LineBreakWrapper from '../Common/LineBreakWrapper';
import { Label } from '@/components/Label';
import { SelectionBox } from '@/components/SelectionBox';

// TODO:
// 2020년 12월 30일에서 년도를 2021년으로 바꾸면 색깔이 초기화되지 않는 버그

const Date = ({ margin, onChange }) => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  const handleChange = ({ target }) => {
    if (target[0].textContent === '년') {
      Number.isNaN(Number(target.value))
        ? setSelectedYear(null)
        : setSelectedYear(Number(target.value));
      return;
    }

    if (target[0].textContent === '월') {
      Number.isNaN(Number(target.value))
        ? setSelectedMonth(null)
        : setSelectedMonth(Number(target.value));
      return;
    }

    if (target[0].textContent === '일') {
      Number.isNaN(Number(target.value))
        ? setSelectedDay(null)
        : setSelectedDay(Number(target.value));
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
        target: { name: 'date', value: `${selectedYear}-${selectedMonth}-${selectedDay}` }
      });
    }
  }, [selectedYear, selectedMonth, selectedDay]);

  return (
    <Wrapper margin={margin}>
      <Label forHtml="status" bgColor="brand">
        날짜
      </Label>
      <LineBreakWrapper margin="1.8rem 0 0 0">
        <SelectionBox
          id="status"
          onSelectChange={handleChange}
          options={getRangeOfYear()}
          defaultOption="년"
          required={true}
        />
        <SelectionBox
          id="status"
          onSelectChange={handleChange}
          options={getRangeOfMonth(selectedYear)}
          defaultOption="월"
          required={true}
          margin="0 0 0 2rem"
        />
        <SelectionBox
          id="status"
          onSelectChange={handleChange}
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
  const differenceBetween1970AndThisYear = thisYear - 1970 + 1;
  const res = new Array(differenceBetween1970AndThisYear).fill(0).map((_, i) => i + 1970);
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
const February = '2';
