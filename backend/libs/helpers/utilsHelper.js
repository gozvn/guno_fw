const crypto = require('crypto');
const moment = require("moment");

const utils = {
    sleep: (seconds) => {
        console.log(`Sleep ${seconds}s`);
        const milliseconds = seconds * 1000
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    },
    buildTree: (items, result = []) => {
        items.forEach(e => {
            const children = e.children;
            delete e.children;
            result.push(e);
            result = utils.buildTree(children, result);
        });
        return result;
    },
    nest: (items, id = null, level = 0) => {
        id = typeof id === 'undefined' || !id ? '00000000-0000-0000-0000-000000000000' : id;
        return items
            .filter(item => item.parentId === id)
            .map(item => {
                item.level = level;
                return {...item, children: utils.nest(items, item.id, level + 1)}
            })
    },
    randomMinMax: (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    },
    createHmac: (string, secretKey) => {
        const sign = crypto.createHmac('sha256', secretKey)
            .update(string)
            .digest('hex');
        return sign;
    }
}
module.exports = utils;
