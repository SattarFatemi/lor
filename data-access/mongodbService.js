const mongoose = require('mongoose');
const mongoConfig = require('../config/mongoConfig');


class MongoService {
    static async connect(databaseName) {
        await mongoose.connect(`${mongoConfig.DATABASE_URL}/${databaseName}`, { // TODO
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const db = mongoose.connection;
        db.once('open', () => {
            console.log('Connected to MongoDB database');
        });
        db.on('error', (error) => {
            console.error('Error connecting to MongoDB:', error);
        });
        return db;
    }
}

module.exports = MongoService;
