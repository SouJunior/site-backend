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
import { UserEntity } from '../../database/entities/user.entity';
import { AdminService } from './admin.service';

@Controller('users')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.adminService.createUser(createUserDto);
  }

  @Patch(':id')
  async editUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.adminService.editUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.adminService.deleteUser(id);
  }

  @Get()
  async getAllUsers(): Promise<UserEntity[]> {
    return this.adminService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserEntity> {
    const user = await this.adminService.getUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Get(':email')
  async getUserByEmail(@Param('email') email: string): Promise<UserEntity> {
    const user = await this.adminService.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
