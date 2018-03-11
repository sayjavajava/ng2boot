import { Product } from './Product';
import { Category } from './Category';

export class ProductUtil{
    
    id:number;
    name:Product;
    price: number;
    instock: boolean;
    cartquantity:number;
    cartprice:number;
    description: string;
    image_url: string;
    sku: string;
    _links:object[];
    selectedCategory:string;
    category:string;
    quantity:number;

    }