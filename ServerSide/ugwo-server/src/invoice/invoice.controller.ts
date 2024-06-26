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
import { invoiceDTO } from './dto/invoice.dto';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('invoice')
@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @ApiOperation({ summary: 'Create Invoice' })
  @ApiBody({
    type: invoiceDTO,
    description: 'Json structure for invoice object',
  })
  @Post()
  async createInvoice(@Body() createInvoicedto: Prisma.InvoiceCreateInput) {
    console.log(createInvoicedto);
    return await this.invoiceService.createInvoice(createInvoicedto);
  }

  @ApiOperation({ summary: 'Update Invoice' })
  @ApiBody({
    type: invoiceDTO,
    description:
      'Json structure for invoice object, here most of the field are not required',
  })
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

  @Get('receiver/:address')
  async findReceiverInvoice(@Param('address') address: string) {
    return await this.invoiceService.findUserInvoice(address);
  }
}
