import type { Rule } from 'antd/es/form';
import {
  CreateAuthForm,
  CreatePostForm,
  EditProfileForm,
} from '../types/FormFields';
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

export const createPostFormRules: Record<CreatePostForm, Rule[]> = {
  [CreatePostForm.content]: [
    {
      required: true,
      message: FIELDS_VALIDATION_MESSAGE.NO_CONTENT,
    },
  ],
  [CreatePostForm.images]: [{}],
  [CreatePostForm.tags]: [{}],
};

export const editProfileFormRules: Record<EditProfileForm, Rule[]> = {
  [EditProfileForm.FirstName]: [
    { required: true, message: FIELDS_VALIDATION_MESSAGE.NO_FIRST_NAME },
  ],
  [EditProfileForm.LastName]: [
    { required: true, message: FIELDS_VALIDATION_MESSAGE.NO_LAST_NAME },
  ],
  [EditProfileForm.Bio]: [
    { required: true, message: FIELDS_VALIDATION_MESSAGE.NO_BIO },
  ],
  [EditProfileForm.CountryCode]: [
    { required: true, message: FIELDS_VALIDATION_MESSAGE.NO_COUNTRY_CODE },
  ],
  [EditProfileForm.PhoneNumber]: [
    { required: true, message: FIELDS_VALIDATION_MESSAGE.NO_PHONE_NUMBER },
    {
      pattern: /^[0-9]{10,15}$/,
      message: FIELDS_VALIDATION_MESSAGE.VALID_PHONE_NUMBER,
    },
  ],
  [EditProfileForm.Location]: [{}],
};
