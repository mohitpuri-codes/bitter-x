export enum CreateAuthForm {
  Email = 'email',
  Username = 'username',
  Password = 'password',
}

export type CreateAuthFormType = {
  [CreateAuthForm.Email]: string;
  [CreateAuthForm.Password]: string;
  [CreateAuthForm.Username]: string;
};
