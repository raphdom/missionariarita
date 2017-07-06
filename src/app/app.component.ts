import {AfterViewInit, Component} from '@angular/core';
import {MdDialog} from "@angular/material";
import {AlbumDialogComponent} from "./album-dialog/album-dialog.component";
import {AlbumService} from "./album-dialog/album.service";
import {AdminDialogComponent} from "./admin-dialog/admin-dialog.component";
declare var CBPGridGallery: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{

  public albuns:Array<any>;

  public admin:boolean = false;

  constructor(public dialog: MdDialog, public albumService:AlbumService){}

  ngAfterViewInit() {
    this.albumService.listAlbuns().subscribe(albuns=>{
      this.albuns = albuns;
      new CBPGridGallery( document.getElementById( 'grid-gallery' ) );
    });
  }

  onClickManageAlbuns(){
    this.dialog.open(AlbumDialogComponent);
  }

  onClickAdmin(){
    let dialogRef = this.dialog.open(AdminDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.albumService.admin(result).subscribe(result=>{
        this.admin=result;
      });
    });
  }

  getSafeUrl(album){
    return "http://localhost:3000/album/file?file="+album.images[0].thumbs[0].id;
  }

}
