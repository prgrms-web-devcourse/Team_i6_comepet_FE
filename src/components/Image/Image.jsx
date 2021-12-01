import { PropTypes } from 'prop-types';
// import PostDefaultImage from '@/assets/post-image-default.jpg';
// import ProfileDefaultImage from '@/assets/profile-image-default.jpg';
const Image = ({ src, alt, width, height, type, mode }) => {
  const { PUBLIC_URL } = process.env;
  const ProfileDefaultImage = `${PUBLIC_URL}/images/profile-image-default.png`;
  const PostDefaultImage = `${PUBLIC_URL}/images/post-image-default.jpg`;
  const defaultSize = {
    width: width ? width : type == 'profile' ? '3.5rem' : '20rem',
    height: height ? height : type == 'profile' ? '3.5rem' : '20rem',
    objectFit: mode || 'cover'
  };
  return (
    <img
      src={src ? src : type == 'profile' ? ProfileDefaultImage : PostDefaultImage}
      alt={alt ? alt : type == 'profile' ? '프로필 이미지' : '게시글 이미지'}
      style={defaultSize}
    />
  );
};

Image.propTypes = {
  type: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
  mode: PropTypes.string
};

export default Image;
