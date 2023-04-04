export interface UserRequest {
  user: string;
  pwd: string;
}

export interface User {
  username: string;
  role: object;
}

export interface UserResponse {
  accessToken: string;
  username: User;
  error: object;
}
