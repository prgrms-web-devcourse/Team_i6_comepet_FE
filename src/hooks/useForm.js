import { useState } from 'react';

const useForm = ({ initialValues, onSubmit, validate, handleNavigate }) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = ({ target }) => {
    let nextValues = { ...values };
    const InputValue = target;

    if (Array.isArray(InputValue)) {
      for (let i = 0; i < InputValue.length; i++) {
        const { name, value } = InputValue[i];
        nextValues = { ...nextValues, [name]: value };
      }
      setValues(nextValues);
    } else {
      setValues({ ...values, [InputValue.name]: InputValue.value });
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
    setIsLoading(false);
    handleNavigate(onSubmitResult);
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
