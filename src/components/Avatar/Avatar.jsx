import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Image as ImageComponent } from '@/components/Image';

const Avatar = ({ src, alt, size, shape, mode }) => {
  return (
    <Wrapper size={size} shape={shape}>
      <ImageComponent src={src} alt={alt} width={size} height={size} type={'profile'} mode={mode} />
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
  position: relative;
  width: ${({ size }) => size || '3.5rem'};
  height: ${({ size }) => size || '3.5rem'};
  border: 0.1rem solid #dadada;
  border-radius: ${({ shape }) => (shape && ShapeToCssValue[shape]) || ShapeToCssValue['circle']};
  background-color: ${({ theme }) => theme.colors.lighterGray};
  overflow: hidden;

  > img {
    transition: opacity 0.2s ease-out;
  }
`;

Avatar.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  size: PropTypes.string,
  shape: PropTypes.string,
  mode: PropTypes.string
};
export default Avatar;
