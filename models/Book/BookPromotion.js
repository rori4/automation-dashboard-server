const mongoose = require('mongoose');

const bookPromotionSchema = new mongoose.Schema({
    dateFrom: {type: mongoose.Schema.Types.Date, required:true},
    dateTo: {type: mongoose.Schema.Types.Date, required:true},
    book: {type: mongoose.Schema.Types.ObjectId, ref:'Book'},
    status: {type: mongoose.Schema.Types.String, default:"processing"},
    submissions: [{type: mongoose.Schema.Types.ObjectId, ref:'BookSubmission'}]
});

const BookPromotion = mongoose.model('BookPromotion', bookPromotionSchema);
module.exports = BookPromotion;
