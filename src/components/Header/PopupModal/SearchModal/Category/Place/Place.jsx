import React, { useState, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import LineBreakWrapper from '../LineBreakWrapper/LineBreakWrapper';
import { Label } from '@/components/Label';
import { SelectionBox } from '@/components/SelectionBox';

const Place = ({ margin, placeData, onSelectOption }) => {
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
        onSelectOption({ city: null, cityName: null, town: null, townName: null });
        setSelectedCity(null);
      } else if (!isDefaultOptionSelected(e)) {
        townRef.current[0].selected = true;
        const selectedCityId = placeData.find(({ name }) => name === e.target.value).id;
        onSelectOption({
          city: selectedCityId,
          cityName: e.target.value,
          town: null,
          townName: null
        });
        setSelectedCity(e.target.value);
      }
      return;
    }
    if (isTownSelection(e)) {
      if (isDefaultOptionSelected(e)) {
        onSelectOption({ town: null, townName: null });
      } else if (!isDefaultOptionSelected(e)) {
        const towns = placeData.find(({ name }) => name === selectedCity).towns;
        const selectedTownId = towns.find(({ name }) => name === e.target.value).id;
        onSelectOption({ town: selectedTownId, townName: e.target.value });
      }
      return;
    }
  };

  return (
    <Wrapper margin={margin}>
      <Label forHtml="city" bgColor="brand" size="xsmall">
        장소
      </Label>
      <LineBreakWrapper margin="0.8rem 0 0 0">
        <SelectionBox
          id="city"
          options={cities || []}
          defaultOption="시/도"
          onChange={handleChange}
          fontSize="1.2rem"
        />
        <SelectionBox
          id="town"
          options={towns || []}
          defaultOption="시/군/구"
          onChange={handleChange}
          propRef={townRef}
          margin="0 0 0 2rem"
          fontSize="1.2rem"
        />
      </LineBreakWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: ${({ margin }) => margin};
`;

Place.propTypes = {
  placeData: PropTypes.array,
  margin: PropTypes.string,
  onSelectOption: PropTypes.func
};

export default Place;

const isDefaultOptionSelected = (e) => e.target[0].textContent === e.target.value;
const isCitySelection = (e) => e.target[0].textContent === '시/도';
const isTownSelection = (e) => e.target[0].textContent === '시/군/구';
