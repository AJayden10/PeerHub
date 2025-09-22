
export type View = 'browse' | 'sell' | 'profile';

export enum Condition {
  NEW = "New (with tags)",
  LIKE_NEW = "Like New",
  GOOD = "Good",
  FAIR = "Fair",
  POOR = "Poor"
}

export enum Category {
  ELECTRONICS = "Electronics",
  FASHION = "Fashion",
  HOME_GOODS = "Home Goods",
  FURNITURE = "Furniture",
  COLLECTIBLES = "Collectibles & Art",
  SPORTING_GOODS = "Sporting Goods",
  TOYS_GAMES = "Toys & Games",
  OTHER = "Other"
}

export interface Product {
  id: number;
  name: string;
  price: number;
  condition: Condition;
  category: Category;
  imageUrl: string;
  seller: string;
}

export interface PriceSuggestion {
  suggestedPrice: number;
  lowPrice: number;
  highPrice: number;
  reasoning: string;
}
