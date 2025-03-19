export interface Stock {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
  }
  
  export interface StocksResponse {
    products: Stock[];
    total: number;
    skip: number;
    limit: number;
  }
  
  export enum SortOrder {
    ASC = 'asc',
    DESC = 'desc',
  }
  
  export enum SortField {
    PRICE = 'price',
    RATING = 'rating',
    TITLE = 'title',
  }