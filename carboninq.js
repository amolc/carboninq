var connect = require('connect');
var app = connect();
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var path = require('path');
var bodyParser = require( 'body-parser' );
var nodemailer = require( 'nodemailer' );
var cors = require('cors'); 
 
var vhost = require('vhost'); 

app.use(bodyParser.json({ limit: '50mb', extended: true, type:'application/json' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, type:'application/x-www-form-urlencoding' }));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.raw({ limit: '50mb' }));

var http = require("http").createServer(app);
var public = connect();
//public.use(function(req, res, next){
  //	 
//})

public.use(serveStatic('public'));
app.use('/',public);

// var store = connect();
// store.use(serveStatic('store'));
// app.use('/store',store);

// var portal = connect();
// portal.use(serveStatic('portal'));
// app.use('/portal',portal);

// var superadmin = connect();
// superadmin.use(serveStatic('superadmin'));
// app.use('/superadmin',superadmin);

var admin = connect();
admin.use(serveStatic('business'));
app.use('/admin',admin); 

// var dashBoard = connect();
// dashBoard.use(serveStatic('dashBoard'));
// app.use('/dashBoard',dashBoard); 

// var cnle = connect();
// cnle.use(serveStatic('cnle'));
// app.use('/cnle',cnle); 

// app.use(vhost('mobilesinasia', public));
// app.use(vhost('superadmin.mobilesinasia', superadmin));
// app.use(vhost('admin.mobilesinasia', admin));
// app.use(vhost('portal.mobilesinasia', portal));


//app.use(vhost('new.mobilesinasia', store));
// app.use(vhost('*.mobilesinasia', store));

// app.use(vhost('mobilesinasia.com', public));
// app.use(vhost('demo.mobilesinasia.com', store));
// app.use(vhost('naranjan.mobilesinasia.com', store));
// app.use(vhost('hinex.mobilesinasia.com', store));
// app.use(vhost('priya.mobilesinasia.com', store));
// app.use(vhost('superadmin.mobilesinasia.com', superadmin));
// app.use(vhost('admin.mobilesinasia.com', admin));
// app.use(vhost('portal.mobilesinasia.com', portal));
// app.use(vhost('*.mobilesinasia.com', portal));


app.listen(9500, function () {

  console.log('CORS-enabled web server listening on port 9500')

console.log("Magic at 9500");
})
           