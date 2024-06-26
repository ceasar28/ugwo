import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createUser(createUserDto: Prisma.UserCreateInput) {
    return await this.databaseService.user.create({ data: createUserDto });
  }

  async updateUser(id: number, updateUserDto: Prisma.UserUpdateInput) {
    return await this.databaseService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async delete(id: number) {
    return await this.databaseService.user.delete({ where: { id } });
  }

  async findAllUser() {
    return await this.databaseService.user.findMany();
  }
  async findUserAddress(displayName: string) {
    const user = await this.databaseService.user.findFirst({
      where: { displayName },
    });
    return { address: user.walletAddress };
  }

  async findUserByAddress(walletAddress: string) {
    const user = await this.databaseService.user.findFirst({
      where: { walletAddress },
    });
    return { user: user };
  }
}
