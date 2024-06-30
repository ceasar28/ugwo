import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailingService {
  constructor(private readonly mailService: MailerService) {}
  async sendInvoiceMail(message: string, to: string) {
    return this.mailService.sendMail({
      from: 'Ugwo <techfromroot@gmail.com>',
      to,
      subject: `Invoice sending`,
      text: message,
    });
  }
}
