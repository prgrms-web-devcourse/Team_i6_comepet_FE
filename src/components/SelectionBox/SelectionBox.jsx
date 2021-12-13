import React, { useState } from 'react';
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
  fontColor,
  height,
  id,
  margin,
  isColored
}) => {
  const [color, setColor] = useState(isColored && decideColor({ required, disabled }));

  const changeHandler = (e) => {
    const chosen = e.target.selectedIndex !== 0;
    const nextColor = decideColor({ required, chosen, disabled });
    isColored && setColor(nextColor);
  };

  return (
    <Wrapper color={color} margin={margin}>
      <Selection
        onChange={changeHandler}
        disabled={disabled}
        color={color}
        fontSize={fontSize}
        height={height}
        id={id}
        fontColor={fontColor}>
        <Option isColored={isColored}>{defaultOption}</Option>
        {options?.map((option, index) => (
          <Option key={index}>{option}</Option>
        ))}
      </Selection>
      <Arrow color={color} />
    </Wrapper>
  );
};

const decideColor = ({ chosen, disabled, required }) => {
  if (disabled) return COLOR_SET.disabled;
  if (chosen) return COLOR_SET.normalGreen;
  if (required) return COLOR_SET.normalPink;
  return COLOR_SET.brand;
};

const Wrapper = styled.div`
  display: inline-block;
  position: relative;
  margin: ${({ margin }) => margin};
  height: ${({ height }) => height || '2.4rem'};
  border-bottom: ${({ color }) => `0.15rem solid ${color}`};
`;

const Selection = styled.select`
  width: 100%;
  height: 100%;
  padding-right: 2.5rem;
  background: transparent;
  border: 0;
  outline: 0;
  font-size: ${({ fontSize }) => fontSize || '1.6rem'};
  color: ${({ color }) => color};
  font-weight: bold;
  color: ${({ fontColor, theme }) => theme.colors[fontColor] || theme.colors.normalBlack};
`;

const Option = styled.option`
  color: ${COLOR_SET.normalBlack};
  text-align: ${({ isColored }) => isColored || 'end'};
`;

const Arrow = styled(KeyboardArrowDownIcon)`
  color: ${({ fontColor, theme }) => theme.colors[fontColor] || theme.colors.normalBlack};
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
  fontColor: PropTypes.string,
  height: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  id: PropTypes.string,
  margin: PropTypes.string,
  isColored: PropTypes.bool
};

export default SelectionBox;
