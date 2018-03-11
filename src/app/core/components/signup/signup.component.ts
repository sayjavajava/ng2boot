import { UserName } from '../../../shared/common/UserName';

import { HttpResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { UserUtil } from '../../../shared/common/UserUtil';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from '../../../shared/services/index';
import { UsernameValidator } from '../../../shared/common/UsernameValidator';


@Component({
  moduleId: module.id,
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit , OnDestroy{

  message: any;
  subscription: Subscription;
  responseStatus: number;

  id: number;
  rForm: FormGroup;
  hide= true;
  value= [];
  private sub: any;
  user: UserUtil;
  username: UserName[];

  constructor(private fb: FormBuilder, private userservice: UserService,
    private router: Router, private route: ActivatedRoute, private messageservice: MessageService, private mattsnackbar: MatSnackBar) {
     //    this.subscription=this.messageservice.getMessage2().subscribe;
    }
  ngOnInit() {
    this.messageservice.loadAllPackages();
    const obj = new UsernameValidator(this.userservice, this.messageservice);
    this.subscription = this.messageservice.currentMessage.subscribe(message => {this.message = message; console.log(message); });

    console.log('receving' + this.message);
    this.rForm = this.fb.group({
      'password': [null, Validators.compose([Validators.required, Validators.maxLength(15), Validators.minLength(4)])],
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'firstname': [null, Validators.required],
      'lastname': [null, Validators.required],
      'username': new FormControl('', Validators.required, UsernameValidator.userExists),
      'enabled': [null],
     });

      this.sub = this.route.params.subscribe(params => {
        this.id = params['id'];
      });

     if (this.id) { //edit form
        this.userservice.findById(this.id).subscribe(
          user => {
              this.id = user[0].id;
              this.rForm.patchValue({
              username: user[0].username,
              email: user[0].email,
              auth: user[0].auth,
              enabled: user[0].enabled
            });
           }, error => {
            console.log(error);
           }
        );

      }

    }

    AddUser(post){
      if (this.rForm.valid){

      this.userservice.create(this.rForm.value)
      .subscribe(
        res => {

            this.responseStatus = res.status;
            console.log(res._body);
            if (this.responseStatus == 200)
            this.router.navigate(['/login']);
            this.openSnackBar('User', res._body);
          },
        err => {
            console.log(err.status); //401
            console.log(err.error.error); //undefined
            console.log(JSON.parse(err.error).error); //unauthorized
            this.responseStatus = err.status;
        });
      }
      else{alert('Please validate your form'); }
    }

      //   .subscribe(data=>{console.log(data)
    //     if(data){
    //       this.router.navigate(['/login']);
    //       this.openSnackBar("user registered","succcessfully");}});
    //   }
    //   else
    //    alert('please check your form data' );

    // }

    openSnackBar(message: string, action: string) {
      this.mattsnackbar.open(message, action, {
        duration: 2000,
      });
    }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
       }

      newMessage() {
      //  this.messageservice.changeMessage("Hello from Sibling")
      }

  }

