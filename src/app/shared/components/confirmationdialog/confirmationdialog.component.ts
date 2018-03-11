import { MatDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'confirmationdialog',
  templateUrl: './confirmationdialog.component.html',
  styleUrls: ['./confirmationdialog.component.css']
})
export class ConfirmationdialogComponent implements OnInit {
  public confirmMessage:string;
  constructor(public dialogRef: MatDialogRef<ConfirmationdialogComponent>) { }

  public title: string;
  public message: string;
  ngOnInit() {
  
  }

}
