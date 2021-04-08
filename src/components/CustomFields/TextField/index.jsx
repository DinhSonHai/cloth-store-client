import React from 'react';
import { ErrorMessage, useField } from 'formik';

import './styles.scss';

function TextField({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className="text-field">
      <label className="text-field__label" htmlFor={field.name}>{label}</label><br />
      <input
        className={`text-field__input ${meta.touched && meta.error && 'text-field__input__invalid'}`}
        {...field}
        {...props}
        autoComplete="off"
      />
      <ErrorMessage name={field.name} component="div" className="text-field__error" />
    </div>
  );
}

export default TextField;
