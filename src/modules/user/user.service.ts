import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ObjectId } from 'typeorm';
import { UserEntity } from 'src/database/entities/user.mongo-entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity, 'mongoConnection')
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(userData: Partial<UserEntity>): Promise<UserEntity> {
    const newUser = this.userRepository.create(userData);
    return this.userRepository.save(newUser);
  }

  async editUser(
    userId: ObjectId,
    newData: Partial<UserEntity>,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id: userId } })
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    const updatedUser = { ...user, ...newData };
    return this.userRepository.save(updatedUser);
  }

  async deleteUser(userId: ObjectId): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    await this.userRepository.remove(user);
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async getUserById(id: ObjectId): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
