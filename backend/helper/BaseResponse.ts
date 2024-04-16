export type BaseResponse<T> = {
  data: T;
  status: string;
  message: string;
};
