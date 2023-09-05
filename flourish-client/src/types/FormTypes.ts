export interface SignIn {
  email: string;
  password: string;
}

export interface SignUp extends SignIn {
  type: string;
}

export interface Form {
  signIn: SignIn;
  signUp: SignUp;
}
