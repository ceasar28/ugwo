import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';

export enum Status {
  PENDING = 'PENDING',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
}

export class invoiceDTO {
  @ApiProperty({
    description: 'The name of the client',
    example: 'John Doe',
    required: false,
  })
  clientName?: string;

  @ApiProperty({
    description: ' clients email',
    example: 'ugrobotech@gmail.com',
    required: false,
  })
  clientEmail?: string;

  @ApiProperty({
    description: 'Info about service rendered',
    example: 'Kitchen repairs',
    required: false,
  })
  ServiceInfo?: string;

  @ApiProperty({
    description: 'Amount charged',
    example: '5000',
    required: false,
  })
  amount?: string;

  @ApiProperty({
    description: 'The status of the invoice',
    enum: Status,
    example: 'PENDING',
    required: false,
  })
  status?: Status;

  @ApiProperty({
    description: 'The ID of the user associated with the invoice',
    example: 1,
  })
  user_id?: number;

  @ApiProperty({
    description: 'The tag name or wallet address of user',
    example: 'johnDoe or 0x023527625632..',
    required: false,
  })
  receivingAddress?: string;

  @ApiProperty({
    description: 'The tag name / wallet address of client',
    example: 'johnDoe or 0x023527625632..',
    required: false,
  })
  clientAddress?: string;
}
