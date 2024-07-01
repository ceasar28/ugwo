import { Module } from '@nestjs/common';
import { PaymentRequestController } from './payment-request.controller';
import { PaymentRequestService } from './payment-request.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PaymentRequestController],
  providers: [PaymentRequestService],
})
export class PaymentRequestModule {}
