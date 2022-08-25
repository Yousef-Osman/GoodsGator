import { PaginationParams } from "./pagination-params";

export class ProductParams extends PaginationParams{
  searchValue: string = null;
  orderBy: string = null;
  categories: number[] = null;
  brands: number[] = null;

  constructor(){
    super();
  }
}
