import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import LineBreakWrapper from '../Common/LineBreakWrapper';
import { Label } from '@/components/Label';
import { SelectionBox } from '@/components/SelectionBox';
import { Input } from '@/components/Input';
import { CheckBox } from '@/components/CheckBox';
import { GENDER } from '@/utils/constants';

const kindsOfCat = [
  '페르시안',
  '메인쿤',
  '벵골',
  '브리티시 쇼트헤어',
  '시암고양이',
  '스핑크스',
  '래그들',
  '먼치킨',
  '스코티시 폴드',
  '노르웨이 숲 고양이',
  '아메리칸 쇼트헤어'
];

const kindsOfDog = [
  '저먼 셰퍼드',
  '래브라도 리트리버',
  '시베리안 허스키',
  '아메리칸 핏불 테리어',
  '닥스훈트',
  '로트바일러',
  '저면 셰퍼드',
  '도베르만 핀셔',
  '시바견'
];

const responsedAnimalId = {
  1: '개',
  2: '고양이',
  3: '기타'
};

const PetInformation = ({ margin, onChange }) => {
  const [animalId, setAnimalId] = useState(null);
  const [animalKindName, setAnimalKindName] = useState(null);
  const [age, setAge] = useState(null);
  const [sex, setSex] = useState(null);
  const [isAnimalUnknown, setIsAnimalUnknown] = useState(false);
  const [isAgeUnknown, setIsAgeUnknown] = useState(false);
  const [isSexUnknown, setIsSexUnknown] = useState(false);
  const kindsSelectionBoxRef = useRef(null);
  const kindsCheckBoxRef = useRef(null);

  const handleChange = (e) => {
    if (isSelectChange(e)) {
      if (isAnimalSelection(e)) {
        if (isDefalutOptionSelected(e)) {
          setAnimalId(null);
          onChange(makeObjectForm('animalId', null));
        } else {
          setAnimalId(e.target.value);
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
          onChange(makeObjectForm('sex', e.target.value));
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
          if (e.target.value >= 499) e.target.value = 499;
          if (e.target.value < 0) e.target.value = 0;
          setAge(e.target.value);
          onChange(makeObjectForm('age', e.target.value));
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
          options={Object.values(responsedAnimalId)}
          defaultOption="동물"
          required
        />
        {((animalId === '동물' || animalId === null) && <></>) ||
          (animalId === '기타' && (
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
            </>
          )) || (
            <>
              <SelectionBox
                onChange={handleChange}
                options={
                  (animalId === '고양이' && kindsOfCat) || (animalId === '개' && kindsOfDog) || []
                }
                defaultOption="품종"
                margin="0 0 0 2rem"
                required
                disabled={isAnimalUnknown}
                propRef={kindsSelectionBoxRef}
              />
            </>
          )}
        <CheckBox
          id="kinds-checkbox"
          propRef={kindsCheckBoxRef}
          onChange={handleUnknownChecked}
          margin="0 0 0 1.6rem"
          fontSize="1.4rem"
        />
        <LineBreakWrapper>
          <Input
            id="age-input"
            onChange={handleChange}
            width="25%"
            placeholder="나이"
            type="number"
            margin="1.8rem 0 0 0"
            required
            disabled={isAgeUnknown}
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
  margin: PropTypes.string,
  onChange: PropTypes.func
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
