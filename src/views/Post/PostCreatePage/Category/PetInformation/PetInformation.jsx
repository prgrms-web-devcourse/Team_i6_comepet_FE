import React, { useState, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import LineBreakWrapper from '../Common/LineBreakWrapper';
import { Label } from '@/components/Label';
import { SelectionBox } from '@/components/SelectionBox';
import { Input } from '@/components/Input';
import { CheckBox } from '@/components/CheckBox';
import { GENDER } from '@/utils/constants';

const PetInformation = ({ margin, onChange, animalData }) => {
  const [animal, setAnimal] = useState(null);
  const [animalKindName, setAnimalKindName] = useState(null);
  const [age, setAge] = useState(null);
  const [sex, setSex] = useState(null);
  const [isAnimalUnknown, setIsAnimalUnknown] = useState(false);
  const [isAgeUnknown, setIsAgeUnknown] = useState(false);
  const [isSexUnknown, setIsSexUnknown] = useState(false);
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
      const targetId = targetObject.id;
      onChange({ target: { name: 'animalId', value: targetId } });
    } else if (animal === null) {
      onChange({ target: { name: 'animalId', value: null } });
    }
  }, [animal]);

  const handleChange = (e) => {
    if (isSelectChange(e)) {
      if (isAnimalSelection(e)) {
        if (isDefalutOptionSelected(e)) {
          setAnimal(null);
          onChange(makeObjectForm('animalId', null));
        } else {
          setAnimal(e.target.value);
          onChange(makeObjectForm('animalId', e.target.value));
        }

        kindsCheckBoxRef.current && (kindsCheckBoxRef.current.checked = false);
        kindsSelectionBoxRef.current && (kindsSelectionBoxRef.current[0].selected = 'selected');
        setIsAnimalUnknown(false);
        onChange(makeObjectForm('animalKindName', null));
        return;
      }

      if (isKindsSelection(e)) {
        if (isDefalutOptionSelected(e)) {
          setAnimalKindName(null);
          onChange(makeObjectForm('animalKindName', null));
        } else {
          setAnimalKindName(e.target.value);
          onChange(makeObjectForm('animalKindName', e.target.value));
        }
        return;
      }

      if (isSexSelection(e)) {
        if (isDefalutOptionSelected(e)) {
          setSex(null);
          onChange(makeObjectForm('sex', null));
        } else {
          setSex(e.target.value);
          onChange(
            makeObjectForm(
              'sex',
              (e.target.value === '수컷' && 'MALE') ||
                (e.target.value === '암컷' && 'FEMALE') ||
                (e.target.value === '모름' && 'UNKNOWN')
            )
          );
        }
        return;
      }
    }
    if (isInputChange(e)) {
      if (isKindsInput(e)) {
        if (isEmpty(e)) {
          onChange(makeObjectForm('animalKindName', null));
        } else {
          onChange(makeObjectForm('animalKindName', e.target.value));
        }
        return;
      }

      if (isAgeInput(e)) {
        if (isEmpty(e)) {
          setAge(null);
          onChange(makeObjectForm('age', null));
        } else {
          let age = Number(e.target.value);
          if (age >= 499) e.target.value = 499;
          if (age < 0) e.target.value = 0;

          setAge(Number(e.target.value));
          onChange(makeObjectForm('age', Number(e.target.value)));
        }
        return;
      }
    }
  };

  const handleUnknownChecked = (e) => {
    let valueToSave = null;

    if (e.target.id === 'kinds-checkbox') {
      setIsAnimalUnknown(!isAnimalUnknown);
      valueToSave = (e.target.checked && 'UNKNOWN') || animalKindName || null;
      onChange(makeObjectForm('animalKindName', valueToSave));
      return;
    }

    if (e.target.id === 'age-checkbox') {
      setIsAgeUnknown(!isAgeUnknown);
      valueToSave = (e.target.checked && -1) || age || null;
      onChange(makeObjectForm('age', valueToSave));
      return;
    }

    if (e.target.id === 'sex-checkbox') {
      setIsSexUnknown(!isSexUnknown);
      valueToSave = (e.target.checked && 'UNKNOWN') || sex || null;
      onChange(makeObjectForm('sex', valueToSave));
      return;
    }
  };

  return (
    <Wrapper margin={margin}>
      <Label forHtml="animal" bgColor="brand">
        동물 정보
      </Label>
      <LineBreakWrapper margin="1.8rem 0 0 0">
        <SelectionBox
          id="animal"
          onChange={handleChange}
          options={['개', '고양이', '기타']}
          defaultOption="동물"
          required
        />
        {((animal === '동물' || animal === null) && <></>) ||
          (animal === '기타' && (
            <>
              <Input
                id="kinds-input"
                onChange={handleChange}
                placeholder="동물명 혹은 품종"
                width="50%"
                margin="0 0 0 1.8rem"
                maxLength="50"
                required
                disabled={isAnimalUnknown}
              />
              <CheckBox
                id="kinds-checkbox"
                propRef={kindsCheckBoxRef}
                onChange={handleUnknownChecked}
                margin="0 0 0 1.6rem"
                fontSize="1.4rem"
              />
            </>
          )) || (
            <LineBreakWrapper>
              <SelectionBox
                onChange={handleChange}
                options={animalList || []}
                defaultOption="품종"
                margin="1.6rem 0 0 0"
                required
                disabled={isAnimalUnknown}
                propRef={kindsSelectionBoxRef}
              />
              <CheckBox
                id="kinds-checkbox"
                propRef={kindsCheckBoxRef}
                onChange={handleUnknownChecked}
                margin="0 0 0 1.6rem"
                fontSize="1.4rem"
              />
            </LineBreakWrapper>
          )}
        <LineBreakWrapper>
          <Input
            id="age-input"
            onChange={handleChange}
            width="25%"
            placeholder="나이"
            type="number"
            margin="1.8rem 0 0 0"
            disabled={isAgeUnknown}
            required
          />
          <CheckBox
            onChange={handleUnknownChecked}
            id="age-checkbox"
            margin="0 0 0 1.6rem"
            fontSize="1.4rem"
          />
          <SelectionBox
            onChange={handleChange}
            options={Object.values(GENDER)}
            defaultOption="성별"
            required={true}
            margin="0 0 0 1.6rem"
            disabled={isSexUnknown}
          />
          <CheckBox
            onChange={handleUnknownChecked}
            id="sex-checkbox"
            margin="0 0 0 1.6rem"
            fontSize="1.4rem"
          />
        </LineBreakWrapper>
      </LineBreakWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: ${({ margin }) => margin};
`;

PetInformation.propTypes = {
  onChange: PropTypes.func,
  animalData: PropTypes.array,
  margin: PropTypes.string
};

export default PetInformation;

const isSelectChange = (e) => e.target.tagName === 'SELECT';
const isInputChange = (e) => e.target.tagName === 'INPUT';
const isKindsInput = (e) => e.target.id === 'kinds-input';
const isAgeInput = (e) => e.target.id === 'age-input';
const isAnimalSelection = (e) => e.target[0].textContent === '동물';
const isKindsSelection = (e) => e.target[0].textContent === '품종';
const isSexSelection = (e) => e.target[0].textContent === '성별';
const makeObjectForm = (name, value) => ({ target: { name, value } });
const isDefalutOptionSelected = (e) => e.target[0].textContent === e.target.value;
const isEmpty = (e) => e.target.value.length === 0;
