export interface LoginData {
  username: string;
  password: string;
}

export interface APIResponse<T> {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
}

export interface LoggedinUserReponse {
  user: {
    _id: string;
    avatar: {
      url: string;
      localPath: string;
      _id: string;
    };
    username: string;
    email: string;
    role: string;
    loginType: string;
    isEmailVerified: boolean;
    createdAt: string;
    updatedAt: string;
    __v: 0;
  };
  accessToken: string;
  refreshToken: string;
}

// signup

export interface SignupData {
  email: string;
  username: string;
  password: string;
}
