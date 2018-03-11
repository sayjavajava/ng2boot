
import { UserService } from '../../../shared/services/user.service';
import { LoginComponent } from '../login/login.component';
import { Observable } from 'rxjs/Observable';
import { Authority } from '../../../shared/common/Authority';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MessageService } from '../../../shared/services/message.service';
import 'rxjs/add/operator/take'; 
import { MatDialogRef } from '@angular/material';
import { WelcomeUser } from '../../../shared/common/WelcomeUser';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';



@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
 
     
        hide:true;
        message:string;
        rForm :FormGroup;
        name:String;
        description :String;
        titlealert:'you must provide name between 4 and 20 char';
        saveSuccess :  boolean ;
        model: any = {};
        value:any[]=[];
        testadmin:boolean;
       // loading = false;
       error = '';
        currentuser$ :Observable<WelcomeUser[]>;

        username:string;
        password:string;
        invalid:boolean=false;
        constructor(
        private fb : FormBuilder,  
        private authenticationService : AuthenticationService,
        private dialogRef:MatDialogRef<SigninComponent>,
        private userservice:UserService,
        private router ?: Router,
        private route ?:ActivatedRoute,
        private messageservice ?:MessageService
        
    //      private heroservice?:HeroService 
        ) { 
          this.currentuser$ = this.userservice.currentUser();

          this.rForm =fb.group({
                'name': [null,Validators.required],
                'password':[null,Validators.required]
            })
            
          }
          email = new FormControl('', [Validators.required, Validators.email]);
          
            getErrorMessage() {
              return this.email.hasError('required') ? 'You must enter a value' :
                  this.email.hasError('email') ? 'Not a valid email':
                      '';
            }

          ngOnInit() {

      }

    
    logout(){
      this.authenticationService.logout();
      this.value.splice(0,2);
      console.log("i am clled in logout");
      this.closeDialog();
         }
    login(post) {
         // this.loading = true;
         this.username=post.name;
         this.password=post.password;
         if(this.invalid){ this.invalid=false;}
       
         console.log("calledddd"+this.password+this.username);
         this.authenticationService.login(this.username,this.password)
             .subscribe(result => {
                 if (result === true) {
                      //  login successful
                     let returnurl =this.route.snapshot.queryParamMap.get('returnUrl');
                     this.closeDialog();       
                     this.router.navigate([returnurl || 'home'] );}
            //        else {
            //           // login failed
            //           this.error = 'Username or password is incorrect';
            //  //         this.loading = false;
            //       }
              },error => {
         //       this.loading = false;
                this.error = error;
              //console.log('uanthorizedd'+ error.json());
                this.invalid=true;  
            });
      }
    
    isAuthenticated():boolean{
      return this.authenticationService.isLoggedIn();
    }
  
   isAdmin(){
      return this.authenticationService.isAdmin().subscribe(res=>this.testadmin=res);
    //    console.log(res),error =>console.log(error));
       }
    newMessage(close:boolean) {
      this.messageservice.changeMessage(close)
        }
    closeDialog(){
      this.dialogRef.close();
        }
      
        
    }