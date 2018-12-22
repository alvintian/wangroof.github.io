const {Storage} = require("@google-cloud/storage");
const path = require('path');
const multer = require('multer');
const {memoryStorage} = require('multer');
const functions = require('firebase-functions');
const firebase = require('firebase-admin');
 const express = require('express');
const PORT        = process.env.PORT || 5000;
const morgan      = require('morgan');

 
// const bodyParser  = require("body-parser");
// const sass        = require("node-sass-middleware");


// // // Create and Deploy Your First Cloud Functions
// // // https://firebase.google.com/docs/functions/write-firebase-functions


// //const busboyMulter = require("./busboyMulter.js");
// // const firebaseApp=firebase.initializeApp(
// // 	functions.config().firebase);

// const app=express();
// //const usersRoutes = require("../indexRoute");
// const multerConf = {
// 		storage: multer.diskStorage({
// 			destination: function(req, file, next) {
// 				next(null,'./build/images');
// 			},
// 			filename: function(req, file, next) {
// 				const ext = file.mimetype.split('/')[1];
// 				next(null, file.fieldname + '-' + Date.now() + '.' + ext);
// 			},
// 		}),
// 		fileFilter: function(req, file, next) {
// 			if (!file) {
// 				next();
// 			}
// 			const image = file.mimetype.startsWith('image/');
// 			if (image) {
// 				next(null, true);
// 			} else {
// 				next(
// 					{
// 						message: 'File type not supported',
// 					},
// 					false
// 				);
// 			}
// 		},
// 	};

// app.use(morgan('dev'));

// app.set("view engine", "ejs");
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use("/styles", sass({
//   src: __dirname + "/styles",
//   dest: __dirname + "/build/styles",
//   debug: true,
//   outputStyle: 'expanded'
// }));
// app.use('/static',express.static('build'));

// app.get('/test',(request,response) => {
// //	response.send("sendddddd");
// response.send(JSON.stringify("__dirname"));
// });


// var    fs = require('fs');
// var    path = require('path');
//  var   busboy = require('connect-busboy');
 
// app.use(busboy());
 
// app.post('/Photos', function(req, res) {
//     var fstream;
//     var fName="";
//     req.pipe(req.busboy);
//     req.busboy.on('file', function (fieldname, file, filename) {
//         var filePath = path.join(__dirname, './images', Date.now() +'-'+ filename);
//         fstream = fs.createWriteStream(filePath);
//         console.log(filePath,"what's filepath?");
// 	   	res.send(filePath);
//         file.pipe(fstream);
//         fstream.on('close', function () {
//             console.log("file saved");
//             });
//         });

// });
// app.post('/Photos', multer(multerConf).any(), (req, res) => {
// 	let imagePath = req.files[0].path.replace("build", "")
// 		res.send(JSON.stringify(imagePath));
// //		console.log(imagePath,"what's the result of pictures?")
// });

// app.listen(PORT, () => {
//   console.log("Example app listening on port " + PORT);
// });
// exports.app=functions.https.onRequest(app);
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// import multer, {memoryStorage} from "multer";
// import express from "express";
// import storage from "@google-cloud/storage";
// import path from "path";
// Instantiate a storage client
const googleCloudStorage = new Storage({
  projectId: "wangroof-f4939"
//  keyFilename: "wangroof-f4939.appspot.com"
});

// Instantiate an express server
const app = express();

// Multer is required to process file uploads and make them available via
// req.files.
const m = multer({
  storage: memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb
  },
  //      filename: function(req, file, next) {
//        const ext = file.mimetype.split('/')[1];
//        next(null, file.fieldname + '-' + Date.now() + '.' + ext);
//      }
});

// A bucket is a container for objects (files).
const bucket = googleCloudStorage.bucket("wangroof-f4939.appspot.com");
app.use(morgan('dev'));
// Display a form for uploading files.
app.get("/", (req, res) => {
 // res.sendFile(path.join(`${__dirname}/index.html`));
});
// Process the file upload and upload to Google Cloud Storage.
app.post("/Photos", m.single("file"), (req, res, next) => {
  if (!req.file) {
    res.status(400).send("No file uploaded.");
    return;
  }
  // Create a new blob in the bucket and upload the file data.
  const blob = bucket.file(req.file.originalname);

  // Make sure to set the contentType metadata for the browser to be able
  // to render the image instead of downloading the file (default behavior)
  const blobStream = blob.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  });

  blobStream.on("error", err => {
    next(err);
    return;
  });

  blobStream.on("finish", () => {
    // The public URL can be used to directly access the file via HTTP.
    const publicUrl = "https://storage.googleapis.com/"+bucket.name+"/"+blob.name;
    res.send(JSON.stringify(publicUrl));
    // Make the image public to the web (since we'll be displaying it in browser)
    blob.makePublic().then(() => {
      res.status(200).send(`Success!\n Image uploaded to ${publicUrl}`);
    });
  });

  blobStream.end(req.file.buffer);
});

//const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log("Press Ctrl+C to quit.");
});
exports.app=functions.https.onRequest(app);