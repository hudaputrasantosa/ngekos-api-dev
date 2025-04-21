import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '@/models/user/user';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@/utils/errors/http_error';
import bcrypt from 'bcryptjs';

interface JWTPayload {
  id: string;
  isAdmin: boolean;
}

export class AuthService {
  // Inject dependency if needed
  // constructor(private readonly userModel: Model<any>) {}

  async registerUser(payload: RegisterBody): Promise<any> {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(payload.password, salt);

      const newUser = new User({
        username: payload.username,
        email: payload.email,
        password: hashedPassword,
      });

      return await newUser.save();
    } catch (error) {
      console.error('Register Error:', error);
      throw error;
    }
  }

  async login(payload: LoginBody): Promise<LoginResponse> {
    try {
      const user = await User.findOne({ username: payload.username });
      if (!user) {
        throw new NotFoundException('password or email is invalid');
      }

      const isMatch = await bcrypt.compare(payload.password, user.password);
      if (!isMatch) {
        throw new BadRequestException('password or email is invalid');
      }

      if (!process.env.JWT_SECRET_KEY) {
        console.error('JWT secret key is not defined');
        throw new InternalServerErrorException(GLOBAL_ERROR_MESSAGE);
      }

      const jwtPayload: JwtPayload = {
        id: user._id.toString(),
        isAdmin: user.isAdmin,
      };

      const token = jwt.sign(jwtPayload, process.env.JWT_SECRET_KEY);
      const response: LoginResponse = {
        token,
        user,
      };

      return response;
    } catch (error) {
      console.error('login Error:', error);
      throw error;
    }
  }
}
