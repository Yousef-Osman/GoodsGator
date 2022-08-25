import { Pagination } from "../interfaces/pagination"

export class PaginatedResponse<T> {
  body: T;
  pagination: Pagination;
}
