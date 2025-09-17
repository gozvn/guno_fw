const redis = require('redis');
const configs = require('../../configs/configs');
const cacheConfigs = configs.redis.cache;

const clientConfig = {
    socket: {
        host: cacheConfigs.host,
        port: cacheConfigs.port,
        reconnectStrategy: (retries) => {
            if (retries > 10) {
                console.error('Redis reconnect limit reached');
                return new Error('Reconnect limit reached');
            }
            return Math.min(retries * 100, 3000); // backoff
        }
    },
    database: cacheConfigs.db
}
if (cacheConfigs.auth) {
    clientConfig.password = cacheConfigs.auth;
}

const redisClient = redis.createClient(clientConfig);

// Kết nối Redis với bắt lỗi
(async () => {
    try {
        await redisClient.connect();
        console.log('✅ Redis connected');
    } catch (err) {
        console.error('❌ Redis connection failed:', err);
    }
})();

redisClient.on('error', (err) => {
    console.error('Redis Client Error:', err);
});

const redisCache = {
    client: redisClient,
    get: async (key) => {
        try {
            return await redisClient.get(key);  // Không cần .getAsync nữa
        } catch (e) {
            throw new Error(`Redis GET failed: ${e.message}`);
        }
    },
    set: async (key, data, ttl) => {
        try {
            ttl = typeof ttl === 'undefined' ? -1 : ttl;
            if (ttl > 0) {
                return await redisClient.set(key, data, { EX: ttl });  // Không cần .setAsync nữa
            }
            return await redisClient.set(key, data);  // Không cần .setAsync nữa
        } catch (e) {
            throw new Error(`Redis SET failed: ${e.message}`);
        }
    },
    delete: async (key) => {
        try {
            return await redisClient.del(key);  // Không cần .delAsync nữa
        } catch (e) {
            throw new Error(`Redis DEL failed: ${e.message}`);
        }
    }
}

module.exports = { redisClient, redisCache };
