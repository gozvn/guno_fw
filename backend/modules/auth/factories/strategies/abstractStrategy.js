// abstractStrategy.js
module.exports = class AbstractStrategy {
    async request(req, res, next) {
        throw new Error('Not implemented');
    };

    async callback(req, res, next) {
        throw new Error('Can not handle');
    }
}
