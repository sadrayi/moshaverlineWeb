export interface CategoriesData {
  _id: number;
  name: string;
  category_pic: string;
  doctorcount: number;
}
export class CategoriesModel {
  data: CategoriesData[];
  code: number;
  message: string;
}
