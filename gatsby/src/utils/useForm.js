import { useState } from 'react';

export default function useForm(defaults) {
  const [values, setValues] = useState(defaults);

  function updateValue(e) {
    // Check if value is number and coerce
    let { value } = e.target;

    if (e.target.type === 'number') {
      value = parseInt(value);
    }

    setValues({
      // Copy existing values
      ...values,
      // Update what's changed
      [e.target.name]: value,
    });
  }

  return { values, updateValue };
}
