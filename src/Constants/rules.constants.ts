import type { Rule } from 'antd/es/form';
import { CreateAuthForm } from '../types/FormFields';
import { FIELDS_VALIDATION_MESSAGE } from './errors.constants';

export const createAuthFormRules: Record<CreateAuthForm, Rule[]> = {
  [CreateAuthForm.Email]: [
    { required: true, message: FIELDS_VALIDATION_MESSAGE.NO_EMAIL },
    {
      type: 'email',
      message: FIELDS_VALIDATION_MESSAGE.VALID_EMAIL,
    },
  ],
  [CreateAuthForm.Username]: [
    { required: true, message: FIELDS_VALIDATION_MESSAGE.NO_USERNAME },
    { min: 1, message: FIELDS_VALIDATION_MESSAGE.VALID_USERNAME },
  ],
  [CreateAuthForm.Password]: [
    { required: true, message: FIELDS_VALIDATION_MESSAGE.NO_PASSWORD },
    { min: 6, message: FIELDS_VALIDATION_MESSAGE.VALID_PASSWORD },
  ],
};
