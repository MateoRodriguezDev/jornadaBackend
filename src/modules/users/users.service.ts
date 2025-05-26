import { HttpStatus, Injectable, NotFoundException, BadRequestException, ConflictException, ForbiddenException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hashPassword } from 'src/helpers/bcrypt.helper';
import { User } from './user.model';
import { InjectModel } from '@nestjs/sequelize';
import { envs } from 'src/config/envs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email } = createUserDto;
    createUserDto.password = await hashPassword(createUserDto.password);

    const user = await this.userModel.findOne({ where: { email } });
    if (user) {
      if (!user.deletedAt) {
        throw new ConflictException('User already exists');
      }
      await this.userModel.destroy({ where: { email: user.email } });
    }

    return this.userModel.create({ ...createUserDto });
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.findAll({ where: { deletedAt: null } });
    if (users.length === 0) {
      throw new NotFoundException('No users found');
    }
    return users;
  }

  async findOne(id: number, getDeletes?: boolean): Promise<User> {
    const where: any = { id, deletedAt: null };
    if (getDeletes) delete where.deletedAt;
    const user = await this.userModel.findOne({ where });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findOneByEmail(email: string, getDeletes?: boolean): Promise<User> {
    const where: any = { email, deletedAt: null };
    if (getDeletes) delete where.deletedAt;
    const user = await this.userModel.findOne({ where });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: Partial<UpdateUserDto>, getDeletes?: boolean) {
    const user = await this.findOne(id, getDeletes);

    if (updateUserDto.email !== undefined) {
      const isUsed = await this.userModel.findOne({ where: { email: updateUserDto.email } });
      if (isUsed) {
        throw new ConflictException('Email already exists');
      }
    }

    await user.update(updateUserDto);
    await user.save()
    return user;
  }

  async changeRole(id: number) {
    const user = await this.findOne(id);
    if (user.role === 'admin') {
      return this.update(id, { role: 'user' });
    } else if (user.role === 'user') {
      return this.update(id, { role: 'admin' });
    } else {
      throw new ForbiddenException("SuperAdmin's role cannot be changed");
    }
  }

  async remove(id: number) {
    const user = await this.findOne(id, false);
    if (user.role === 'superadmin') {
      throw new ForbiddenException("SuperAdmin can't be deleted");
    }

    await this.update(id, { deletedAt: new Date() });
    return `${user.email} has been deleted`;
  }

  async restore(id: number) {
    return this.update(id, { deletedAt: null }, true);
  }

  async createSuperAdmin() {
    const email = envs.superadmin_email;
    const password = envs.superadmin_pass;
    const role = 'superadmin';

    const existing = await this.userModel.findOne({ where: { email } });
    if (existing) {
      throw new ConflictException('SuperAdmin already exists');
    }

    const hashedPassword = await hashPassword(password);
    return this.userModel.create({ email, password: hashedPassword, role });
  }
}
