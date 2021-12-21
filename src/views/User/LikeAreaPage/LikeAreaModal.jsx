import React, { useState, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import LineBreakWrapper from '@/views/Post/PostCreatePage/Category/Common/LineBreakWrapper';
import { Modal } from '@/components/Modal';
import { Label } from '@/components/Label';
import { SelectionBox } from '@/components/SelectionBox';
import { BackgroundBox } from '@/components/BackgroundBox';
import { Button } from '@/components/Button';

const LikeAreaModal = ({ placeData, onClose, checkOut, isDefaultArea }) => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedTown, setSelectedTown] = useState(null);
  const [selectedTownId, setSelectedTownId] = useState(null);

  const townRef = useRef(null);
  const Areas = placeData?.cities;

  const cities = useMemo(() => {
    const res = Areas?.map(({ name }) => name);
    return res;
  }, [placeData]);

  const towns = useMemo(() => {
    const res = Areas?.find(({ name }) => name === selectedCity);
    return res?.towns.map(({ name }) => name);
  }, [selectedCity, placeData]);

  const handleChange = (e) => {
    if (isCitySelection(e)) {
      if (!isDefaultOptionSelected(e)) {
        setSelectedCity(e.target.value);
      } else if (isDefaultOptionSelected(e)) {
        setSelectedCity(null);
      }
      townRef.current[0].selected = true;
    }
    if (isTownSelection(e)) {
      if (!isDefaultOptionSelected(e)) {
        const towns = Areas.find(({ name }) => name === selectedCity).towns;
        const selectedTownId = towns.find(({ name }) => name === e.target.value).id;
        setSelectedTownId(selectedTownId);
        setSelectedTown(e.target.value);
      } else if (isDefaultOptionSelected(e)) {
        setSelectedTown(null);
      }
    }
  };

  const handleOnCheckOut = () => {
    checkOut({ townId: selectedTownId, townName: selectedTown, defaultArea: isDefaultArea });
    onClose();
  };

  return (
    <Modal maxWidth="30rem" onClose={onClose}>
      <BackgroundBox width="30rem" height="40rem">
        <Wrapper>
          <Label forHtml="areas" bgColor="brand" fontSize="0.8rem">
            장소
          </Label>
          <LineBreakWrapper margin="1.8rem 0 0 0.8rem">
            <SelectionBox
              id="sido"
              options={cities || []}
              defaultOption="시/도"
              required={true}
              fontSize="1rem"
              fontColor="lightGray"
              isColored="true"
              onChange={handleChange}
            />
            <SelectionBox
              id="sigungu"
              options={towns || []}
              defaultOption="시/군/구"
              required={true}
              margin="0 0 0 2rem"
              fontSize="1rem"
              fontColor="lightGray"
              isColored="true"
              onChange={handleChange}
              propRef={townRef}
            />
          </LineBreakWrapper>
          <Button bgColor="brand" margin="22rem auto" onClick={handleOnCheckOut}>
            선택하기
          </Button>
        </Wrapper>
      </BackgroundBox>
    </Modal>
  );
};

const Wrapper = styled.div`
  padding: 2.4rem;
  width: 100%;
  height: 100%;
`;

LikeAreaModal.propTypes = {
  placeData: PropTypes.object.isRequired,
  checkOut: PropTypes.func.isRequired,
  isDefaultArea: PropTypes.bool,
  onClose: PropTypes.func.isRequired
};

export default LikeAreaModal;

const isDefaultOptionSelected = (e) => e.target[0].textContent === e.target.value;
const isCitySelection = (e) => e.target[0].textContent === '시/도';
const isTownSelection = (e) => e.target[0].textContent === '시/군/구';
