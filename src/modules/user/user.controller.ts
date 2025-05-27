import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Get,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserEntity } from 'src/database/entities/user.mongo-entity';
import { UserService } from './user.service';
import { ObjectId } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags("Users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Patch(':id')
  async editUser(
    @Param('id') id: ObjectId,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.editUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: ObjectId) {
    return this.userService.deleteUser(id);
  }

  @Get()
  async getAllUsers(): Promise<UserEntity[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: ObjectId): Promise<UserEntity> {
    const user = await this.userService.getUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Get(':email')
  async getUserByEmail(@Param('email') email: string): Promise<UserEntity> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
