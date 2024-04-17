import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export enum ChannelRequest {
  ANDROID,
  WEB,
}

export class BaseApiRequest {
  constructor(transactionId, channelId) {
    this.transactionId = transactionId;
    this.channel = channelId;
  }
  @ApiProperty({ description: 'Free Text', default: 'SS12312839123' })
  @IsNotEmpty()
  transactionId: string;
  @ApiProperty({
    description: 'channel',
    enum: ChannelRequest,
    default: ChannelRequest.WEB,
  })
  @IsNotEmpty()
  channel: string;
}
