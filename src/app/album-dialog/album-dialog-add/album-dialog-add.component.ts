import { Component, OnInit } from '@angular/core';
import {FileUploader} from "ng2-file-upload";

@Component({
  selector: 'app-album-dialog-add',
  templateUrl: './album-dialog-add.component.html',
  styleUrls: ['./album-dialog-add.component.css']
})
export class AlbumDialogAddComponent implements OnInit {

  public uploader:FileUploader = new FileUploader({url: 'http://localhost:3000/album/'});

  constructor() { }

  ngOnInit() {
    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    }
  }

  save(){
    this.uploader.uploadAll();
  }

}
