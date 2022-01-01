import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Slider } from '@/components/Slider';
import { Button } from '@/components/Button';

const PetPhoto = ({ margin, onChange }) => {
  const [files, setFiles] = useState([]);
  const [isErrorOccurred, setIsErrorOccurred] = useState(false);

  const inputRef = useRef(null);

  const handleChooseFile = () => {
    inputRef.current.click();
  };

  const handleFileChange = (e) => {
    if (isTheNumberOfPhotosUnderThree(e) && areFileSizesUnder5MB(e)) {
      const nextFiles = [...e.target.files];
      setFiles(makeDataFormForSlider(nextFiles));
      setIsErrorOccurred(false);
      onChange({ target: { name: 'images', value: e.target.files } });
      return;
    }

    setFiles([]);
    setIsErrorOccurred(true);
  };

  return (
    <Wrapper margin={margin}>
      <SliderWrapper>
        <Slider imageList={files} size="large" />
      </SliderWrapper>
      <Input onChange={handleFileChange} ref={inputRef} type="file" accept="image/*" multiple />
      <Caution>여러 이미지는 한 번에 업로드해 주세요.</Caution>
      <Caution isErrorOccurred={isErrorOccurred}>
        최대 3개의 이미지, 각 5MB 이하의 이미지 파일만 업로드 가능합니다.
      </Caution>
      <Button
        onClick={handleChooseFile}
        width="60%"
        margin="1rem auto 0 auto"
        bgColor="normalOrange"
        type="button">
        반려동물 사진 등록
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: ${({ margin }) => margin};

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SliderWrapper = styled.div`
  position: relative;
  width: 50%;
  padding-top: 50%;
`;

const Caution = styled.div`
  margin-top: 1rem;
  color: ${({ isErrorOccurred, theme }) => isErrorOccurred && theme.colors.normalRed};
  font-size: 1.3rem;
  font-weight: ${({ isErrorOccurred }) => isErrorOccurred && 'bold'};
`;

const Input = styled.input`
  display: none;
`;

PetPhoto.propTypes = {
  onChange: PropTypes.func,
  margin: PropTypes.string
};

export default PetPhoto;

const areFileSizesUnder5MB = (e) => {
  const { files } = e.target;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (file.size > 1024 * 1024 * 5) return false;
  }

  return true;
};

const isTheNumberOfPhotosUnderThree = (e) => e.target.files.length <= 3;
const makeDataFormForSlider = (files) => {
  const res = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    res.push({ image: URL.createObjectURL(file) });
  }

  return res;
};
