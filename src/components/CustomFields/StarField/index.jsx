import React from 'react';
import { Field } from 'formik';

import './styles.scss';
import Star from '../../Star';

function StarField({ id, name }) {
  return (
    <Field id={id} name={name}>
      {({ field: { value }, form: { setFieldValue } }) => (
        <div>
          <Star
            rating={value}
            changeRating={number => setFieldValue(name, number)}
            starDimension="15px"
          />
        </div>
      )}
    </Field>
  );
}

export default StarField;
