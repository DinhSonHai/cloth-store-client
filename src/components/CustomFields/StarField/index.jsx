import React from 'react';
import { Field, useField } from 'formik';

import './styles.scss';
import Star from '../../Star';

function StarField({ id, name }) {
  // const [field, form, meta] = useField(props);

  // const changeRating = () => {
  //   // setFieldValue(e.target)
  //   // setRating(newRating);
  //   // console.log(rating)
  //   meta.setValue(field.name, 1);
  // }

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
