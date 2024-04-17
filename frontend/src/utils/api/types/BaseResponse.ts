export type BaseResponse<T> = {
  data: T;
  status: boolean;
  code: string;
  desc: string;
};
