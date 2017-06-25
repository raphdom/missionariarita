/**
 * Created by user on 18/06/2017.
 */
import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./route";
import * as multer from 'multer';


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

    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'uploads/')
      },
      filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
      }
    });
    const upload = multer({ storage: storage });

    router.route('/album')
      .options(function (req, res, next: NextFunction) {
        res.send("ok");
        return next();
      })
      .get(function (req, res, next: NextFunction) {
        new AlbumRoute().listAlbuns(req, res, next);
      })
      .post(upload.any(),function (req, res, next: NextFunction) {
        new AlbumRoute().updateAlbum(req, res, next);
      })
      .put(function (req, res, next: NextFunction) {
        new AlbumRoute().addAlbum(req, res, next);
      })
      .delete(function (req, res, next: NextFunction) {
        new AlbumRoute().deleteAlbum(req, res, next);
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

  public listAlbuns(req: Request, res: Response, next: NextFunction) {
    res.send({message:"ok"});
    return next();
  }

  public addAlbum(req: Request, res: Response, next: NextFunction) {
    return next();
  }

  public updateAlbum(req: Request, res: Response, next: NextFunction) {
    return next();
  }

  public deleteAlbum(req: Request, res: Response, next: NextFunction) {
    res.send({message:"ok"});
    return next();
  }
}
