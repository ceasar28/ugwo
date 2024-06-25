import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PaymentRequestService } from './payment-request.service';
import { Prisma } from '@prisma/client';

@Controller('payment-request')
export class PaymentRequestController {
  constructor(private readonly paymentRequestService: PaymentRequestService) {}

  @Post()
  async createPaymentRequest(
    @Body() createPaymentRequestDto: Prisma.RequestCreateInput,
  ) {
    return await this.paymentRequestService.createPaymentRequest(
      createPaymentRequestDto,
    );
  }

  @Patch(':id')
  async updatePaymentRequest(
    @Param('id') id: string,
    @Body() updatePaymentRequestDto: Prisma.RequestUpdateInput,
  ) {
    return await this.paymentRequestService.updatePaymentRequest(
      +id,
      updatePaymentRequestDto,
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.paymentRequestService.delete(+id);
  }

  @Get()
  async findAllPaymentRequest() {
    return await this.paymentRequestService.findAllPaymentRequest();
  }

  @Get(':id')
  async findUserPaymentRequest(@Param('id') id: string) {
    return await this.paymentRequestService.findUserPaymentRequest(id);
  }

  @Get('requestee/:id')
  async findRequesteePaymentRequest(@Param('id') id: string) {
    return await this.paymentRequestService.findRequesteePaymentRequest(id);
  }
}
