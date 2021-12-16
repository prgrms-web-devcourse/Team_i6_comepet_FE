import { useState } from 'react';

const useForm = ({ initialValues, onSubmit, validate }) => {
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
    const newErrors = validate(values);
    if (Object.keys(newErrors).length === 0) {
      await onSubmit();
    }
    setErrors(newErrors);
    setIsLoading(false);
  };

  return {
    values,
    errors,
    isLoading,
    handleChange,
    handleSubmit
  };
};

export default useForm;
