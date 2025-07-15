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

// post creation
export enum CreatePostForm {
  content = 'content',
  images = 'images',
  tags = 'tags',
}

export type CreatePostFormType = {
  [CreatePostForm.content]: string;
  [CreatePostForm.images]?: Array<File>;
  [CreatePostForm.tags]?: Array<string>;
};

// update user information
export enum EditProfileForm {
  FirstName = 'firstName',
  LastName = 'lastName',
  Bio = 'bio',
  PhoneNumber = 'phoneNumber',
  CountryCode = 'countryCode',
  Location = 'location',
}

export type EditProfileFormType = {
  [EditProfileForm.FirstName]: string;
  [EditProfileForm.LastName]: string;
  [EditProfileForm.Bio]: string;
  [EditProfileForm.PhoneNumber]: string;
  [EditProfileForm.CountryCode]: string;
  [EditProfileForm.Location]: string;
};
