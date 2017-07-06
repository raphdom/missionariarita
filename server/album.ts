import {IAlbum} from "./interfaces/album";
import {AlbumCollection} from "./models/album";
import {GoogleDriveUtils} from "./utils/googledrive";
/**
 * Created by user on 29/06/2017.
 */
export class AlbumControllerClass{

  constructor(){}

  public getAlbuns():Promise<Array<IAlbum>>{
    return new Promise((resolve,reject)=>{
      AlbumCollection.find().then(albuns=>{
        resolve(albuns);
      })
    });
  }

  public getAlbum(id:string):Promise<IAlbum>{
    return new Promise((resolve,reject)=>{
      AlbumCollection.findOne({_id:id}).then(album=>{
        resolve(album);
      })
    });
  }

  public addAlbum(title:string, subtitle:string, description:string):Promise<IAlbum>{
    return new Promise((resolve,reject)=>{
      let newAlbum = new AlbumCollection({
        title:title,
        subtitle:subtitle,
        description:description
      });
      newAlbum.save().then(album=>{
        resolve(album);
      });
    });
  }

  public updateAlbum(album:IAlbum):Promise<IAlbum>{
    return new Promise((resolve,reject)=>{
      album.save().then(album=>{
        resolve(album);
      });
    });
  }

  public removeAlbum(id:string):Promise<boolean>{
    return new Promise((resolve,reject)=>{
      AlbumCollection.findByIdAndRemove(id).then(album=>{
        for(let image of album.images){
          for(let thumb of image.thumbs){
            new GoogleDriveUtils().remove(thumb.id,(meta)=>{
              console.log(meta);
            });
          }
          new GoogleDriveUtils().remove(image.id,(meta)=>{
            console.log(meta);
          });
        }
        resolve(true);
      });
    });
  }


}

export const AlbumController = new AlbumControllerClass();
