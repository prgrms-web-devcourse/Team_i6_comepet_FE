import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import LineBreakWrapper from '../LineBreakWrapper/LineBreakWrapper';
import { Label } from '@/components/Label';
import { SelectionBox } from '@/components/SelectionBox';

const Date = ({ margin, onSelectOption }) => {
  const [startYear, setStartYear] = useState(null);
  const [startMonth, setStateMonth] = useState(null);
  const [startDay, setStartDay] = useState(null);

  const [endYear, setEndYear] = useState(null);
  const [endMonth, setEndMonth] = useState(null);
  const [endDay, setEndDay] = useState(null);

  const handleChangeStartDate = (e) => {
    if (isYearSelection(e)) {
      isDefalutOptionSelected(e) ? setStartYear(null) : setStartYear(Number(e.target.value));
      return;
    }

    if (isMonthSelection(e)) {
      isDefalutOptionSelected(e) ? setStateMonth(null) : setStateMonth(Number(e.target.value));
      return;
    }

    if (isDaySelection(e)) {
      isDefalutOptionSelected(e) ? setStartDay(null) : setStartDay(Number(e.target.value));
      return;
    }
  };

  const handleChangeEndDate = (e) => {
    if (isYearSelection(e)) {
      isDefalutOptionSelected(e) ? setEndYear(null) : setEndYear(Number(e.target.value));
      return;
    }

    if (isMonthSelection(e)) {
      isDefalutOptionSelected(e) ? setEndMonth(null) : setEndMonth(Number(e.target.value));
      return;
    }

    if (isDaySelection(e)) {
      isDefalutOptionSelected(e) ? setEndDay(null) : setEndDay(Number(e.target.value));
      return;
    }
  };

  useEffect(() => {
    if (
      !Number.isNaN(Number(startYear)) &&
      startYear !== null &&
      startYear !== undefined &&
      !Number.isNaN(Number(startMonth)) &&
      startMonth !== null &&
      startMonth !== undefined &&
      !Number.isNaN(Number(startDay)) &&
      startDay !== null &&
      startDay !== undefined
    ) {
      onSelectOption({
        start: `${startYear}-${makeYYYYMMDDForm(startMonth)}-${makeYYYYMMDDForm(startDay)}`
      });
    } else {
      onSelectOption({
        start: null
      });
    }
  }, [startYear, startMonth, startDay]);

  useEffect(() => {
    if (
      !Number.isNaN(Number(endYear)) &&
      endYear !== null &&
      endYear !== undefined &&
      !Number.isNaN(Number(endMonth)) &&
      endMonth !== null &&
      endMonth !== undefined &&
      !Number.isNaN(Number(endDay)) &&
      endDay !== null &&
      endDay !== undefined
    ) {
      onSelectOption({
        end: `${endYear}-${makeYYYYMMDDForm(endMonth)}-${makeYYYYMMDDForm(endDay)}`
      });
    } else {
      onSelectOption({
        end: null
      });
    }
  }, [endYear, endMonth, endDay]);

  return (
    <Wrapper margin={margin}>
      <Label forHtml="year" bgColor="brand" size="xsmall">
        시작 날짜
      </Label>
      <LineBreakWrapper margin="1.2rem 0 0 0">
        <SelectionBox
          id="year"
          onChange={handleChangeStartDate}
          options={getRangeOfYear()}
          defaultOption="년"
          fontSize="1.2rem"
        />
        <SelectionBox
          id="month"
          onChange={handleChangeStartDate}
          options={getRangeOfMonth(startYear)}
          required={startYear && true}
          defaultOption="월"
          margin="0 0 0 2rem"
          fontSize="1.2rem"
        />
        <SelectionBox
          id="day"
          onChange={handleChangeStartDate}
          options={getRangeOfDay(startMonth, startYear)}
          required={startYear && true}
          defaultOption="일"
          margin="0 0 0 2rem"
          fontSize="1.2rem"
        />
      </LineBreakWrapper>
      <LineBreakWrapper margin="1.2rem 0 0 0">
        <Label forHtml="year" bgColor="brand" size="xsmall">
          종료 날짜
        </Label>
        <LineBreakWrapper margin="1.2rem 0 0 0">
          <SelectionBox
            id="year"
            onChange={handleChangeEndDate}
            options={getRangeOfYear(startYear)}
            defaultOption="년"
            fontSize="1.2rem"
            disabled={!(startYear && startMonth && startDay)}
          />
          <SelectionBox
            id="month"
            onChange={handleChangeEndDate}
            options={getRangeOfMonth(endYear, startYear, startMonth)}
            defaultOption="월"
            margin="0 0 0 2rem"
            fontSize="1.2rem"
            disabled={!(startYear && startMonth && startDay)}
            required={endYear && true}
          />
          <SelectionBox
            id="day"
            onChange={handleChangeEndDate}
            options={getRangeOfDay(endMonth, endYear, startDay, startMonth, startYear)}
            defaultOption="일"
            margin="0 0 0 2rem"
            fontSize="1.2rem"
            disabled={!(startYear && startMonth && startDay)}
            required={endYear && true}
          />
        </LineBreakWrapper>
      </LineBreakWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: ${({ margin }) => margin};
`;

Date.propTypes = {
  margin: PropTypes.string,
  onSelectOption: PropTypes.func
};

export default Date;

const getRangeOfYear = (startYear) => {
  if (!startYear) {
    const thisYear = new window.Date().getFullYear();
    const TenYearsAgo = thisYear - 10;
    const res = new Array(thisYear - TenYearsAgo + 1).fill(0).map((_, i) => i + TenYearsAgo);
    return res;
  }

  if (startYear) {
    const thisYear = new window.Date().getFullYear();
    const res = new Array(thisYear - startYear + 1).fill(0).map((_, i) => i + startYear);
    return res;
  }
};

const getRangeOfMonth = (selectedYear, startYear, startMonth) => {
  const thisYear = new window.Date().getFullYear();

  if (selectedYear === thisYear) {
    if (startYear === selectedYear) {
      const thisMonth = new window.Date().getMonth() + 1;
      const res = new Array(thisMonth - startMonth + 1).fill(0).map((_, i) => i + startMonth);
      return res;
    }

    if (startYear !== selectedYear) {
      const thisMonth = new window.Date().getMonth() + 1;
      const res = new Array(thisMonth).fill(0).map((_, i) => i + 1);
      return res;
    }
  }

  if (selectedYear !== thisYear) {
    if (startYear === selectedYear) {
      const res = new Array(12 - startMonth).fill(0).map((_, i) => i + startMonth);
      return res;
    }

    if (startYear !== selectedYear) {
      const res = new Array(12).fill(0).map((_, i) => i + 1);
      return res;
    }
  }
};

const getRangeOfDay = (selectedMonth, selectedYear, startDay, startMonth, startYear) => {
  const thisYear = new window.Date().getFullYear();
  const thisMonth = new window.Date().getMonth() + 1;
  let res = null;

  if (selectedYear === thisYear && selectedMonth === thisMonth) {
    if (startYear === selectedYear && startMonth === selectedMonth) {
      const today = new window.Date().getDate();
      res = new Array(today - startDay + 1).fill(0).map((_, i) => i + startDay);
      return res;
    }
    const today = new window.Date().getDate();
    res = new Array(today).fill(0).map((_, i) => i + 1);
    return res;
  }

  if (selectedMonth === February) {
    if (isLeapYear(selectedYear)) {
      if (selectedYear === startYear && startMonth === selectedMonth) {
        res = new Array(29 - startDay + 1).fill(0).map((_, i) => i + startDay);
        return res;
      }

      res = new Array(29).fill(0).map((_, i) => i + 1);
      return res;
    }

    if (!isLeapYear(selectedYear)) {
      if (selectedYear === startYear && startMonth === selectedMonth) {
        res = new Array(28 - startDay + 1).fill(0).map((_, i) => i + startDay);
        return res;
      }

      res = new Array(28).fill(0).map((_, i) => i + 1);
      return res;
    }
  }

  if (selectedMonth !== February) {
    if (isMonthThatHas30Days(selectedMonth)) {
      if (selectedYear === startYear && startMonth === selectedMonth) {
        res = new Array(30 - startDay + 1).fill(0).map((_, i) => i + startDay);
        return res;
      }

      res = new Array(30).fill(0).map((_, i) => i + 1);
      return res;
    }

    if (isMonthThatHas31Days(selectedMonth)) {
      if (selectedYear === startYear && startMonth === selectedMonth) {
        res = new Array(31 - startDay + 1).fill(0).map((_, i) => i + startDay);
        return res;
      }

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
