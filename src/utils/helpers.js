export const isValidProp = (prop, validProps) => {
  return validProps.includes(prop);
};

export const getImageSrc = (URL) => {
  const { PUBLIC_URL } = process.env;
  return `${PUBLIC_URL}${URL}`;
};

export const formatDate = (date) => {
  const DateObject = new Date(date);
  const year = DateObject.getFullYear();
  const month = DateObject.getMonth() + 1;
  const day = DateObject.getDate();

  return `${year}년 ${month}월 ${day}일`;
};

export const isValidInput = (regex, target) => {
  return regex.test(target);
};
export const timeForToday = (value) => {
  const today = new Date();
  const timeValue = new Date(value);

  const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
  if (betweenTime < 1) return '방금전';
  if (betweenTime < 60) {
    return `${betweenTime}분전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간전`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 365) {
    return `${betweenTimeDay}일전`;
  }

  return `${Math.floor(betweenTimeDay / 365)}년전`;
};

export const changeTimeFormation = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const day = ('0' + today.getDate()).slice(-2);

  const dateString = year + '년 ' + month + '월 ' + day + '일';

  return dateString;
};
