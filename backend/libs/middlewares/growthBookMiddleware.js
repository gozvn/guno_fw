const configs = require('../../configs/growthBook');
const { GrowthBook, setPolyfills } = require("@growthbook/growthbook");

module.exports = (req, res, next) => {
    if (!configs.enabled) {
        return false;
    }

    setPolyfills({
        // Required for Node 17 or earlier
        fetch: require("cross-fetch"),
        // Required when using encrypted feature flags and Node 18 or lower
        SubtleCrypto: require("node:crypto").webcrypto.subtle,
        // Optional, can make feature rollouts faster
        EventSource: require("eventsource")
    })

    // Create a GrowthBook Context
    req.growthbook = new GrowthBook({
        apiHost: configs.apiHost,
        clientKey: configs.clientKey,
        decryptionKey: configs.decryptionKey,
        enableDevMode: configs.debug,
        trackingCallback: (experiment, result) => {
            console.log("Viewed Experiment", {
                experimentId: experiment.key,
                variationId: result.key
            });
        }
    });

    // Clean up at the end of the request
    res.on('close', () => req.growthbook.destroy());

    // Wait for features to load (will be cached in-memory for future requests)
    req.growthbook.loadFeatures()
        .then(() => next())
        .catch((e) => {
            console.error("Failed to load features from GrowthBook", e);
            next();
        })
}
