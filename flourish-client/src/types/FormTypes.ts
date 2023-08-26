export interface Login {
  email: string;
  password: string;
}

export interface Signup extends Login {
  type: string;
}

export interface Form {
  login: Login;
  signup: Signup;
}
