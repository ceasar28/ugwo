import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { Prisma } from '@prisma/client';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  async createInvoice(@Body() createInvoiceDto: Prisma.InvoiceCreateInput) {
    return await this.invoiceService.createInvoice(createInvoiceDto);
  }

  @Patch(':id')
  async updateInvoice(
    @Param('id') id: string,
    @Body() updateInvoiceDto: Prisma.InvoiceUpdateInput,
  ) {
    return await this.invoiceService.updateInvoice(+id, updateInvoiceDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.invoiceService.delete(+id);
  }

  @Get()
  async findAllInvoice() {
    return await this.invoiceService.findAllInvoice();
  }

  @Get(':id')
  async findUserInvoice(@Param('id') id: string) {
    return await this.invoiceService.findUserInvoice(id);
  }

  @Get('receiver/:id')
  async findReceiverInvoice(@Param('id') id: string) {
    return await this.invoiceService.findUserInvoice(id);
  }
}
