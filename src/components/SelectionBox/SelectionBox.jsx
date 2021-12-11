import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const COLOR_SET = Object.freeze({
  normalPink: '#FF8585',
  normalGreen: '#3BAB29',
  normalBlack: '#2F3438',
  disabled: '#aaaaaa',
  brand: '#2A2E56'
});

const SelectionBox = ({
  options,
  defaultOption,
  required,
  disabled,
  fontSize,
  height,
  id,
  name,
  margin,
  onSelectChange
}) => {
  const [color, setColor] = useState(decideColor({ required, disabled }));
  const selectRef = useRef(null);

  const handleColorChange = ({ target }) => {
    const chosen =
      target?.selectedIndex !== 0 &&
      target?.selectedIndex !== null &&
      target?.selectedIndex !== undefined;
    const nextColor = decideColor({ required, chosen, disabled });
    setColor(nextColor);
  };

  useEffect(() => {
    if (Number.isNaN(Number(selectRef.current.value))) {
      const nextColor = decideColor({ required, chosen: false, disabled });
      setColor(nextColor);
    }
  }, [options]);

  return (
    <Wrapper color={color} margin={margin}>
      <Select
        onChange={(event) => {
          handleColorChange(event);
          onSelectChange(event);
        }}
        ref={selectRef}
        disabled={disabled}
        color={color}
        fontSize={fontSize}
        height={height}
        id={id}
        name={name}>
        <Option>{defaultOption}</Option>
        {options?.map((option, index) => (
          <Option key={index}>{option}</Option>
        ))}
      </Select>
      <Arrow color={color} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: inline-block;
  position: relative;
  margin: ${({ margin }) => margin};
  height: ${({ height }) => height || '2.4rem'};
  border-bottom: ${({ color }) => `0.15rem solid ${color}`};
`;

const Select = styled.select`
  width: 100%;
  height: 100%;
  padding-right: 2.5rem;
  background: transparent;
  border: 0;
  outline: 0;
  font-size: ${({ fontSize }) => fontSize || '1.6rem'};
  color: ${({ color }) => color};
  font-weight: bold;
`;

const Option = styled.option`
  color: ${COLOR_SET.normalBlack};
`;

const Arrow = styled(KeyboardArrowDownIcon)`
  color: ${({ color }) => color};
  position: absolute;
  top: -0.1rem;
  right: 0;
  width: 2rem;
  height: inherit;
`;

SelectionBox.propTypes = {
  options: PropTypes.array.isRequired,
  defaultOption: PropTypes.string.isRequired,
  fontSize: PropTypes.string,
  height: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  id: PropTypes.string,
  margin: PropTypes.string,
  onSelectChange: PropTypes.func,
  name: PropTypes.string
};

export default SelectionBox;

const decideColor = ({ required, chosen, disabled }) => {
  if (disabled) return COLOR_SET.disabled;
  if (chosen) return COLOR_SET.normalGreen;
  if (required) return COLOR_SET.normalPink;
  return COLOR_SET.brand;
};
