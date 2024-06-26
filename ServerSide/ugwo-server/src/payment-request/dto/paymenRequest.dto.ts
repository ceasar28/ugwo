import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';

enum Status {
  PENDING,
  PAID,
  DECLINE,
}

export class paymentRequestDTO {
  @ApiProperty({
    description: 'The detail of payment',
    example: 'For food',
    required: false,
  })
  detail?: string;

  @ApiProperty({
    description: 'Amount charged',
    example: '5000',
    required: false,
  })
  amount?: string;

  @ApiProperty({
    description: 'The status of the Payment request',
    enum: Status,
    example: 'PENDING',
    required: false,
  })
  status?: Status;

  @ApiProperty({ description: 'sender Id', example: 3, required: false })
  user_id?: number;

  @ApiProperty({
    description: 'The tag name / wallet address of user/Merchant',
    example: 'johnDoe or 0x023527625632..',
    required: false,
  })
  receivingAddress?: string;

  @ApiProperty({
    description: 'The tag name / wallet address of payer',
    example: 'johnDoe or 0x023527625632..',
    required: false,
  })
  payerAddress: string;
}
