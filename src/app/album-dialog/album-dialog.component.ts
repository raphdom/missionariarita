import { Component, OnInit } from '@angular/core';
import {MdDialog} from "@angular/material";
import {AlbumDialogAddComponent} from "./album-dialog-add/album-dialog-add.component";
import {AlbumService} from "./album.service";

@Component({
  selector: 'app-album-dialog',
  templateUrl: './album-dialog.component.html',
  styleUrls: ['./album-dialog.component.css']
})
export class AlbumDialogComponent implements OnInit {

  constructor(public dialog: MdDialog, private albumService:AlbumService){}

  ngOnInit() {
    this.albumService.listAlbuns().subscribe(result=>{
      console.log(result);
    });
  }

  onAdd(){
    this.dialog.open(AlbumDialogAddComponent);
  }

}
