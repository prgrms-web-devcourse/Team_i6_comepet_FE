import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { BackgroundBox } from '@/components/BackgroundBox';
import { Button } from '@/components/Button';
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
          width="31.2rem"
          padding="1.8rem"
          onSubmit={() => {
            onSearch(parameterObject);
            onCloseModal();
          }}>
          <CategoryWrapper>
            <Status
              onSelectOption={handleAddParameters}
              display={usedAt === 'ShelterPostPage' ? 'none' : 'block'}
            />
            <Place
              margin="1.6rem 0 0 0"
              onSelectOption={handleAddParameters}
              placeData={placeData?.cities}
            />
            <PetInformation
              animalData={animalData?.animals}
              margin="1.6rem 0 0 0"
              onSelectOption={handleAddParameters}
            />
            <Date margin="1.6rem 0 0 0" onSelectOption={handleAddParameters} />
          </CategoryWrapper>
          <Button
            bgColor="brand"
            margin="5rem 0 0 0"
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
  bottom: -400%;
  left: 50%;
  transform: translate(-50%);
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
  className: PropTypes.string,
  isVisible: PropTypes.bool,
  onSearch: PropTypes.func,
  onCloseModal: PropTypes.func,
  usedAt: PropTypes.string
};

export default SearchModal;
