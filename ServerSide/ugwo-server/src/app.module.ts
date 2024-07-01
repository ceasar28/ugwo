import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { BotModule } from './bot/bot.module';
import { UserModule } from './user/user.module';
import { InvoiceModule } from './invoice/invoice.module';
import { DatabaseModule } from './database/database.module';
import { PaymentRequestModule } from './payment-request/payment-request.module';
import { MailingModule } from './mailing/mailing.module';

@Module({
  imports: [UserModule, InvoiceModule, DatabaseModule, PaymentRequestModule, MailingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
