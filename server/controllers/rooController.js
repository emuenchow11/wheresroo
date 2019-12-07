import mongoose from 'mongoose';
import { RooSchema } from '../models/rooModel';

const Roo = mongoose.model('Roo', RooSchema);

export const addNewEntry = (req, res) => {
    let newEntry = new Roo(req.body);

    newEntry.save((err, entry) => {
        if (err) {
            res.send(err);
        }
        res.json(entry);
    });
};


export const getEntries = (req, res) => {
    Roo.find({ show: true }, { lat: 1, lng: 1 }, (err, entry) => {
        if (err) {
            res.send(err);
        }
        res.json(entry);
    })

}

export const getEntryWithId = (req, res) => {
    Roo.findById(req.params.entryId, { lat: 0, lng: 0 }, (err, entry) => {
        if (err) {
            res.send(err);
        }
        res.json(entry);
    })
}
