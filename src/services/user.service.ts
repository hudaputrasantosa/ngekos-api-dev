import User from '@/models/user/user';
import { NotFoundException } from '@/utils/errors/http_error';
import bcrypt from 'bcryptjs';

export class UserService {
  // Inject dependency if needed
  // constructor(private readonly userModel: Model<any>) {}

  async updateUserById(id: string, payload: IUserUpdate): Promise<any> {
    try {
      if (payload.password) {
        const salt = await bcrypt.genSalt(10);
        payload.password = await bcrypt.hash(payload.password, salt);
      }

      const updatedUser = await User.findByIdAndUpdate(id, { $set: payload }, { new: true });

      if (!updatedUser) {
        throw new NotFoundException('user not found');
      }

      const { password, ...userWithoutPassword } = updatedUser.toObject();
      return userWithoutPassword;
    } catch (error) {
      console.error('Update User Error:', error);
      throw error;
    }
  }

  async deleteUserById(id: string): Promise<void> {
    try {
      const deletedUser = await User.findByIdAndDelete(id);

      if (!deletedUser) {
        throw new NotFoundException('user not found');
      }
    } catch (error) {
      console.error('Delete User Error:', error);
      throw error;
    }
  }

  async getUserById(id: string): Promise<any> {
    try {
      const user = await User.findById(id);

      if (!user) {
        throw new NotFoundException('user not found');
      }

      const { password, ...userWithoutPassword } = user.toObject();
      return userWithoutPassword;
    } catch (error) {
      console.error('Get User Error:', error);
      throw error;
    }
  }
  async getAllUsers(): Promise<any> {
    try {
      const users = await User.find().select('-password');
      return users;
    } catch (error) {
      console.error('Get All User Error:', error);
      throw error;
    }
  }
}
