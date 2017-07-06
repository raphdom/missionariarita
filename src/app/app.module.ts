import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';

import { AppComponent } from './app.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import { AlbumDialogComponent } from './album-dialog/album-dialog.component';
import {MdButtonModule, MdDialogModule, MdIconModule, MdInputModule, MdListModule} from "@angular/material";
import { AlbumDialogAddComponent } from './album-dialog/album-dialog-add/album-dialog-add.component';
import {AlbumService} from "./album-dialog/album.service";
import {HttpModule} from "@angular/http";
import {FileUploadModule} from "ng2-file-upload";
import {FormsModule} from "@angular/forms";
import { AdminDialogComponent } from './admin-dialog/admin-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    AlbumDialogComponent,
    AlbumDialogAddComponent,
    AdminDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MdButtonModule,
    MdDialogModule,
    FileUploadModule,
    MdInputModule,
    MdListModule,
    MdIconModule
  ],
  providers: [AlbumService],
  bootstrap: [AppComponent],
  entryComponents: [
    AlbumDialogComponent,
    AlbumDialogAddComponent,
    AdminDialogComponent
  ]
})
export class AppModule { }
