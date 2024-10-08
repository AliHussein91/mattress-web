export class ProductListFilter {
    country_id:string|null = null;
    brand_id:string|null = null;
    category_id:string|null = null;
    quality_level_id:string|null = null;
    offer:string|null = null;
    price:string|null = null;
    include:string = 'offer,rates,actions,images,sizes,sections';
    
}