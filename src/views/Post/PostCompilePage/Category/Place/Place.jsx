import React, { useState, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import LineBreakWrapper from '../Common/LineBreakWrapper';
import { Label } from '@/components/Label';
import { SelectionBox } from '@/components/SelectionBox';
import { Input } from '@/components/Input';

const Place = ({ margin, placeData, onChange }) => {
  const [selectedCity, setSelectedCity] = useState(null);
  const townRef = useRef(null);

  const cities = useMemo(() => {
    const res = placeData?.map(({ name }) => name);
    return res;
  }, [placeData]);

  const towns = useMemo(() => {
    const res = placeData?.find(({ name }) => name === selectedCity);
    return res?.towns.map(({ name }) => name);
  }, [selectedCity, placeData]);

  const handleChange = (e) => {
    if (isCitySelection(e)) {
      if (isDefaultOptionSelected(e)) {
        onChange({
          target: [
            { name: 'cityId', value: null },
            { name: 'townId', value: null }
          ]
        });
        setSelectedCity(null);
      } else if (!isDefaultOptionSelected(e)) {
        townRef.current[0].selected = true;
        const selectedCityId = placeData.find(({ name }) => name === e.target.value).id;
        onChange({
          target: [
            { name: 'cityId', value: selectedCityId },
            { name: 'townId', value: null }
          ]
        });
        setSelectedCity(e.target.value);
      }
      return;
    }
    if (isTownSelection(e)) {
      if (isDefaultOptionSelected(e)) {
        onChange({ target: { name: 'townId', value: null } });
      } else if (!isDefaultOptionSelected(e)) {
        const towns = placeData.find(({ name }) => name === selectedCity).towns;
        const selectedTownId = towns.find(({ name }) => name === e.target.value).id;
        onChange({ target: { name: 'townId', value: selectedTownId } });
      }
      return;
    }
  };

  const handleInput = (e) => {
    if (e.target.value.length > 0) {
      onChange({ target: { name: 'detailAddress', value: e.target.value } });
    } else {
      onChange({ target: { name: 'detailAddress', value: null } });
    }
  };

  return (
    <Wrapper margin={margin}>
      <Label forHtml="status" bgColor="brand">
        장소
      </Label>
      <LineBreakWrapper margin="1.8rem 0 0 0">
        <SelectionBox
          id="status"
          options={cities || []}
          defaultOption="시/도"
          required={true}
          onChange={handleChange}
        />
        <SelectionBox
          id="status"
          options={towns || []}
          defaultOption="시/군/구"
          required={true}
          margin="0 0 0 2rem"
          onChange={handleChange}
          propRef={townRef}
        />
        <Input
          placeholder="추가적인 정보를 적어주세요"
          onChange={handleInput}
          margin="1.8rem 0 0 0"
          maxLength="255"
        />
      </LineBreakWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: ${({ margin }) => margin};
`;

Place.propTypes = {
  onChange: PropTypes.func,
  placeData: PropTypes.array,
  margin: PropTypes.string
};

export default Place;

const isDefaultOptionSelected = (e) => e.target[0].textContent === e.target.value;
const isCitySelection = (e) => e.target[0].textContent === '시/도';
const isTownSelection = (e) => e.target[0].textContent === '시/군/구';
