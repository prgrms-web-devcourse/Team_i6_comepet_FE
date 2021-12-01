import { PropTypes } from 'prop-types';

const Image = ({ src, alt, width, height, placeholder, mode }) => {
  return (
    <img
      src={src || placeholder}
      alt={alt}
      width={width}
      height={height}
      objectFit={mode || 'cover'}
    />
  );
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  mode: PropTypes.string
};

export default Image;
