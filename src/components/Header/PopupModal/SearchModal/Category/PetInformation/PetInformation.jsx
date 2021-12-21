import React, { useState, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import LineBreakWrapper from '../LineBreakWrapper/LineBreakWrapper';
import { Label } from '@/components/Label';
import { SelectionBox } from '@/components/SelectionBox';

const PetInformation = ({ margin, animalData, onSelectOption }) => {
  const [animal, setAnimal] = useState(null);
  const [animalKindName, setAnimalKindName] = useState(null); // eslint-disable-line no-unused-vars
  const [sex, setSex] = useState(null); // eslint-disable-line no-unused-vars
  const [isAnimalUnknown, setIsAnimalUnknown] = useState(false);
  const kindsSelectionBoxRef = useRef(null);
  const kindsCheckBoxRef = useRef(null);

  const animalList = useMemo(() => {
    const targetAnimal = animalData?.find(({ name }) => name === animal);
    const kinds = targetAnimal?.kinds;
    const res = kinds?.map(({ name }) => name);
    return res;
  }, [animal, animalData]);

  useEffect(() => {
    if (animal !== null && animal !== '동물') {
      const targetObject = animalData?.find(({ name }) => name === animal);
      onSelectOption({ animal: targetObject.id, animalString: targetObject.name });
    } else if (animal === null) {
      onSelectOption({ animal: null, animalString: null });
    }
  }, [animal]);

  const handleChange = (e) => {
    if (isSelectChange(e)) {
      if (isAnimalSelection(e)) {
        if (isDefalutOptionSelected(e)) {
          setAnimal(null);
          onSelectOption({ animal: null, animalString: null });
        } else {
          const selectedAnimal = e.target.value;
          const targetAnimalObject = animalData?.find(({ name }) => name === selectedAnimal);
          setAnimal(e.target.value);
          onSelectOption({ animal: targetAnimalObject.id, animalString: targetAnimalObject.name });
        }

        kindsCheckBoxRef.current && (kindsCheckBoxRef.current.checked = false);
        kindsSelectionBoxRef.current && (kindsSelectionBoxRef.current[0].selected = 'selected');
        setIsAnimalUnknown(false);
        onSelectOption({ animalKind: null, animalKindName: null });
        return;
      }

      if (isKindsSelection(e)) {
        if (isDefalutOptionSelected(e)) {
          setAnimalKindName(null);
          onSelectOption({ animalKind: null, animalKindName: null });
        } else {
          const targetAnimal = animalData?.find(({ name }) => name === animal);
          const kinds = targetAnimal?.kinds;
          const targetAnimalKindNameObject = kinds.find(({ name }) => name === e.target.value);
          setAnimalKindName(e.target.value);
          onSelectOption({
            animalKind: targetAnimalKindNameObject.id,
            animalKindName: targetAnimalKindNameObject.name
          });
        }
        return;
      }

      if (isSexSelection(e)) {
        if (isDefalutOptionSelected(e)) {
          setSex(null);
          onSelectOption({ sex: null });
        } else {
          setSex(e.target.value);
          onSelectOption({
            sex:
              (e.target.value === '수컷' && 'MALE') ||
              (e.target.value === '암컷' && 'FEMALE') ||
              (e.target.value === '모름' && 'UNKNOWN')
          });
        }
        return;
      }
    }
  };

  return (
    <Wrapper margin={margin}>
      <Label forHtml="animal" bgColor="brand" size="xsmall">
        동물 정보
      </Label>
      <LineBreakWrapper margin="0.8rem 0 0 0">
        <SelectionBox
          id="animal"
          onChange={handleChange}
          options={['개', '고양이', '기타']}
          defaultOption="동물"
          fontSize="1.2rem"
        />
        {((animal === '동물' || animal === null) && <></>) || (
          <SelectionBox
            onChange={handleChange}
            options={animalList || []}
            defaultOption="품종"
            fontSize="1.2rem"
            margin="0 0 0 2rem"
            disabled={isAnimalUnknown}
            propRef={kindsSelectionBoxRef}
          />
        )}
        <LineBreakWrapper>
          <LineBreakWrapper margin="0.8rem 0 0 0">
            <Label fontHtml="sex" bgColor="brand" size="xsmall">
              나이
            </Label>
            <LineBreakWrapper margin="0.8rem 0 0 0">
              <SelectionBox
                onChange={handleChange}
                options={['수컷', '암컷', '모름']}
                fontSize="1.2rem"
                defaultOption="성별"
              />
            </LineBreakWrapper>
          </LineBreakWrapper>
        </LineBreakWrapper>
      </LineBreakWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: ${({ margin }) => margin};
`;

PetInformation.propTypes = {
  animalData: PropTypes.array,
  margin: PropTypes.string,
  onSelectOption: PropTypes.func
};

export default PetInformation;

const isSelectChange = (e) => e.target.tagName === 'SELECT';
const isAnimalSelection = (e) => e.target[0].textContent === '동물';
const isKindsSelection = (e) => e.target[0].textContent === '품종';
const isSexSelection = (e) => e.target[0].textContent === '성별';
const isDefalutOptionSelected = (e) => e.target[0].textContent === e.target.value;
