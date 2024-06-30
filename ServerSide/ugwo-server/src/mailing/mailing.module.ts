import { Module } from '@nestjs/common';
import { MailingService } from './mailing.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.nodemailer_user,
          pass: process.env.nodemailer_password,
        },
      },
    }),
  ],
  providers: [MailingService],
  exports: [MailingService],
})
export class MailingModule {}
