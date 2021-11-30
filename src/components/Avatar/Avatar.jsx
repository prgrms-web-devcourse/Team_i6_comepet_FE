import { useState, useEffect } from 'react';
import { Image as ImageComponent } from '@/components/Image';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Avatar = ({ lazy, threshold, src, size, shape, placeholder, alt, mode }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = src;
    image.onload = () => setLoaded(true);
  }, [src]);

  return (
    <AvatarWrapper shape={shape}>
      <ImageComponent
        lazy={lazy}
        threshold={threshold}
        width={size ? size : '35rem'}
        height={size ? size : '35rem'}
        src={src}
        placeholder={placeholder}
        alt={alt ? alt : 'profile picture'}
        mode={mode ? mode : 'cover'}
        style={{ opacity: loaded ? 1 : 0 }}
      />
    </AvatarWrapper>
  );
};

const ShapeToCssValue = {
  circle: '50%',
  round: '0.4rem',
  square: '0'
};
const AvatarWrapper = styled.div`
  position: relative;
  display: inline-block;
  border: 0.1rem solid #dadada;
  border-radius: ${({ shape }) => (shape && ShapeToCssValue[shape]) || ShapeToCssValue['circle']};
  background-color: #eee;
  overflow: hidden;

  > img {
    transition: opacity 0.2s ease-out;
  }
`;

Avatar.propTypes = {
  lazy: PropTypes.bool,
  threshold: PropTypes.number,
  src: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  shape: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  alt: PropTypes.string,
  mode: PropTypes.string
};
export default Avatar;
