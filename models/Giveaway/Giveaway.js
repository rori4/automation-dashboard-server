const mongoose = require('mongoose');


const giveawaySchema = new mongoose.Schema({
    title: { type: mongoose.Schema.Types.String, required: true },
    url: { type: mongoose.Schema.Types.String, required: true },
    sponsorName: { type: mongoose.Schema.Types.String, required: true },
    description: { type: mongoose.Schema.Types.String, required: true },
    prize: { type: mongoose.Schema.Types.String, required: true },
    cover: { type: mongoose.Schema.Types.String, required: true },
    eligibility: { type: mongoose.Schema.Types.String, required: true },
    prizeValue: { type: mongoose.Schema.Types.Number, required: true },
    category: { type: mongoose.Schema.Types.String, required: true },
    entryMethod: { type: mongoose.Schema.Types.String, required: true },
    email: { type: mongoose.Schema.Types.String, required: true },
    user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    promotions: [{type: mongoose.Schema.Types.ObjectId, ref:'GiveawayPromotion'}],
    createdOn: { type: mongoose.Schema.Types.Date, default: Date.now }
});

const Giveaway = mongoose.model('Giveaway', giveawaySchema);
module.exports = Giveaway;