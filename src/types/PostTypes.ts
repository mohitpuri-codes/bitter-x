export interface GetAllPosts {
  statusCode: number;
  data: {
    posts: PostData[];
    totalPosts: number;
    limit: number;
    page: number;
    totalPages: number;
    serialNumberStartFrom: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: null;
    nextPage: null;
  };
  message: string;
  success: boolean;
}

export interface PostData {
  _id: string;
  content: string;
  tags: Array<string>;
  images: [
    {
      url: string;
      localPath: string;
      _id: string;
    },
  ];
  author: UserSchema;
  createdAt: string;
  updatedAt: string;
  __v: number;
  comments: number;
  likes: number;
  isLiked: boolean;
  isBookmarked: boolean;
}

export interface PostResponseSchema {
  statusCode: 201;
  data: {
    _id: string;
    content: string;
    tags: Array<string>;
    images: [
      {
        url: string;
        localPath: string;
        _id: string;
      },
    ];
    author: UserSchema;
    createdAt: string;
    updatedAt: string;
    __v: number;
    comments: number;
    likes: number;
    isLiked: boolean;
    isBookmarked: boolean;
  };
  message: string;
  success: boolean;
}

export interface UserSchema {
  _id: string;
  coverImage: {
    url: string;
    localPath: string;
    _id: string;
  };
  firstName: string;
  lastName: string;
  bio: string;
  dob: null;
  location: string;
  countryCode: string;
  phoneNumber: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  account: {
    _id: string;
    avatar: {
      url: string;
      localPath: string;
      _id: string;
    };
    username: string;
    email: string;
  };
}
