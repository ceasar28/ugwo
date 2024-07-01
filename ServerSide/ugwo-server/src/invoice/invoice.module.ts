import { Module } from '@nestjs/common';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';
import { DatabaseModule } from 'src/database/database.module';
import { MailingModule } from 'src/mailing/mailing.module';

@Module({
  imports: [DatabaseModule, MailingModule],
  controllers: [InvoiceController],
  providers: [InvoiceService],
})
export class InvoiceModule {}
