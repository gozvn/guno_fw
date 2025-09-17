'use strict';
const md5 = require('md5')
const {
    Model
} = require('sequelize');
const { redisCache } = require('../../libs/cache/redisCache')

const cachePrefix = 'CACHE_MODEL_V3'

class CoreModel extends Model {
    static cache = false
    static expireTime = 30 * 24 * 60 * 60;

    static enableCache() {
        this.cache = true
        return this
    }

    static disableCache() {
        this.cache = false
        return this
    }

    static async getCache(key) {
        try {
            const cache = await redisCache.get(cachePrefix + key)
            return cache == null ? false : JSON.parse(cache)
        } catch (e) {
            throw Error(`Redis getCache: ${e.toString()}`);
        }
    }

    static setCache = async (key, data) => {
        try {
            return await redisCache.set(cachePrefix + key, JSON.stringify(data), this.expireTime)
        } catch (e) {
            throw Error(`Redis setCache: ${e.toString()}`);
        }
    }

    static deleteCache = async (key) => {
        try {
            return await redisCache.delete(cachePrefix + key)
        } catch (e) {
            throw Error(`Redis deleteCache: ${e.toString()}`);
        }
    }

    getProperties() {
        return this.get();
    }
}

module.exports = CoreModel
