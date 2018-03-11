import { MatDialog } from '@angular/material/dialog';
import { ConfirmationdialogComponent } from '../components/confirmationdialog/confirmationdialog.component';
import { MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class ConfirmDialogService {

  constructor(private matdialog:MatDialog) { }
 confirm(title:string,message:string):Observable<boolean>{
 
   let dialogref:MatDialogRef<ConfirmationdialogComponent>;

   dialogref=this.matdialog.open(ConfirmationdialogComponent,{height:"230px",width:"320px",panelClass: 'myapp-no-padding-dialog'});
   dialogref.componentInstance.title=title;
   dialogref.componentInstance.message=message;
   
   return dialogref.afterClosed();
}


}
