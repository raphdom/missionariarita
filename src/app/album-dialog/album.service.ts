import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers, Response} from "@angular/http";
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

  public addAlbum(album:Object):Observable<any>{
    let bodyString = JSON.stringify(album); // Stringify payload
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.post(this.url, album, options)
      .map((res:Response) => res.json());
  }

  public deleteAlbum(id:string):Observable<any>{
    return this.http.delete(this.url,new RequestOptions({
      body: {id:id}
    }))
      .map(res => res.json());
  }

  public admin(pass:string):Observable<any>{
    return this.http.get(environment.server+"admin?pass="+pass)
      .map(res => res.json());
  }

}
