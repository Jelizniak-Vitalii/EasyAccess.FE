export interface AuthLogin {
  email: string;
  password: string;
}

export interface AuthRegistration extends AuthLogin {
  firstName: string;
  lastName: string;
}
