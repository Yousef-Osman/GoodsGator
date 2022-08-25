export interface Category {
  id: number;
  name: string;
  createdOn: Date;
  lastModifiedOn?: any;
  deletedOn?: any;
  isDeleted: boolean;
}
