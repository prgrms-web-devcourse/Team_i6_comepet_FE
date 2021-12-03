export const isNotValidSize = (size, validSizes) => {
  return !validSizes.includes(size);
};

export const getImageSrc = (URL) => {
  const { PUBLIC_URL } = process.env;
  return `${PUBLIC_URL}${URL}`;
};

export const formatDate = (date) => {
  const DateObject = new Date(date);
  const year = DateObject.getFullYear();
  const month = DateObject.getMonth();
  const day = DateObject.getDate();

  return `${year}년 ${month}월 ${day}일`;
};
