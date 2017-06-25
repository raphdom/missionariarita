import {AfterViewInit, Component} from '@angular/core';
import {MdDialog} from "@angular/material";
import {AlbumDialogComponent} from "./album-dialog/album-dialog.component";
declare var CBPGridGallery: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{

  constructor(public dialog: MdDialog){}


  ngAfterViewInit() {
    new CBPGridGallery( document.getElementById( 'grid-gallery' ) );
  }

  onClickManageAlbuns(){
    this.dialog.open(AlbumDialogComponent);
  }

}
