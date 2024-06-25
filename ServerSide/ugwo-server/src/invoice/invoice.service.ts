import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class InvoiceService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createInvoice(createInvoiceDto: Prisma.InvoiceCreateInput) {
    return await this.databaseService.invoice.create({
      data: createInvoiceDto,
    });
  }

  async updateInvoice(id: number, updateInvoiceDto: Prisma.InvoiceUpdateInput) {
    return await this.databaseService.invoice.update({
      where: { id },
      data: updateInvoiceDto,
    });
  }

  async delete(id: number) {
    return await this.databaseService.invoice.delete({ where: { id } });
  }

  async findAllInvoice() {
    return await this.databaseService.invoice.findMany();
  }

  async findUserInvoice(user: string) {
    const invoices = await this.databaseService.invoice.findMany({
      where: { user_id: +user },
    });
    return { invoices: invoices };
  }

  async findReceiverInvoice(user: string) {
    const invoices = await this.databaseService.invoice.findMany({
      where: {
        clientId: +user,
      },
    });
    return { invoices: invoices };
  }
}
