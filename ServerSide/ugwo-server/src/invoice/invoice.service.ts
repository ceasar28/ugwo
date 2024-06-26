import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class InvoiceService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createInvoice(createInvoicedto: Prisma.InvoiceCreateInput) {
    return await this.databaseService.invoice.create({
      data: createInvoicedto,
    });
  }

  async updateInvoice(id: number, updateInvoicedto: Prisma.InvoiceUpdateInput) {
    return await this.databaseService.invoice.update({
      where: { id },
      data: updateInvoicedto,
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
        clientAddress: user,
      },
    });
    return { invoices: invoices };
  }
}
