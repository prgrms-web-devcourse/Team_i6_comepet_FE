import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { BackgroundBox } from '@/components/BackgroundBox';
import { Place, Status, PetInformation, Date } from './Category';
import { GET } from '@/apis/axios';
import useSWR from 'swr';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const SearchModal = ({ isVisible, onSearch, onCloseModal, usedAt }) => {
  const { data: placeData } = useSWR('/cities', GET);
  const { data: animalData } = useSWR('/animals', GET);
  const [parameterObject, setParameterObject] = useState({});

  const handleAddParameters = (params) => {
    setParameterObject({ ...parameterObject, ...params });
  };

  return (
    <Wrapper isVisible={isVisible}>
      <BackgroundBox>
        <Form
          onSubmit={() => {
            onSearch(parameterObject);
            onCloseModal();
          }}>
          <CategoryWrapper>
            <Status onSelectOption={handleAddParameters} usedAt={usedAt} />
            <Place onSelectOption={handleAddParameters} placeData={placeData?.cities} />
            <PetInformation animalData={animalData?.animals} onSelectOption={handleAddParameters} />
            <Date onSelectOption={handleAddParameters} />
          </CategoryWrapper>
          <Button
            type="button"
            onClick={() => {
              onSearch(parameterObject);
              onCloseModal();
            }}>
            검색
          </Button>
          <CloseModalButton
            onClickCapture={(e) => {
              e.preventDefault();
              onCloseModal();
            }}>
            <StyledCloseRoundedIcon />
          </CloseModalButton>
        </Form>
      </BackgroundBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  position: absolute;
  bottom: -350%;
  left: 50%;
  transform: translate(-50%);
  z-index: 1001;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 31.2rem;
  padding: 1.8rem;
`;

const CategoryWrapper = styled.div``;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.brand};
  color: ${({ theme }) => theme.colors.normalWhite};
  border-radius: 0.4rem;
  height: 4rem;
  margin-top: 3rem;
`;

const CloseModalButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 1rem;
  padding: 0;
`;

const StyledCloseRoundedIcon = styled(CloseRoundedIcon)`
  font-size: 2rem;
`;

SearchModal.propTypes = {
  isVisible: PropTypes.bool,
  onSearch: PropTypes.func,
  onCloseModal: PropTypes.func,
  usedAt: PropTypes.string
};

export default SearchModal;
