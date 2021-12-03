export const isNotValidSize = (size, validSizes) => {
  return !validSizes.includes(size);
};

export const getImageSrc = (URL) => {
  const { PUBLIC_URL } = process.env;
  return `${PUBLIC_URL}${URL}`;
};
