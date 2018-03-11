import { ProductUtil } from './ProductUtil';
export class Order{

    username:string;
    price: number;
    itemprice:number;
    cartquantity:number;
    cartprice:number;
    
    city:string;
    phonenumber:number;
    address:string;
    orderNumber:number;

    totalprice:number;
    productcart:any =[];
constructor(username:string,totalprice:number,cartquantity:number,cartprice:number,city:string,phonenumber:number,address:string,productcart:ProductUtil[]){
    this.username =username;
    this.cartquantity=cartquantity;
    this.cartprice=cartprice;
    this.city=city;
    this.phonenumber=phonenumber;
    this.address=address;
    this.totalprice=totalprice;
    this.productcart=productcart;
}

}