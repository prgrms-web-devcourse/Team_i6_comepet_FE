import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { SelectionBox } from '@/components/SelectionBox';

const SortHeader = ({ city, town, postLength, setSortingOrder }) => {
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
      {`${city} ${town} 검색 결과 ${postLength}건`}
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
  margin: 1.4rem 0;
  font-size: 1.2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.brand};
`;

SortHeader.propTypes = {
  city: PropTypes.string,
  town: PropTypes.string,
  postLength: PropTypes.number,
  setSortingOrder: PropTypes.func
};

export default SortHeader;
