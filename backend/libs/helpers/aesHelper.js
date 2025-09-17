const crypto = require("crypto")
const configs = require('../../configs/configs')
const stringHelper = require('../../libs/helpers/stringHelper')

const algorithm = configs.aes.algorithm
const secretKey = configs.aes.secretKey
const iv = configs.aes.iv

module.exports = {
    encrypt: (plainText) => {
        plainText = plainText ? plainText.toString() : ''
        if (plainText == null) {
            return false
        }
        const buffer = Buffer.from(plainText)
        const cipher = crypto.createCipheriv(algorithm, secretKey, iv)
        const encrypted = Buffer.concat([cipher.update(buffer),cipher.final()])
        return encrypted.toString('base64')
    },
    decrypt: (text) => {
        let decipher = crypto.createDecipheriv(algorithm, secretKey, iv)
        let dec = decipher.update(text,'base64','utf-8')
        dec += decipher.final()
        return dec
    },
    sign: (message) => {
        const sign = crypto.sign(
            'sha256',
            message, {
                key: configs.web.rsaPrivateKey,
                padding: crypto.constants.RSA_PKCS1_PSS_PADDING
            }
        );
        return sign;
    },
    verify: (message, signature) => {
        console.log('configs.web.rsaPublicKey', configs.web.rsaPublicKey)
        return crypto.verify(
            "sha256",
            message, {
                key: configs.web.rsaPublicKey,
                padding: crypto.constants.RSA_PKCS1_PSS_PADDING
            },
            signature
        );
    }
}
