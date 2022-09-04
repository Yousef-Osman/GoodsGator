import { PaginationParams } from "./pagination-params";

export class ProductParams extends PaginationParams{
  searchValue: string = null;
  orderBy: string = null;
  category: number = 0;
  brands: number[] = [];

  constructor(){
    super();
  }
}
