import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from "@angular/material";

@Component({
  selector: 'app-admin-dialog',
  templateUrl: './admin-dialog.component.html',
  styleUrls: ['./admin-dialog.component.css']
})
export class AdminDialogComponent implements OnInit {

  public pass:string;

  constructor(public dialogRef: MdDialogRef<AdminDialogComponent>) {}


  ngOnInit() {
  }

  onClose(){
    this.dialogRef.close(this.pass);
  }

}
