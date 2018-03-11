import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../services/message.service';
import { UserService } from '../services/user.service';
import { Category } from './Category';
import { ProductService } from '../services/product.service';
import { AbstractControl, ValidationErrors } from "@angular/forms";
import { OnInit, OnDestroy } from '@angular/core';
import { UserName } from './UserName';


export class UsernameValidator implements OnDestroy  {
  ngOnDestroy(): void {
   this.subscription.unsubscribe();
  }
  static items: UserName[] = [];
  skutemp :any =[];
  subscription  : Subscription

constructor(private userservice : UserService,private mservice:MessageService){ 
        

      this.subscription = this.mservice.packagedata.subscribe(msg=>{UsernameValidator.items=msg;console.log(msg)});          
    
         }
  
   static userExists( control :AbstractControl): Promise<ValidationErrors | null>{
//    console.log('yup'+UsernameValidator.items.length);  
    

   let test = UsernameValidator.items.filter(u => u.username === control.value).map(x=>x.username !=null);
   //  return users.length > 0 ? users[0] : null;
  console.log('result:'+ test.length);

   return new Promise((resolve,reject)=>{     
    
    setTimeout(()=>{
   
           if(test.length ==1){

                  resolve({userExists :true});
           }
            else{
                resolve(null)           
                }
            },2000)
        });

   }

}

