import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class PaymentRequestService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createPaymentRequest(
    createPaymentRequestDto: Prisma.RequestCreateInput,
  ) {
    return await this.databaseService.request.create({
      data: createPaymentRequestDto,
    });
  }

  async updatePaymentRequest(
    id: number,
    updatePaymentRequestDto: Prisma.RequestUpdateInput,
  ) {
    return await this.databaseService.request.update({
      where: { id },
      data: updatePaymentRequestDto,
    });
  }

  async delete(id: number) {
    return await this.databaseService.request.delete({ where: { id } });
  }

  async findAllPaymentRequest() {
    return await this.databaseService.request.findMany();
  }

  async findUserPaymentRequest(user: string) {
    const PaymentRequests = await this.databaseService.request.findMany({
      where: { user_id: +user },
    });
    return { PaymentRequests: PaymentRequests };
  }

  async findRequesteePaymentRequest(user: string) {
    const PaymentRequests = await this.databaseService.request.findMany({
      where: {
        to_Id: +user,
      },
    });
    return { PaymentRequests: PaymentRequests };
  }
}
