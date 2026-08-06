import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { NotificationService } from '../notification/notification.service';
import { NotificationType } from 'src/notification/dto/create-notification.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly notificationService: NotificationService,
  ) {}

  // ✅ Create new user
async create(createUserDto: CreateUserDto): Promise<User> {
  // 🧹 Remove empty strings so Mongoose defaults apply
  Object.keys(createUserDto).forEach((key) => {
    if (createUserDto[key] === '') {
      delete createUserDto[key];
    }
  });

  // 🧩 Optional fields that can be skipped
  const optionalFields = ['role', 'image', 'lastLogin', 'status', 'password'];

  // 🚨 Required fields check
  const emptyFields = Object.entries(createUserDto)
    .filter(
      ([key, value]) =>
        !optionalFields.includes(key) &&
        (value === undefined || value === null || value === '')
    )
    .map(([key]) => key);

  if (emptyFields.length) {
    throw new BadRequestException({
      message: '❌ Required fields missing',
      fields: emptyFields,
    });
  }

  // 🕵️ Duplicate checks
  const existingEmail = await this.userModel.findOne({ email: createUserDto.email });
  if (existingEmail)
    throw new BadRequestException({ message: '❌ Email already exists', field: 'email' });

  const existingPhone = await this.userModel.findOne({ phone: createUserDto.phone });
  if (existingPhone)
    throw new BadRequestException({ message: '❌ Phone already exists', field: 'phone' });

  const existingCnic = await this.userModel.findOne({ cnic: createUserDto.cnic });
  if (existingCnic)
    throw new BadRequestException({ message: '❌ CNIC already exists', field: 'cnic' });

  try {
    // 🔐 Handle password (default 123456 if missing)
    let passwordToHash = createUserDto.password;
    if (!passwordToHash || passwordToHash.trim() === '') {
      passwordToHash = '123456';
    }

    const hashedPassword = await bcrypt.hash(passwordToHash, 10);

    // 🧑‍💻 Create user with hashed password
    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });

    const savedUser = await createdUser.save();

    // 👇 welcome notification
    await this.notificationService.create({
      userId: savedUser._id.toString(),
      title: 'Welcome! 🎉',
      body: `Hi ${savedUser.name || 'there'}, welcome to our store! Start exploring now.`,
      type: NotificationType.GENERAL,
      data: {},
    });

    return savedUser;
  } catch (error) {
    throw new BadRequestException({
      message: '❌ Failed to create user',
      error: error.message,
    });
  }
}




  // ✅ Get all users
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  // ✅ Get single user
  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException({ message: '❌ User not found', field: 'id' });
    }
    return user;
  }

  // ✅ Update user
async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
  // Agar password bheja jaa raha hai toh hash karo
  if (updateUserDto.password) {
    updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
  }

  // Direct update
  const updatedUser = await this.userModel
    .findByIdAndUpdate(id, updateUserDto, { new: true })
    .exec();

  if (!updatedUser) {
    throw new NotFoundException({ message: '❌ User not found', field: 'id' });
  }

  return updatedUser;
}




  // ✅ Delete user
  async remove(id: string): Promise<{ message: string }> {
    const result = await this.userModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException({ message: '❌ User not found', field: 'id' });
    }
    return { message: '✅ User deleted successfully' };
  }
}