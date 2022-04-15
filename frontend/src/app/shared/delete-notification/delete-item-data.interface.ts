import { ItemToDelete } from '../enums/item-to-delete.enum';

export interface IDeleteItemData {
  id: string;
  item: ItemToDelete;
}
