import {Writable} from "stream";
import * as Stream from "stream";
var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/drive-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/drive'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
  process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'drive-nodejs-quickstart.json';

/**
 * The util class to google drive api.
 *
 * @class GoogleDriveUtils
 */
export class GoogleDriveUtils {

  constructor(){}

  public run2(){
    const readline = require('readline');

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.on('line', (input) => {
      console.log(`Received: ${input}`);
    });


  }

  public run(){
    fs.readFile('./server/client_secret.json',(err, content) =>{
      if (err) {
        console.log('Error loading client secret file: ' + err);
        return;
      }
      // Authorize a client with the loaded credentials, then call the
      // Drive API.
      this.authorize(JSON.parse(content), this.listFiles);
    });
  }

  /**
   * Create an OAuth2 client with the given credentials, and then execute the
   * given callback function.
   *
   * @param {Object} credentials The authorization client credentials.
   * @param {function} callback The callback to call with the authorized client.
   */
  public authorize(credentials, callback) {
    var clientSecret = credentials.installed.client_secret;
    var clientId = credentials.installed.client_id;
    var redirectUrl = credentials.installed.redirect_uris[0];
    var auth = new googleAuth();
    var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) {
        this.getNewToken(oauth2Client, callback);
      } else {
        oauth2Client.credentials = JSON.parse(token);
        callback(oauth2Client);
      }
    });
  }

  /**
   * Get and store new token after prompting for user authorization, and then
   * execute the given callback with the authorized OAuth2 client.
   *
   * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
   * @param {getEventsCallback} callback The callback to call with the authorized
   *     client.
   */
  public getNewToken(oauth2Client, callback) {
    var authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES
    });
    console.log('Authorize this app by visiting this url: ', authUrl);
    var rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question('Enter the code from that page here: ', (code) =>{
      rl.close();
      oauth2Client.getToken(code, (err, token) =>{
        if (err) {
          console.log('Error while trying to retrieve access token', err);
          return;
        }
        oauth2Client.credentials = token;
        this.storeToken(token);
        callback(oauth2Client);
      });
    });
  }

  /**
   * Store token to disk be used in later program executions.
   *
   * @param {Object} token The token to store to disk.
   */
  public storeToken(token) {
    try {
      fs.mkdirSync(TOKEN_DIR);
    } catch (err) {
      if (err.code != 'EEXIST') {
        throw err;
      }
    }
    fs.writeFile(TOKEN_PATH, JSON.stringify(token));
    console.log('Token stored to ' + TOKEN_PATH);
  }

  /**
   * Lists the names and IDs of up to 10 files.
   *
   * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
   */
  public listFiles(auth) {
    var service = google.drive('v3');
    service.files.list({
      auth: auth,
      pageSize: 10,
      fields: "nextPageToken, files(id, name)"
    }, function (err, response) {
      if (err) {
        console.log('The API returned an error: ' + err);
        return;
      }
      var files = response.files;
      if (files.length == 0) {
        console.log('No files found.');
      } else {
        console.log('Files:');
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          console.log('%s (%s)', file.name, file.id);
        }
      }
    });
  }

  public upload(filepath:string, filename:string, callback){
    fs.readFile('./server/client_secret.json',(err, content) =>{
      if (err) {
        console.log('Error loading client secret file: ' + err);
        return;
      }
      this.authorize(JSON.parse(content),(auth)=>{
        var fs = require('fs');
        var drive = google.drive({ version: 'v3', auth: auth });

        drive.files.create({
          resource: {
            name: filename
            //mimeType: 'image/png'
          },
          media: {
            //mimeType: 'image/png',
            body: fs.createReadStream(filepath) // read streams are awesome!
          }
        }, callback);
      });
    });

  }

  public remove(fileId,callback){
    fs.readFile('./server/client_secret.json',(err, content) => {
      if (err) {
        console.log('Error loading client secret file: ' + err);
        return;
      }
      this.authorize(JSON.parse(content), (auth) => {
        var fs = require('fs');
        var drive = google.drive({version: 'v3', auth: auth});
        drive.files.delete({
          fileId: fileId
        }, function (err, metadata) {
          callback()
        });
      });
    });
  }

  public download(fileId,callback){
    fs.readFile('./server/client_secret.json',(err, content) =>{
      if (err) {
        console.log('Error loading client secret file: ' + err);
        return;
      }
      this.authorize(JSON.parse(content),(auth)=>{
        var fs = require('fs');
        var drive = google.drive({ version: 'v3', auth: auth });


        drive.files.get({
          fileId: fileId
        }, function (err, metadata) {
          if (err) {
            console.error(err);
            return process.exit();
          }

          console.log('Downloading %s...', metadata.name);

          let stream = drive.files.get({
            fileId: fileId,
            alt: 'media'
          }).on('response', function(res) {
            callback(res);

            //var fws = fs.createWriteStream(metadata.name);
            //const streams = require('memory-streams');
            //let writer = new streams.WritableStream();
            /*var writer = new Writable({
              write: function(data, enc, cb) {
                var ret = Stream.Writable.prototype.write.apply(this, arguments);
                if (!ret) this.emit('drain');
                //cb();
                this.emit('finish');
              }
            });
            // setup piping
            res.pipe(writer);
            //res.pipe(fws);
            //res.on('readable', function(arg1,arg2) {
              // Output the content as a string
              //console.log(writer.toString());
              // Output the content as a Buffer
              //console.log(writer.toBuffer());
              //writer.end();
              //callback(writer);
            //});
            res.on('close',()=>{
              console.log('close envet');
            });
            writer.on('finish', () => {
              //console.log('There will be no more data.');
              //writer.end();
              callback(writer);
            });
          });*/

          /*const streams = require('memory-streams');
          var dest = new streams.WritableStream();

          //var dest = fs.createWriteStream(metadata.name);

          drive.files.get({
            fileId: fileId,
            alt: 'media'
          })
            .on('error', function (err) {
              console.log('Error downloading file', err);
              process.exit();
            })
            .on('readable',function(){
              console.log('readable');
            })
            .pipe(dest);

          dest
            .on('finish', function () {
              console.log('Downloaded %s!', metadata.name);
              callback(dest);
              //process.exit();
            })
            .on('error', function (err) {
              console.log('Error writing file', err);
              //process.exit();
            });

          */
        });

      });
    });
  });
  }


}
