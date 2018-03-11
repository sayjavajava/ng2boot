import { MessageService } from '../services/message.service';
import { Subscription } from 'rxjs/Subscription';

import { Category } from './Category';
import { ProductService } from '../services/product.service';
import { AbstractControl, ValidationErrors } from "@angular/forms";
import { OnInit, OnDestroy } from '@angular/core';
import { Sku } from './sku';

export class FormValidator implements OnInit ,OnDestroy{
    ngOnDestroy(): void {
       this.subscription.unsubscribe();
    }

    static items: Sku[] = [];
     skutemp :any =[];
     subscription : Subscription; 
    ngOnInit(): void {
    
        console.log('i am called');   
     }

      constructor(private productservice : ProductService,private mservice:MessageService){ 
      //  FormValidator.items= productservice.doctors;
      this.subscription = this.mservice.skudata.subscribe(msg=>{FormValidator.items=msg;console.log(msg)});   
      console.log('yes'+ FormValidator.items.length); 
    }
   
// calldata():void{
//         FormValidator.items= this.skutemp.slice();
// console.info('infooo'+this.skutemp.length);
// }
   static SkuExists( control :AbstractControl): Promise<ValidationErrors | null>{
   
   let test = FormValidator.items.filter(u => u.sku === control.value).map(x=>x.sku !=null);
   //  return users.length > 0 ? users[0] : null;
  console.log('result:'+ test.length);

   return new Promise((resolve,reject)=>{
    
    setTimeout(()=>{
   
           if(test.length ==1)
          
                  resolve({SkuExists :true});
            
            else
                resolve(null)           
            
            },2000)
        });

   }

}