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
import {IModel} from "./models/model";
import {IAlbumModel} from "./models/album";
import {albumSchema} from "./schemas/album";

/**
 * The server.
 *
 * @class Server
 */
export class Server {

  public app: express.Application;

  private model: IModel; //an instance of IModel

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

    this.model = new Object(); //initialize this to an empty object
    //create expressjs application
    this.app = express();

    //configure application
    this.config();

    //add routes
    this.routes();

    //add api
    this.api();
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

    let connection: mongoose.Connection = mongoose.createConnection(MONGODB_CONNECTION);

    //create models
    this.model.album = connection.model<IAlbumModel>("albuns", albumSchema);

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

    //use router middleware
    this.app.use(router);
  }
}
