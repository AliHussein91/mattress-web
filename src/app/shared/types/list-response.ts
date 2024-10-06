import { Pagination } from "./pagination";

export interface APIResponse<T> {
  data: T;
  meta: {
    pagination: Pagination;
  };
}
