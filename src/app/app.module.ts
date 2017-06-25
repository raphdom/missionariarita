import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';

import { AppComponent } from './app.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import { AlbumDialogComponent } from './album-dialog/album-dialog.component';
import {MdButtonModule, MdDialogModule} from "@angular/material";
import { AlbumDialogAddComponent } from './album-dialog/album-dialog-add/album-dialog-add.component';
import {AlbumService} from "./album-dialog/album.service";
import {HttpModule} from "@angular/http";
import {FileUploadModule} from "ng2-file-upload";

@NgModule({
  declarations: [
    AppComponent,
    AlbumDialogComponent,
    AlbumDialogAddComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MdButtonModule,
    MdDialogModule,
    FileUploadModule
  ],
  providers: [AlbumService],
  bootstrap: [AppComponent],
  entryComponents: [
    AlbumDialogComponent,
    AlbumDialogAddComponent
  ]
})
export class AppModule { }
