const AWS = require('aws-sdk');

// Enter copied or downloaded access id and secret here
const ID = 'AKIAVDUZEXEGPDZYES5X';
const SECRET = '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';

// Enter the name of the bucket that you have created here
const BUCKET_NAME = 'wheresroo-photo';


// Initializing S3 Interface
const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

export const uploadFile = (file) => {

    // setting up s3 upload parameters
    const params = {
        Bucket: BUCKET_NAME,
        Key: `/map/${file.name}`,
        Body: Buffer.from(file, "binary")
    };

    // Uploading files to the bucket
    s3.upload(params, function (err, data) {
        if (err) {
            throw err
        }
        return data.location;
    });
};
