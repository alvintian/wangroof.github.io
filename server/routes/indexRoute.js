var express = require('express');
var router = express.Router();
const multer = require('multer');

module.exports = function(knex) {
	// router.get('/message', function(req, res, next) {
	//   res.json('Welcome To React rjfoirf');
	// });
	const multerConf = {
		storage: multer.diskStorage({
			destination: function(req, file, next) {
				next(null, './build/images');
			},
			filename: function(req, file, next) {
				const ext = file.mimetype.split('/')[1];
				next(null, file.fieldname + '-' + Date.now() + '.' + ext);
			},
		}),
		fileFilter: function(req, file, next) {
			if (!file) {
				next();
			}
			const image = file.mimetype.startsWith('image/');
			if (image) {
				next(null, true);
			} else {
				next(
					{
						message: 'File type not supported',
					},
					false
				);
			}
		},
	};
	router.get('/Photos', (req, res) => {
		knex
			.select('*')
			.from('picture')
			.then(results => {
				res.json(results);
			});
	});



	router.delete('/Photos', (req, res) => {
	console.log(req.body.name,"what's deleted ?");
		knex('picture')
		.where('src','=',req.body.name)
		.del()
		.then(results => {
			res.json(results);
		});
	});

router.post('/Estimates', (req, res) => {
	console.log(req.body,"what's in estimates??")
	   var name = req.body.name;
	   var email=req.body.email;
	   var phone =req.body.phone;
	   var address=req.body.address;
	   var postalcode=req.body.postalcode;
	   var message=req.body.message;

		knex('users')
			.insert({name: name,
					email:email,
					phone:phone,
					address:address,
					postal_code:postalcode,
					message:message})
			.then(results => {
				res.json(results);
			})
    var sendEmail = require('gmail-send')({
      //var send = require('../index.js')({
//      user: 'manydecisions@gmail.com',
        user: process.env.GMAIL_USER,
     pass:process.env.GMAIL_PASS,

 		to: process.env.GMAIL_USER,
      // to:   credentials.user,                  // Send to yourself
      // you also may set array of recipients:
      // [ 'user1@gmail.com', 'user2@gmail.com' ]
      // from:    credentials.user,            // from: by default equals to user
      // replyTo: credentials.user,            // replyTo: by default undefined
      // bcc: 'some-user@mail.com',            // almost any option of `nodemailer` will be passed to it
      subject: `WangRoofing inquiry from "${email}"!`,
      text: `"${name}" has a message for you:
      		"${message}"
      		contact info: phone:"${phone}",address:"${address}",postalcode:"${postalcode}"`
      //html:    '<b>html text</b>'            // HTML
    });
    // console.log(urls["poll_url"]);
    // console.log(`successfully found: ${rows}`);
    sendEmail();
    console.log('did gmail send??');
	});	

	// router.get('/Feedback', (req, res) => {
	// 	knex
	// 		.select('feedback')
	// 		.from('comments')
	// 		.then(results => {
	// 			res.json(results);
	// 		})
	// });
	router.post('/Feedback', (req, res) => {
		knex('comments')
			.insert({feedback: req.body.comments})
			.then(results => {
				res.json(results);
			})
	});
router.post('/Photos', multer(multerConf).any(), (req, res) => {
//	window.alert("am i in chrome??")
		console.log(req.files, 'is files empty?');
			let imagePath = req.files[0].path.replace("build", "")
				// knex('picture')
				// .insert({
				// 	src: imagePath,
				// 	thumbnail: imagePath
				// })
					res.json(imagePath);
//					console.log(imagePath,"what's the result of pictures?")

	});
	return router;
};
