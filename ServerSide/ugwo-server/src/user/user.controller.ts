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

  @ApiOperation({ summary: 'Delete User' })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(+id);
  }

  @ApiOperation({ summary: 'Get users wallet from thier displayname' })
  @Get('get-wallet/:displayName')
  async findUserAddress(@Param('displayName') displayName: string) {
    return await this.userService.findUserAddress(displayName);
  }

  @ApiOperation({ summary: 'Find a user by thier wallet address' })
  @Get('get-user/:walletAddress')
  async findUserByAddress(@Param('walletAddress') walletAddress: string) {
    return await this.userService.findUserByAddress(walletAddress);
  }

  @ApiOperation({ summary: 'Get all Users' })
  @Get()
  async findAllUser() {
    return await this.userService.findAllUser();
  }
}
