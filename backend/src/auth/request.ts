import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { BaseApiRequest } from 'src/commons/request/BaseApiRequest';

export class LoginRequestDto extends BaseApiRequest {
  @ApiProperty({ description: 'Email User', default: 'test@gmail.com' })
  @IsEmail()
  email: string;
}

export class LoginPasswordRequestDto extends LoginRequestDto {
  @IsNotEmpty()
  @ApiPropertyOptional({ description: 'Password User', default: 'xxxxx' })
  password: string;
}

export class DeleteRequestDto {
  @IsNotEmpty()
  @ApiPropertyOptional({ description: 'Password User', default: 'xxxxx' })
  password: string;
}

export class RegisterRequestDto extends BaseApiRequest {
  @ApiProperty({ description: 'Email User', default: 'test@gmail.com' })
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @ApiPropertyOptional({ description: 'Name', default: 'xxxxx' })
  name: string;

  @ApiPropertyOptional({
    description: 'Profile Image',
    default: 'http://www.google.com/',
  })
  image?: string;
}

export class RegisterPasswordRequestDto extends RegisterRequestDto {
  @IsNotEmpty()
  @ApiPropertyOptional({ description: 'Password User', default: 'xxxxx' })
  password: string;
}
