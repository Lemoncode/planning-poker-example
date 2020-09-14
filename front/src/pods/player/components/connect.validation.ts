import { ValidationSchema, Validators } from '@lemoncode/fonk';
import { createFormikValidation } from '@lemoncode/fonk-formik';

const validationSchema: ValidationSchema = {
  field: {
    nickname: [
      { validator: Validators.required, message: 'Nickname is required' },
    ],
  },
};

export const formValidation = createFormikValidation(validationSchema);
