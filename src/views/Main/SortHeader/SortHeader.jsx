import React, { useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { SelectionBox } from '@/components/SelectionBox';

const STATUS = Object.freeze({
  MISSING: '실종',
  DETECTION: '목격',
  PROTECTION: '보호',
  COMPLETION: '완료'
});

const GENDER = Object.freeze({
  MALE: '수컷',
  FEMALE: '암컷',
  UNKNOWN: '모르는 성별'
});

const SortHeader = ({ postLength, sortingOrder, setSortingOrder, filterConditions }) => {
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

  const selectionBoxRef = useRef(null);

  useEffect(() => {
    console.log('sortingOrder', sortingOrder);

    if (sortingOrder === 'DESC') {
      selectionBoxRef.current[0].selected = true;
      return;
    }
    if (sortingOrder === 'ASC') {
      selectionBoxRef.current[1].selected = true;
      return;
    }
  }, [sortingOrder]);

  return (
    <Wrapper>
      {isFilterConditionApplied(filterConditions) ? (
        <span>
          <HighLight>{makeFilterConditionsString(filterConditions)}</HighLight>
          {` 동물 검색 결과 ${postLength}건`}
        </span>
      ) : (
        <span>{`전체 게시글 검색 결과 ${postLength}건`}</span>
      )}
      <SelectionBox
        options={['오래된순 정렬']}
        defaultOption="최신순 정렬"
        fontSize="1.2rem"
        fontColor="normalGray"
        usedAt="filter"
        onChange={handleChange}
        propRef={selectionBoxRef}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.4rem 0;
  font-size: 1.2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.brand};
`;

const HighLight = styled.span`
  color: ${({ theme }) => theme.colors.normalGreen};
`;

SortHeader.propTypes = {
  postLength: PropTypes.number,
  sortingOrder: PropTypes.string,
  setSortingOrder: PropTypes.func,
  filterConditions: PropTypes.object
};

export default SortHeader;

const isFilterConditionApplied = (filterConditionObject) =>
  filterConditionObject && Object.values(filterConditionObject).some((boolean) => boolean);

// 장소, 날짜, 종류(분기), 성별(분기), 상태
const makeFilterConditionsString = (filterConditionObject) => {
  let res = '';
  filterConditionObject['cityName'] && (res += filterConditionObject['cityName']);
  filterConditionObject['townName'] && (res += ' ' + filterConditionObject['townName']);
  filterConditionObject['start'] && (res += ' ' + filterConditionObject['start']);
  filterConditionObject['end'] && (res += ' ~ ' + filterConditionObject['end']);
  filterConditionObject['animalString'] &&
    (res +=
      ' ' +
      ((filterConditionObject['animalString'] === '개' && '강아지') ||
        filterConditionObject['animalString']));
  filterConditionObject['animalKindName'] && (res += ' ' + filterConditionObject['animalKindName']);
  filterConditionObject['sex'] && (res += ' ' + GENDER[filterConditionObject['sex']]);
  filterConditionObject['status'] && (res += ' ' + STATUS[filterConditionObject['status']]);
  return res;
};
