export interface LoginData {
  username: string;
  password: string;
}

export interface LoginResponse {
  statusCode: number;
  data: {
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
  };
  message: string;
  success: boolean;
}

// singup

export interface SignupData {
  email: string;
  username: string;
  password: string;
}
