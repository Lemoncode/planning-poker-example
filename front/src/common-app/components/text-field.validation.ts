import { ValidationSchema, Validators } from '@lemoncode/fonk';
import { createFormikValidation } from '@lemoncode/fonk-formik';

Validators.required.setErrorMessage('Nickname is required');

const validationSchema: ValidationSchema = {
  field: {
    nickname: [Validators.required],
  },
};

export const formValidation = createFormikValidation(validationSchema);
