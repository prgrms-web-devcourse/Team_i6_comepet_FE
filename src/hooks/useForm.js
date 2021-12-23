import { useState } from 'react';

const useForm = ({ initialValues, onSubmit, validate, handleNavigate, handleErrors }) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = ({ target }) => {
    let nextValues = { ...values };
    const inputValue = target;

    if (Array.isArray(inputValue)) {
      for (let i = 0; i < inputValue.length; i++) {
        const { name, value } = inputValue[i];
        nextValues = { ...nextValues, [name]: value };
      }
      setValues(nextValues);
    } else {
      setValues({ ...values, [inputValue.name]: inputValue.value });
    }
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const newErrors = (validate && validate(values)) || {};
    let onSubmitResult = null;

    if (Object.keys(newErrors).length === 0) {
      onSubmitResult = await onSubmit();
    }

    setErrors(newErrors);
    handleErrors && Object.keys(newErrors).length !== 0 && handleErrors();
    setIsLoading(false);
    onSubmitResult && handleNavigate(onSubmitResult);
  };

  return {
    values,
    errors,
    isLoading,
    setIsLoading,
    handleChange,
    handleSubmit,
    handleNavigate
  };
};

export default useForm;
