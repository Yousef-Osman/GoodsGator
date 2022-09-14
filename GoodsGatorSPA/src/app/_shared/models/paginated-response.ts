import { IPagination } from "../interfaces/iPagination"

export class PaginatedResponse<T> {
  body: T;
  pagination: IPagination;
}
