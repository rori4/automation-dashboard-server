const mongoose = require('mongoose');

const amazonRankSchema = new mongoose.Schema({
    date: {type: mongoose.Schema.Types.Date, required:true, default:Date.now},
    rank: {type: mongoose.Schema.Types.Number, required:true},
    book: {type: mongoose.Schema.Types.ObjectId, ref:'Book'},
});

const AmazonRank = mongoose.model('AmazonRank', amazonRankSchema);
module.exports = AmazonRank;