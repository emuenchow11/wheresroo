"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _next = _interopRequireDefault(require("next"));

var dev = process.env.NODE_ENV !== "production";
var app = (0, _next["default"])({
  dev: dev
});
var handle = app.getRequestHandler();
/*
 mongoose.connect('mongodb+srv://emuenchow:Elsegundo2019@cluster0-eiixr.azure.mongodb.net/RooDB?retryWrites=true&w=majority', {
      useNewUrlParser: true
  });
  */

var port = process.env.PORT || 3000;
app.prepare().then(function () {
  var server = (0, _express["default"])();
  server.use(_express["default"].json()); // Make sure it comes back as json

  server.use(_bodyParser["default"].urlencoded({
    extended: true
  }));
  server.use(_bodyParser["default"].json()); //routes(server)

  server.use(_express["default"]["static"]('dist'));
  server.use('/s3', require('react-s3-uploader/s3router')({
    bucket: "wheresroo-photo",
    region: 'us-west-1',
    signatureVersion: 'v4',
    //optional (use for some amazon regions: frankfurt and others)
    signatureExpires: 500,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }));
  server.get('*', function (req, res) {
    return handle(req, res);
  }); //server.get('/', (req, res) => res.send(fs.readFile('../dist/app.html')));

  server.listen(port, function () {
    console.log("Server running on ".concat(port));
  });
})["catch"](function (ex) {
  console.error(ex.stack);
  process.exit(1);
});