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
