export interface IUser {
  name: string;
  password: string;
  email: string;
  active: boolean;
}

export type ErrorMessage = { message: string };
