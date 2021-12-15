import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Slider } from '@/components/Slider';
import { Button } from '@/components/Button';

const PetPhoto = ({ margin }) => {
  const [files, setFiles] = useState([]);

  const inputRef = useRef(null);

  const handleChooseFile = () => {
    inputRef.current.click();
  };
  // TODO: 파일 개수 및 용량 제한
  const handleFileChange = (e) => {
    const uploadedFiles = [...e.target.files];
    const nextFiles = [...files];
    nextFiles.push(...uploadedFiles);
    setFiles(nextFiles);
  };

  return (
    <Wrapper margin={margin}>
      <Slider imageList={files} size="large" />
      <Input onChange={handleFileChange} ref={inputRef} type="file" accept="image/*" multiple />
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

const Input = styled.input`
  display: none;
`;

PetPhoto.propTypes = {
  margin: PropTypes.string
};

export default PetPhoto;
