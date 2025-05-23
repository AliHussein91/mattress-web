export class ProductListFilter {
  country_id: string | null = null;
  brand_id: string | null = null;
  category_id: string | null = null;
  quality_level_id: string | null = null;
  offer: string | null = null;
  price: string | null = null;
  per_page: number = 10;
  search_key: string = '';
  page: number = 1;
  include: string = 'offer,rates,actions,images,sizes,sections';
}
