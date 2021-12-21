import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { BackgroundBox } from '@/components/BackgroundBox';
import { Button } from '@/components/Button';
import { Place, Status } from './Category';
import useParameter from '@/hooks/useParameter';
import { GET } from '@/apis/axios';
import useSWR from 'swr';

const SearchModal = ({ isVisible, left, top, right, bottom, translate, onSearch }) => {
  const { parameterObject, handleAddParameters } = useParameter('');

  const { data: placeData } = useSWR('/cities', GET);

  if (!placeData) return <div></div>;

  return (
    <Wrapper
      isVisible={isVisible}
      top={top}
      left={left}
      right={right}
      bottom={bottom}
      translate={translate}>
      <BackgroundBox>
        <Form width="31.2rem" padding="1.8rem" onSubmit={() => onSearch(parameterObject)}>
          <CategoryWrapper>
            <Status onSelectOption={handleAddParameters} />
            <Place
              margin="1rem 0 0 0"
              onSelectOption={handleAddParameters}
              placeData={placeData.cities}
            />
          </CategoryWrapper>
          <Button bgColor="brand" margin="2.4rem 0 0 0" onClick={() => onSearch(parameterObject)}>
            검색
          </Button>
        </Form>
      </BackgroundBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  bottom: ${({ bottom }) => bottom};
  right: ${({ right }) => right};
  transform: ${({ translate }) => translate};
  z-index: 1001;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  padding: ${({ padding }) => padding};
`;

const CategoryWrapper = styled.div`
  flex-grow: 1;
`;

SearchModal.propTypes = {
  isVisible: PropTypes.bool,
  place: PropTypes.string,
  top: PropTypes.string,
  left: PropTypes.string,
  right: PropTypes.string,
  bottom: PropTypes.string,
  translate: PropTypes.string,
  onSearch: PropTypes.func
};

export default SearchModal;
