const mongoose = require('mongoose');


const cooperationRingSchema = new mongoose.Schema({
    investorId: {
        type: String,
        required: true,
    },
    memberCount: {
        type: Number,
        required: true,
    },
    numberOfRequiredRounds: {
        type: Number,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    nextInFractalRing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CooperationRing',
    },
    prevInFractalRing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CooperationRing',
    }
}, {timestamps: true});

const CooperationRing = mongoose.model('CooperationRing', cooperationRingSchema);
module.exports = CooperationRing;
