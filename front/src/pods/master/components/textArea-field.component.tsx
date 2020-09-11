import React from 'react';
import { useField } from 'formik';
import MuiTextArea, { TextFieldProps } from '@material-ui/core/TextField';

export const TextAreaComponent: React.FunctionComponent<TextFieldProps> = props => {
  const [field, meta] = useField(props.name);
  const textAreaProps = Boolean(field) ? field : props;
  const hasError = Boolean(meta && meta.touched && meta.error);

  return (
    <MuiTextArea
      {...props}
      name={textAreaProps.name}
      onChange={textAreaProps.onChange}
      onBlur={textAreaProps.onBlur}
      value={textAreaProps.value}
      multiline={true}
      type={'TextareaAutosize'}
      variant={'standard'}
      InputProps={{ error: hasError }}
      error={hasError}
      helperText={hasError ? 'Story is required' : meta.error}
    />
  );
};
