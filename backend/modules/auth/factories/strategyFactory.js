const GoogleStrategy = require('./strategies/googleStrategy');
const FacebookStrategy = require('./strategies/facebookStrategy');
//TODO
// const LocalStrategy = require('./strategies/localStrategy')
module.exports = class StrategyFactory {
    static createStrategy(provider) {
        let object;
        switch (provider) {
            case 'google':
                object = new GoogleStrategy();
                break;
            case 'facebook':
                object = new FacebookStrategy();
                break;
            // TODO
            // case 'local':
            //     return new LocalStrategy();
            default:
                throw new Error(`Unknown provider: ${provider}`);
        }

        return object;
    }
}
