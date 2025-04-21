interface RegisterBody {
  username: string;
  email: string;
  password: string;
}

interface LoginBody {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: IUserUpdate;
}
