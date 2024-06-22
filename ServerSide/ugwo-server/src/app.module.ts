import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BotModule } from './bot/bot.module';
import { UserModule } from './user/user.module';
import { InvoiceModule } from './invoice/invoice.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [BotModule, UserModule, InvoiceModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
