module.exports = {
    CLIENT_ID: "trader_app",
    BROKERS: ['localhost:9092'],
    CONSUMER_GROUP_ID: "trader_group",
    topics: {
        MESSAGES: "messages",
        COINS: "coins",
        COOPERATION_RINGS: "cooperation_rings",
        FRACTAL_RINGS: "fractal_rings",
        TRADERS: "traders",
    }
};
