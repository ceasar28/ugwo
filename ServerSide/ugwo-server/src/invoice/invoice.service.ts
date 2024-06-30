import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { MailingService } from 'src/mailing/mailing.service';

@Injectable()
export class InvoiceService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly mailingService: MailingService,
  ) {}

  async createInvoice(createInvoicedto: Prisma.InvoiceCreateInput) {
    try {
      // const sendMail = await this.mailingService.sendInvoiceMail(
      //   createInvoicedto.ServiceInfo,
      //   createInvoicedto.clientEmail,
      // );
      // if (sendMail) console.log(sendMail);

      return await this.databaseService.invoice.create({
        data: createInvoicedto,
      });
    } catch (error) {
      console.log(error);
    }
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
