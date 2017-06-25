import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {environment} from "../../environments/environment";

@Injectable()
export class AlbumService {

  public url:string = environment.server + "album";

  constructor(private http:Http) { }

  public listAlbuns():Observable<any>{
    return this.http.get(this.url)
      .map(res => res.json());
  }

}
