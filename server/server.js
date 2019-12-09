import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './routes/rooRoutes';
import next from 'next';

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
/*
 mongoose.connect('mongodb+srv://emuenchow:Elsegundo2019@cluster0-eiixr.azure.mongodb.net/RooDB?retryWrites=true&w=majority', {
      useNewUrlParser: true
  });
  */
const port = process.env.PORT || 3000;

app.prepare()
    .then(() => {
        const server = express();
        server.use(express.json()); // Make sure it comes back as json


        server.use(bodyParser.urlencoded({ extended: true }));
        server.use(bodyParser.json());
        routes(server)
        server.use(express.static('dist'));
        server.use('/s3', require('react-s3-uploader/s3router')({
            bucket: "wheresroo-photo",
            region: 'us-west-1',
            signatureVersion: 'v4', //optional (use for some amazon regions: frankfurt and others)
            signatureExpires: 500,
            headers: { 'Access-Control-Allow-Origin': '*' }
        }));

        server.get('*', (req, res) => {
            return handle(req, res)
        })

        //server.get('/', (req, res) => res.send(fs.readFile('../dist/app.html')));
        server.listen(port, () => { console.log(`Server running on ${port}`) });
    }).catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })