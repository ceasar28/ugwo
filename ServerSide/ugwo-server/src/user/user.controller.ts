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
import { userDTO } from './dto/user.dto';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create User' })
  @ApiBody({
    type: userDTO,
    description: 'Json structure for User object',
  })
  @Post()
  async createUser(@Body() createUserDto: Prisma.UserCreateInput) {
    return await this.userService.createUser(createUserDto);
  }

  @ApiOperation({ summary: 'Update User' })
  @ApiBody({
    type: userDTO,
    description:
      'Json structure for User object, here most of the field are not required',
  })
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

  @Get()
  async findAllUser() {
    return await this.userService.findAllUser();
  }
}
