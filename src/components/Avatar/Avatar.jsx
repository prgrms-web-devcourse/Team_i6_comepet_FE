import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Image as ImageComponent } from '@/components/Image';

const Avatar = ({ src, size, shape, mode, margin }) => {
  return (
    <Wrapper size={size} shape={shape} margin={margin}>
      <ImageComponent
        src={src}
        alt="프로필 이미지"
        width={size}
        height={size}
        type="profile"
        mode={mode}
      />
    </Wrapper>
  );
};

const ShapeToCssValue = {
  circle: '50%',
  round: '0.4rem',
  square: '0'
};

const Wrapper = styled.div`
  display: inline-block;
  margin: ${({ margin }) => margin || '0 auto'};
  width: ${({ size }) => size || '4.5rem'};
  height: ${({ size }) => size || '4.5rem'};
  border: 0.1rem solid ${({ theme }) => theme.colors.lighterGray};
  border-radius: ${({ shape }) => (shape && ShapeToCssValue[shape]) || ShapeToCssValue['circle']};
  background-color: ${({ theme }) => theme.colors.lighterGray};
  overflow: hidden;
`;

Avatar.propTypes = {
  src: PropTypes.string,
  size: PropTypes.string,
  shape: PropTypes.string,
  mode: PropTypes.string,
  margin: PropTypes.string
};

export default Avatar;
