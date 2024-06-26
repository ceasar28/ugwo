import { ApiProperty } from '@nestjs/swagger';

export class userDTO {
  @ApiProperty({
    description: 'User displayname/tag',
    example: 'JohnDoe',
    required: false,
  })
  displayName?: string;

  @ApiProperty({
    description: 'User firstname',
    example: 'John',
    required: false,
  })
  firstName?: string;

  @ApiProperty({
    description: 'User lastName',
    example: 'Doe',
    required: false,
  })
  lastName?: string;

  @ApiProperty({
    description: ' user email',
    example: 'ugrobotech@gmail.com',
    required: false,
  })
  email?: string;

  @ApiProperty({
    description: ' user wallet Address',
    example: '0x356273735273232663237...',
    required: false,
  })
  walletAddress?: string;
}
