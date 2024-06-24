import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: Prisma.UserCreateInput) {
    return await this.userService.createUser(createUserDto);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: Prisma.UserUpdateInput,
  ) {
    return await this.userService.updateUser(+id, updateUserDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(+id);
  }

  @Get(':displayName')
  async findUserAddress(@Param('displayName') displayName: string) {
    return await this.userService.findUserAddress(displayName);
  }

  @Get('users')
  async findAllUser() {
    return await this.userService.findAllUser();
  }
}
