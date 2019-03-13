const mongoose = require('mongoose');

const giveawayPromotionSchema = new mongoose.Schema({
    course: {type: mongoose.Schema.Types.ObjectId, ref:'Giveaway'},
    status: {type: mongoose.Schema.Types.String, default:"processing"},
    submissions: [{type: mongoose.Schema.Types.ObjectId, ref:'GiveawaySubmission'}]
});

const GiveawayPromotion = mongoose.model('GiveawayPromotion', giveawayPromotionSchema);
module.exports = GiveawayPromotion;
