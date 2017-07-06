/**
 * Created by user on 18/06/2017.
 */
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";
import mongoose = require("mongoose"); //import mongoose
import errorHandler = require("errorhandler");
import methodOverride = require("method-override");
import {IndexRoute} from "./routes/index";
import {AlbumRoute} from "./routes/album";
import * as multer from 'multer';
import * as cors from 'cors';
import {GoogleDriveUtils} from "./utils/googledrive";

/**
 * The server.
 *
 * @class Server
 */
export class Server {

  public app: express.Application;

  /**
   * Bootstrap the application.
   *
   * @class Server
   * @method bootstrap
   * @static
   * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
   */
  public static bootstrap(): Server {
    return new Server();
  }

  /**
   * Constructor.
   *
   * @class Server
   * @constructor
   */
  constructor() {

    //create expressjs application
    this.app = express();

    //configure application
    this.config();

    this.configFileUpload();

    //add routes
    this.routes();

    //add api
    this.api();

    /*new GoogleDriveUtils().upload((err, result, response)=>{
      console.log("finished");
    });*/
    //new GoogleDriveUtils().download("0B8m4JW1vqcc_ZDlxNXEwZmt5MFE",null);
    //new GoogleDriveUtils().run();
  }

  /**
   * Create REST API routes
   *
   * @class Server
   * @method api
   */
  public api() {
    //empty for now
  }

  /**
   * Configure application
   *
   * @class Server
   * @method config
   */
  public config() {

    const MONGODB_CONNECTION: string = "mongodb://localhost:27017/missionariarita";

    //empty for now
    this.app.use(express.static(path.join(__dirname, "public")));

    this.app.use(cors());

    //configure pug
    if (this.app.get('env') === 'production') {
      // in production mode run application from dist folder
      this.app.use(express.static(path.join(__dirname, '/../client')));
    }

    //use logger middlware
    this.app.use(logger("dev"));

    //use json form parser middlware
    this.app.use(bodyParser.json());

    //use query string parser middlware
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));

    //use cookie parker middleware middlware
    this.app.use(cookieParser());

    //use override middlware
    this.app.use(methodOverride());

    global.Promise = require("q").Promise;
    mongoose.Promise = global.Promise;

    mongoose.connect(MONGODB_CONNECTION);

    //catch 404 and forward to error handler
    this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
      err.status = 404;
      next(err);
    });

    //error handling
    this.app.use(errorHandler());
  }

  /**
   * Create router
   *
   * @class Server
   * @method api
   */
  public routes() {
    //empty for now
    let router: express.Router;
    router = express.Router();

    //IndexRoute
    IndexRoute.create(router);
    AlbumRoute.create(router);

    //use router middleware
    this.app.use(router);
  }

  public configFileUpload(){
    /*this.app.use(multer({
      dest: DIR,
      rename: function (fieldname, filename) {
        return filename + Date.now();
      },
      onFileUploadStart: function (file) {
        console.log(file.originalname + ' is starting ...');
      },
      onFileUploadComplete: function (file) {
        console.log(file.fieldname + ' uploaded to  ' + file.path);
      }
    }));*/
  }

}
