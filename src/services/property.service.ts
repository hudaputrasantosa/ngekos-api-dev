import Property from '@/models/property/property';
import { BadRequestException, NotFoundException } from '@/utils/errors/http_error';

export class PropertyService {
  // Inject dependency if needed
  // constructor(private readonly userModel: Model<any>) {}

  async create(payload: RegisterBody): Promise<any> {
    try {
      const newProperty = new property(payload);
      return await newProperty.save();
    } catch (error) {
      console.error('Create Property Error:', error);
      throw error;
    }
  }

  async update(id: string, payload: RegisterBody): Promise<any> {
    try {
      const updatedProperty = await Property.findByIdAndUpdate(
        id,
        { $set: payload },
        { new: true }
      );

      if (!updatedProperty) {
        throw new NotFoundException('properti not found');
      }

      return updatedProperty;
    } catch (error) {
      console.error('Update Property Error:', error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const deletedProperty = await Property.findByIdAndDelete(id);

      if (!deletedProperty) {
        throw new BadRequestException('failed delete property');
      }
    } catch (error) {
      console.error('Delete Property Error:', error);
      throw error;
    }
  }

  async findById(id: string): Promise<any> {
    try {
      const getProperty = await Property.findById(id);

      if (!getProperty) {
        throw new NotFoundException('property not found');
      }

      return getProperty;
    } catch (error) {
      console.error('Get Property Error:', error);
      throw error;
    }
  }

  async findAll({ min, max, limit }: IPropertyQuery): Promise<any> {
    try {
      return await Property.find({
        price: {
          $gt: min ? Number(min) - 1 : 1,
          $lt: max ? Number(max) + 1 : 100000000,
        },
      }).limit(limit ? Number(limit) : 0);
    } catch (error) {
      console.error('Get Property Error:', error);
      throw error;
    }
  }

  async countPropertyByCity(cities: string[]): Promise<any> {
    try {
      return await Promise.all(cities.map((city) => Property.countDocuments({ city })));
    } catch (error) {
      console.error('Get Property By City Error:', error);
      throw error;
    }
  }

  async countPropertyByType(): Promise<any> {
    try {
      const [countMale, countFemale, countMixed] = await Promise.all([
        Property.countDocuments({ type: 'putra' }),
        Property.countDocuments({ type: 'putri' }),
        Property.countDocuments({ type: 'campuran' }),
      ]);

      const listType: IPropertyTypeCount[] = [
        { type: 'putra', count: countMale },
        { type: 'putri', count: countFemale },
        { type: 'campuran', count: countMixed },
      ];

      return listType;
    } catch (error) {
      console.error('Get Property By City Error:', error);
      throw error;
    }
  }
}
