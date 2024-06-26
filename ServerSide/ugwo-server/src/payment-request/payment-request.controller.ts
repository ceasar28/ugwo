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
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { paymentRequestDTO } from './dto/paymenRequest.dto';

@ApiTags('Payment Request')
@Controller('payment-request')
export class PaymentRequestController {
  constructor(private readonly paymentRequestService: PaymentRequestService) {}

  @ApiOperation({ summary: 'Create payment request' })
  @ApiBody({
    type: paymentRequestDTO,
    description: 'Json structure for payment request object',
  })
  @Post()
  async createPaymentRequest(
    @Body() createPaymentRequestDto: Prisma.RequestCreateInput,
  ) {
    return await this.paymentRequestService.createPaymentRequest(
      createPaymentRequestDto,
    );
  }

  @ApiOperation({ summary: 'Update Payment request' })
  @ApiBody({
    type: paymentRequestDTO,
    description:
      'Json structure for Payment request object, here most of the field are not required',
  })
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

  @ApiOperation({ summary: 'Delete a Payment' })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.paymentRequestService.delete(+id);
  }

  @ApiOperation({ summary: 'find all payment Request' })
  @Get()
  async findAllPaymentRequest() {
    return await this.paymentRequestService.findAllPaymentRequest();
  }

  @ApiOperation({ summary: 'Get all User Payment request sent by a user' })
  @Get(':id')
  async findUserPaymentRequest(@Param('id') id: string) {
    return await this.paymentRequestService.findUserPaymentRequest(id);
  }

  @ApiOperation({ summary: 'Get  Payment request sent to a user' })
  @Get('requestee/:address')
  async findRequesteePaymentRequest(@Param('address') address: string) {
    return await this.paymentRequestService.findRequesteePaymentRequest(
      address,
    );
  }
}
