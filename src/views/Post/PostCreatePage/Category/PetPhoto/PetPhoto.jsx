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
      setFiles(nextFiles);
      setIsErrorOccurred(!isErrorOccurred);
      onChange({ target: { name: 'images', value: nextFiles } });
      return;
    }

    setFiles([]);
    setIsErrorOccurred(!isErrorOccurred);
  };

  return (
    <Wrapper margin={margin}>
      <Slider imageList={files} size="large" />
      <Input onChange={handleFileChange} ref={inputRef} type="file" accept="image/*" multiple />
      <Caution isErrorOccurred={isErrorOccurred}>
        ※ 이미지는 3개까지 등록 가능하며, 한 장당 5MB 이하여야 합니다.
      </Caution>
      <Button
        onClick={handleChooseFile}
        width="60%"
        margin="5% auto 0 auto"
        bgColor="normalOrange"
        type="button">
        반려동물 사진 등록
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: ${({ margin }) => margin};
`;

const Caution = styled.div`
  color: ${({ isErrorOccurred, theme }) => isErrorOccurred && theme.colors.normalRed};
  font-size: 1rem;
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

//
