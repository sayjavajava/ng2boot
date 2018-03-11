
import { inject } from '@angular/core/testing';
import { UserUtil } from '../../../shared/common/UserUtil';
import { UserService } from '../../../shared/services/user.service';
import { RouterModule, Routes, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.css']
})
export class UpdateRoleComponent implements OnInit {
  
rForm:FormGroup;
private sub:any;
id : number;
user :UserUtil;

changerole=[
{id:1,name:'ROLE_USER' },
{id:2,name:'ROLE_ADMIN'}
];

constructor( @Inject(MAT_DIALOG_DATA) data:any, private fb:FormBuilder,private router:Router,private route:ActivatedRoute,
  private userservices:UserService,private matsnack:MatSnackBar) {
     this.id=data;
    console.log('data:' + data);
 }
ngOnInit() {
    
    this.rForm =this.fb.group({  
      'username': [null,Validators.compose([Validators.required,Validators.maxLength(15),Validators.minLength(4)])],
      'email':[null,Validators.compose([Validators.required,Validators.email])],
      'changerole':[null,Validators.required],
      'enabled':[null],
          // 'imageUrl':[null,Validators.required],
      })

      // this.sub = this.route.params.subscribe(params => {
      //   this.id = params['id'];
      // });

      if (this.id) { //edit form
        this.userservices.findById(this.id).subscribe(
          user => {
              this.id = user[0].id;
              this.rForm.patchValue({
              username: user[0].username,
              email: user[0].email,
            //  changerole:user[0].auth,          
              enabled: user[0].enabled
            });
           },error => {
            console.log(error);
           }
        );
   
      }
  }
  UpdateUser(post){
  if(this.rForm.valid){
    let user: UserUtil = new UserUtil(this.id,post.username,post.email,post.enabled,post.changerole);
  this.userservices.updateUser(user,this.id).subscribe(data=>console.log(data));  
this.openSnackBar('Updated','Successfully');
this.router.navigate(['/home']);
          }

}

openSnackBar(message: string, action: string) {
  this.matsnack.open(message, action, {
    duration: 2000,
  });
}

}
