import { useState } from 'react';

const useForm = ({ initialValues, onSubmit, validate }) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setValues({ ...values, [name]: value });
    console.log('form에 잘 쓰여지는지 확인', values);
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
