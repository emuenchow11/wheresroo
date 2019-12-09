import { getEntries, addNewEntry, getEntryWithId } from "../controllers/rooController";
//import { uploadFile } from '../upload';

const routes = (app) => {
    app.route('/entries')
        .get(getEntries)
        .post(addNewEntry);

    app.route('/entries/:entryId')
        .get(getEntryWithId);
    /*
        app.route('/pictures')
            .post(uploadFile)
            */
}

export default routes;


/*
var express = require("express");
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://emuenchow:Elsegundo2019@cluster0-eiixr.azure.mongodb.net/RooDB?retryWrites=true&w=majority', {
      useNewUrlParser: true
  });


//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const RooSchema = new Schema({
    lat: {
        type: Number,
        required: 'lat required'
    },
    lng: {
        type: Number,
        required: 'lng required'
    },
    image: {
        type: String
    },
    info: {
        type: String,
        required: 'info required'
    },
    name: {
        type: String
    },
    show: {
        type: Boolean,
        default: false
    }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const Roo = mongoose.model('Roo', RooSchema);

app.get("/", function(req, res) {
  res.send("Hello World!");
});

app.get("/entries", function(req, res) {
  Roo.find({ show: true }, { lat: 1, lng: 1 }, function(err, entry) {
        if (err) {
            res.send(err);
        }
        res.json(entry);
    })

});

app.get('/entries/:entryId', function(req, res) {
    Roo.findById(req.params.entryId, { lat: 0, lng: 0 }, function(err, entry) {
            if (err) {
                res.send(err);
            }
            res.json(entry);
        })

  });

  app.post('/entries', function(req, res) {
    let newEntry = new Roo(req.body);

    newEntry.save( function(err, entry) {
        if (err) {
            res.send(err);
        }
        res.json(entry);
    });
  });


app.listen(3000, function(){
    console.log('Express app start on port 3000')
});
*/