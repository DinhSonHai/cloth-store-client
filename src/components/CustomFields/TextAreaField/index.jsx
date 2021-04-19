import React, { Fragment } from 'react';
import { ErrorMessage, useField } from 'formik';

import './styles.scss';

function TextAreaField({ label, width, height, backgroundColor, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className="text-field">
      { label && (
        <Fragment>
          <label className="text-field__label" htmlFor={field.name}>{label}</label><br />
        </Fragment>)}
      < textarea
        className={`text-field__textarea ${meta.touched && meta.error && 'text-field__invalid'}`}
        {...field}
        {...props}
        style={{ width, height, backgroundColor }}
        autoComplete="off"
      />
      <ErrorMessage name={field.name} component="div" className="text-field__error" />
    </div>
  );
}

export default TextAreaField;
