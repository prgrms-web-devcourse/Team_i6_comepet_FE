import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { SelectionBox } from '@/components/SelectionBox';

const STATUS = Object.freeze({
  MISSING: '실종',
  DETECTION: '목격',
  PROTECTION: '보호',
  COMPLETION: '완료'
});

const SortHeader = ({ city, town, postLength, setSortingOrder, filterConditions }) => {
  const handleChange = ({ target }) => {
    const { value } = target;

    const switchOrderBy = (value) => {
      switch (value) {
        case '오래된순 정렬':
          setSortingOrder('ASC');
          break;
        case '최신순 정렬':
          setSortingOrder('DESC');
          break;
      }
    };

    switchOrderBy(value);
  };

  return (
    <Wrapper>
      {(isFilterConditionApplied(filterConditions) &&
        makeFilterConditionsString(filterConditions) + ` 검색 결과 ${postLength}건`) ||
        `${city} ${town} 검색 결과 ${postLength}건`}
      <SelectionBox
        options={['오래된순 정렬']}
        defaultOption="최신순 정렬"
        fontSize="1.2rem"
        fontColor="normalGray"
        usedAt="filter"
        onChange={handleChange}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 61.2rem;
  margin: 1.4rem auto;
  font-size: 1.2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.brand};

  @media screen and (min-width: 76.8rem) {
    width: 76.8rem;
  }
`;

SortHeader.propTypes = {
  city: PropTypes.string,
  town: PropTypes.string,
  postLength: PropTypes.number,
  setSortingOrder: PropTypes.func,
  filterConditions: PropTypes.object
};

export default SortHeader;

const isFilterConditionApplied = (filterConditionObject) =>
  filterConditionObject && Object.keys(filterConditionObject).length;

const makeFilterConditionsString = (filterConditionObject) => {
  let res = '';
  filterConditionObject['cityName'] && (res += filterConditionObject['cityName']);
  filterConditionObject['townName'] && (res += ' ' + filterConditionObject['townName']);
  filterConditionObject['status'] && (res += ' ' + STATUS[filterConditionObject['status']]);
  return res;
};
