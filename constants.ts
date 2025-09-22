
import { Category, Condition, Product } from './types';

export const CATEGORIES: Category[] = Object.values(Category);
export const CONDITIONS: Condition[] = Object.values(Condition);

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Vintage Leather Jacket',
    price: 125.00,
    condition: Condition.GOOD,
    category: Category.FASHION,
    imageUrl: 'https://picsum.photos/seed/jacket/400/400',
    seller: 'JaneDoe'
  },
  {
    id: 2,
    name: 'Wireless Noise-Cancelling Headphones',
    price: 180.00,
    condition: Condition.LIKE_NEW,
    category: Category.ELECTRONICS,
    imageUrl: 'https://picsum.photos/seed/headphones/400/400',
    seller: 'JohnSmith'
  },
  {
    id: 3,
    name: 'Mid-Century Modern Armchair',
    price: 350.00,
    condition: Condition.GOOD,
    category: Category.FURNITURE,
    imageUrl: 'https://picsum.photos/seed/armchair/400/400',
    seller: 'ArtisanHome'
  },
  {
    id: 4,
    name: 'Professional Tennis Racket',
    price: 75.00,
    condition: Condition.FAIR,
    category: Category.SPORTING_GOODS,
    imageUrl: 'https://picsum.photos/seed/racket/400/400',
    seller: 'SportsFan'
  },
  {
    id: 5,
    name: 'Limited Edition Action Figure',
    price: 95.00,
    condition: Condition.NEW,
    category: Category.COLLECTIBLES,
    imageUrl: 'https://picsum.photos/seed/figure/400/400',
    seller: 'CollectorX'
  },
  {
    id: 6,
    name: 'Smart Coffee Maker',
    price: 60.00,
    condition: Condition.LIKE_NEW,
    category: Category.HOME_GOODS,
    imageUrl: 'https://picsum.photos/seed/coffee/400/400',
    seller: 'TechHome'
  },
  {
    id: 7,
    name: 'Designer Sunglasses',
    price: 210.00,
    condition: Condition.GOOD,
    category: Category.FASHION,
    imageUrl: 'https://picsum.photos/seed/glasses/400/400',
    seller: 'Fashionista'
  },
  {
    id: 8,
    name: 'Vintage Board Game Collection',
    price: 45.00,
    condition: Condition.FAIR,
    category: Category.TOYS_GAMES,
    imageUrl: 'https://picsum.photos/seed/games/400/400',
    seller: 'RetroGamer'
  },
   {
    id: 9,
    name: 'Ergonomic Office Chair',
    price: 220.00,
    condition: Condition.LIKE_NEW,
    category: Category.FURNITURE,
    imageUrl: 'https://picsum.photos/seed/officechair/400/400',
    seller: 'WorkFromHomePro'
  },
  {
    id: 10,
    name: 'Portable Bluetooth Speaker',
    price: 55.00,
    condition: Condition.GOOD,
    category: Category.ELECTRONICS,
    imageUrl: 'https://picsum.photos/seed/speaker/400/400',
    seller: 'MusicLover'
  },
  {
    id: 11,
    name: 'Antique Silver Locket',
    price: 150.00,
    condition: Condition.GOOD,
    category: Category.COLLECTIBLES,
    imageUrl: 'https://picsum.photos/seed/locket/400/400',
    seller: 'HistoryBuff'
  },
  {
    id: 12,
    name: 'Complete Camping Tent Set',
    price: 190.00,
    condition: Condition.LIKE_NEW,
    category: Category.SPORTING_GOODS,
    imageUrl: 'https://picsum.photos/seed/tent/400/400',
    seller: 'OutdoorExplorer'
  }
];
