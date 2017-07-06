import {Component, Inject, OnInit} from '@angular/core';
import {FileUploader} from "ng2-file-upload";
import {AlbumService} from "../album.service";
import {MD_DIALOG_DATA, MdDialog, MdDialogRef} from "@angular/material";

@Component({
  selector: 'app-album-dialog-add',
  templateUrl: './album-dialog-add.component.html',
  styleUrls: ['./album-dialog-add.component.css']
})
export class AlbumDialogAddComponent implements OnInit {

  public uploader:FileUploader = new FileUploader({url: 'http://localhost:3000/album/file'});

  public album:any = new Object();
  public files:Array<any> = [];

  constructor(public dialogRef: MdDialogRef<AlbumDialogAddComponent>,
              private albumService:AlbumService,
              @Inject(MD_DIALOG_DATA) private data: any){

    this.uploader.onAfterAddingFile = (item) =>{
      this.files.push(item.file);
    };

    if(data) {
      this.album = data;
      this.files = data.images;
    }

  }

  ngOnInit() {
    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    }
  }

  save(){
    this.albumService.addAlbum(this.album).subscribe(result=>{
      this.uploader.setOptions({additionalParameter: { album: result._id }});
      this.uploader.uploadAll();
      this.dialogRef.close(true);
    });
  }

}
