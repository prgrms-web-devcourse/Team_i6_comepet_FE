import { PropTypes } from 'prop-types';
import styled from '@emotion/styled';

const Image = ({
  className,
  src,
  alt,
  width,
  height,
  type,
  mode,
  borderRadius,
  margin,
  boxShadow
}) => {
  const { PUBLIC_URL } = process.env;
  const ProfileDefaultImage = `${PUBLIC_URL}/images/profile-image-default.png`;
  const PostDefaultImage = `${PUBLIC_URL}/images/post-image-default.jpg`;

  return (
    <StyledImage
      className={className}
      src={checkImageUrl(src) || (type == 'profile' && ProfileDefaultImage) || PostDefaultImage}
      alt={alt || '게시글 이미지'}
      width={width}
      height={height}
      type={type}
      mode={mode}
      borderRadius={borderRadius}
      margin={margin}
      boxShadow={boxShadow}
    />
  );
};

const StyledImage = styled.img`
  width: ${({ width, type }) => width || (type === 'profile' && '4.5rem') || '20rem'};
  height: ${({ height, type }) => height || (type === 'profile' && '4.5rem') || '20rem'};
  border-radius: ${({ borderRadius }) => borderRadius};
  object-fit: ${({ mode }) => mode || 'cover'};
  margin: ${({ margin }) => margin};
  box-shadow: ${({ boxShadow, theme }) => boxShadow && theme.shadows[boxShadow]};
`;

Image.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  mode: PropTypes.string,
  type: PropTypes.string,
  borderRadius: PropTypes.string,
  margin: PropTypes.string,
  boxShadow: PropTypes.string
};

export default Image;

const checkImageUrl = (src) => {
  const isImageUrl = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(src);
  return isImageUrl ? src : null;
};
