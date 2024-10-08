import { IAction } from "./action";
import { IBrand } from "./brand";
import { ICategory } from "./category";
import { IMedia } from "./media";
import { IOffer } from "./offer";
import { IPrice } from "./price";
import { IQualityLevel } from "./qualityLevel";
import { IRate } from "./rate";
import { ISection } from "./section";
import { ISize } from "./size";

export class Product {
  constructor(){
    this.image = '';
    this.name = '';
    this.orderQuantity = 0;
    this.selectedSize = '';
    this.small_image = '';
    this.rate_avr = 0;
  }
  cover: string = '';
  actions: { data: IAction[] } = { data: [] };
  brand_id: number = 0;
  brand: { data: IBrand } = { data: {} as IBrand };
  category: { data: ICategory } = { data: {} as IBrand };
  offer: { data: IOffer } = { data: {} as IOffer };
  images?: { data: IMedia[] }  ;
  category_id?: number;
  rate_avr: number;
  description?: string;
  mini_description?: string;
  created_at?: Date;
  id?: string;
  image: string;
  small_image: string;
  is_active?: boolean;
  is_favourite?: boolean;
  name: string='';
  price: { data: IPrice } = { data: {} as IPrice };
  sizes?: { data: ISize[] } ;
  quality_level: { data: IQualityLevel } = { data: {} as IBrand };
  quality_level_id: number =0
  sections?: { data: ISection[] }  ;
  rates?: { data: IRate[] } ;
  type?: string;
  updated_at?: Date;
  orderQuantity?: number;
  selectedSize?: string;
  most_sold_product:boolean = false;
  relatedProducts?:{data: Product[]};
}
