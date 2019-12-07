import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './routes/rooRoutes';
import fs from 'fs';

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json()); // Make sure it comes back as json

mongoose.connect('mongodb+srv://emuenchow:Elsegundo2019@cluster0-eiixr.azure.mongodb.net/RooDB?retryWrites=true&w=majority', {
    useNewUrlParser: true
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
routes(app)
app.use(express.static('dist'));
app.use('/s3', require('react-s3-uploader/s3router')({
    bucket: "wheresroo-photo",
    region: 'us-west-1',
    signatureVersion: 'v4', //optional (use for some amazon regions: frankfurt and others)
    signatureExpires: 500,
    headers: { 'Access-Control-Allow-Origin': '*' }
}));


app.get('/', (req, res) => res.send(fs.readFile('../dist/app.html')));
app.listen(port, () => { console.log(`Server running on ${port}`) });
