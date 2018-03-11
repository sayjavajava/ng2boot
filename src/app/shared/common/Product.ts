export class Product{
    InStock:boolean;
    quantity:number;
    id:number;
    price:number;
    name:string
    selectedCategory:string;
    imageUrl:string;
    cartQuantity:number;

constructor(id:number,name:string,InStock:boolean,imageUrl:string,quantity:number,price:number,selectedCategory:string){
     this.name=name;
     this.id=id;
     this.imageUrl=imageUrl;
     this.InStock=InStock;
     this.quantity=quantity;
     this.price=price;
     this.selectedCategory=selectedCategory;
}
}
    