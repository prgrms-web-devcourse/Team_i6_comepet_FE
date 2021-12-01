import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Image as ImageComponent } from '@/components/Image';

const Avatar = ({ src, alt, size, placeholder, shape, mode }) => {
  return (
    <Wrapper shape={shape}>
      <ImageComponent
        src={src}
        alt={alt || 'profile picture'}
        width={size || '35rem'}
        height={size || '35rem'}
        placeholder={placeholder}
        mode={mode || 'cover'}
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
  position: relative;
  border: 0.1rem solid #dadada;
  border-radius: ${({ shape }) => (shape && ShapeToCssValue[shape]) || ShapeToCssValue['circle']};
  background-color: #eee;
  overflow: hidden;

  > img {
    transition: opacity 0.2s ease-out;
  }
`;

Avatar.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  size: PropTypes.string,
  placeholder: PropTypes.string,
  shape: PropTypes.string,
  mode: PropTypes.string
};
export default Avatar;
