/**
 * Created by user on 18/06/2017.
 */
import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./route";
import * as multer from 'multer';
import {AlbumController} from "../album";
import {AlbumCollection} from "../models/album";
import {GoogleDriveUtils} from "../utils/googledrive";
import * as fs from "fs";
import * as path from "path";
const thumb = require('node-thumbnail').thumb;


/**
 * / route
 *
 * @class AlbumRoute
 */
export class AlbumRoute extends BaseRoute {

  /**
   * Create the routes.
   *
   * @class IndexRoute
   * @method create
   * @static
   */
  public static create(router: Router) {
    //log
    console.log("[AlbumRoute::create] Creating album route.");

    const storage = new multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'uploads/')
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname)
      }
    });
    const upload = multer({ storage: storage });

    router.post("/album/file",upload.any(),function (req:any, res, next: NextFunction) {
      AlbumController.getAlbum(req.body.album).then(album=>{
        let filename = req.files[0].originalname;
        let pathFile = path.join("uploads",filename);
        thumb({
          source: pathFile, // could be a filename: dest/path/image.jpg
          destination: "uploads",
          concurrency: 4,
          width: 700
        }, function(files, err, stdout, stderr) {
          let pathThumb = files[0].dstPath;
          let thumbFilename = files[0].dstPath.replace("uploads/","");
          new GoogleDriveUtils().upload(pathFile,filename,(err, result, response)=>{
            new GoogleDriveUtils().upload(pathThumb,thumbFilename,(err, resultThumb, response)=>{
              result.thumbs=[];
              result.thumbs.push(resultThumb);
              album.images.push(result);
              fs.unlinkSync(pathFile);
              fs.unlinkSync(pathThumb);
              AlbumController.updateAlbum(album).then(album=>{
                return next();
              });
            });
          });
        });
      });
    });

    router.route('/album')
      .options(function (req, res, next: NextFunction) {
        res.send("ok");
        return next();
      })
      .get(function (req, res, next: NextFunction) {
        AlbumController.getAlbuns().then(albuns=>{
          res.json(albuns);
          return next();
        });
      })
      .post(function (req, res, next: NextFunction) {
        AlbumController.addAlbum(req.body.title,req.body.subtitle,req.body.description).then(album=>{
          res.json(album);
          return next();
        });
      })
      .put(function (req, res, next: NextFunction) {
        return next();
      });

      router.delete('/album',function (req, res, next: NextFunction) {
        AlbumController.removeAlbum(req.body.id).then(result=>{
          res.send(result);
          return next();
        })
      })


    router.get("/album/file",function (req:any, res) {
      new GoogleDriveUtils().download(req.query.file,(arg2)=>{
        arg2.pipe(res);
        //res.end(arg2._writableState.getBuffer());
        //return next();
      });
    });
  }

  /**
   * Constructor
   *
   * @class IndexRoute
   * @constructor
   */
  constructor() {
    super();
  }

}
