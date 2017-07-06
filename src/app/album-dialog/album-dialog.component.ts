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

  public albuns:any;

  constructor(public dialog: MdDialog, private albumService:AlbumService){}

  ngOnInit() {
    this.getListOfAlbuns();
  }

  onAdd(){
    let dialogRef = this.dialog.open(AlbumDialogAddComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.albumService.admin(result).subscribe(result=>{
        this.getListOfAlbuns();
      });
    });
  }

  getListOfAlbuns(){
    this.albumService.listAlbuns().subscribe(result=>{
      this.albuns = result;
    });
  }

  onDelete(item){
    this.albumService.deleteAlbum(item._id).subscribe(result=>{
      this.getListOfAlbuns();
    });
  }

  onEdit(item){
    let dialogRef = this.dialog.open(AlbumDialogAddComponent,{data:item});
    dialogRef.afterClosed().subscribe(result => {
      this.albumService.admin(result).subscribe(result=>{
        this.getListOfAlbuns();
      });
    });
  }

}
