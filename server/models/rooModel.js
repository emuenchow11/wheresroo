import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const RooSchema = new Schema({
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