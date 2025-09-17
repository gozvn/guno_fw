const fs = require('fs');
const AWS = require('aws-sdk');
const path = require('path');
const util = require('util');
const moment = require("moment");

const readFile = util.promisify(fs.readFile);
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    endpoint: process.env.AWS_END_POINT,
});

const storageS3Service = {
    /**
     * Upload file local lên S3
     * @param {Object} file - File từ multer
     * @param {String} bucket - Tên bucket
     * @param {String} folder - Folder trên S3
     */
    upload: async (file, bucket = '', folder = '') => {
        //const fileContent = await readFile(file.path);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileKey = path.join(folder, moment().format('YYYY/MM'), `${uniqueSuffix}-${file.filename}`);

        const params = {
            Bucket: bucket ? bucket : process.env.S3_BUCKET, // pass your bucket name
            Key: fileKey, // file will be saved in <folderName> folder
            Body: file.buffer,
            ContentType: file.mimetype
        };

        try {
            await s3.upload(params).promise();
            return fileKey;
        } catch (err) {
            console.error('Lỗi khi upload file:', err);
            return false;
        }
    },
    delete: async (bucket = '', key) => {
        const params = {
            Bucket: bucket ? bucket : process.env.S3_BUCKET, // pass your bucket name
            Key: key,
        };

        try {
            await s3.deleteObject(params).promise();
            console.log(`Đã xóa: ${key}`);
            return true;
        } catch (err) {
            console.error('Lỗi khi xóa file:', err);
            throw err;
        }
    },
    getSignedUrl: (key) => {
        if (!key) return null;

        const url = s3.getSignedUrl('getObject', {
            Bucket: process.env.S3_BUCKET,
            Key: key,
            Expires: 60 * 60
        });
        return url;
    },
    getObject: async (key, bucket = '') => {
        if (!key) return null;

        const params = {
            Bucket: bucket ? bucket : process.env.S3_BUCKET, // pass your bucket name
            Key: key,
        };

        return new Promise((resolve, reject) => {
            s3.getObject(params, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
}

module.exports = storageS3Service;
