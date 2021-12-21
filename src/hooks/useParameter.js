import { useState } from 'react';

const useParameter = () => {
  const [parameterObject, setParameterObject] = useState({});

  const handleAddParameters = (params) => {
    const nextState = { ...parameterObject, ...params };
    setParameterObject(nextState);
  };

  return {
    parameterObject,
    handleAddParameters
  };
};

export default useParameter;
