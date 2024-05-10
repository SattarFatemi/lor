const mongoose = require('mongoose');
const CooperationRing = require('../models/cooperationRing');

class CooperationRingDataAccess {
    static async insert(cooperationRing) {
        let newCooperationRing;
        if (cooperationRing._id) {
            const fetchedCooperationRing = await this.fetch(cooperationRing._id);
            if (!fetchedCooperationRing) {
                newCooperationRing = new CooperationRing({
                    _id: cooperationRing._id,
                    investorId: cooperationRing.investorId,
                    memberCount: cooperationRing.memberCount,
                    numberOfRequiredRounds: cooperationRing.numberOfRequiredRounds,
                    nextInFractalRing: cooperationRing.nextInFractalRing,
                    prevInFractalRing: cooperationRing.prevInFractalRing,
                });
            } else {
                return fetchedCooperationRing._id;
            }
        } else {
            newCooperationRing = new CooperationRing({
                investorId: cooperationRing.investorId,
                memberCount: cooperationRing.memberCount,
                numberOfRequiredRounds: cooperationRing.numberOfRequiredRounds,
                nextInFractalRing: cooperationRing.nextInFractalRing,
                prevInFractalRing: cooperationRing.prevInFractalRing,
            });
        }
        try {
            const savedCooperationRing = await newCooperationRing.save();
            return savedCooperationRing._id;
        } catch (error) {
            console.error('Error inserting cooperationRing:', error);
            throw error;
        }
    }

    static async fetch(id) {
        try {
            const cooperationRing = await CooperationRing.findById(id);
            return cooperationRing;
        } catch (error) {
            console.error('Error fetching cooperationRing:', error);
            throw error;
        }
    }
}

module.exports = CooperationRingDataAccess;
