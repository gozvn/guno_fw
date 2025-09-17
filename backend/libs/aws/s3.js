const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    endpoint: process.env.AWS_END_POINT,
});

module.exports = {
    getSignedUrl: (key) => {
        if (!key) return null;

        const url = s3.getSignedUrl('getObject', {
            Bucket: process.env.S3_BUCKET,
            Key: key,
            Expires: 60 * 60
        });
        return url;
    }
}
