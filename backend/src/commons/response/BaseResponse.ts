import { BaseApiRequest } from '../request/BaseApiRequest';

const STATUS_SUCCESS = '00';
const STATUS_FAILED = '99';
const MESSAGE_SUCCESS = 'Sukses';

class BaseResponse {
  constructor(
    request: BaseApiRequest,
    status: boolean,
    code: string,
    message: string,
    data: any,
  ) {
    this.transactionId = request && request.transactionId;
    this.channel = request && request.channel;
    this.status = status;
    this.code = code;
    this.desc = message;
    this.data = data;
  }
  transactionId?: string;
  channel?: string;
  status: boolean;
  code: string;
  desc: string;
  data: any;

  static createSuccessResponseV2(
    transactionId: string,
    channelId: string,
    data: any = null,
  ) {
    return new BaseResponse(
      new BaseApiRequest(transactionId, channelId),
      true,
      STATUS_SUCCESS,
      MESSAGE_SUCCESS,
      data,
    );
  }

  static createSuccessResponse(req: BaseApiRequest, data: any = null) {
    return new BaseResponse(req, true, STATUS_SUCCESS, MESSAGE_SUCCESS, data);
  }

  static createFailedResponse(
    req: BaseApiRequest,
    status = STATUS_FAILED,
    message = 'Failed',
    data: any = null,
  ) {
    return new BaseResponse(req, false, status, message, data);
  }
}

export default BaseResponse;
