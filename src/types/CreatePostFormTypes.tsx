export interface CreatePostData {
  content: string;
  images?: Array<File>;
  tags?: Array<string>;
}
