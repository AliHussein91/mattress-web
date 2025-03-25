export interface IResponse<T, M = any> {
  data: T;
  meta?: M;
}
