interface IUserUpdate {
  username?: string;
  email?: string;
  password?: string;
  isAdmin?: boolean;
  [key: string]: any;
}
