import { ValidationSchema, Validators } from '@lemoncode/fonk';
import { createFormikValidation } from '@lemoncode/fonk-formik';

const validationSchema: ValidationSchema = {
  field: {
    story: [{ validator: Validators.required, message: 'Story is required' }],
  },
};

export const formValidation = createFormikValidation(validationSchema);
