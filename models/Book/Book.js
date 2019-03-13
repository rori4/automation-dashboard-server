const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema({
    title: { type: mongoose.Schema.Types.String, required: true, unique: true},
    synopsis: { type: mongoose.Schema.Types.String, required: true },
    authorBio: { type: mongoose.Schema.Types.String, required: true },
    bookCover: { type: mongoose.Schema.Types.String, required: true },
    amazonUrl: { type: mongoose.Schema.Types.String, required: true },
    authorName: { type: mongoose.Schema.Types.String, required: true},
    authorEmail: { type: mongoose.Schema.Types.String, required: true},
    keywords: { type: mongoose.Schema.Types.String, required: true },
    reviewsIframe: { type: mongoose.Schema.Types.String, required: true },
    user: {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
    rankHistory: [{type: mongoose.Schema.Types.ObjectId, ref:'AmazonRank'}],
    promotions: [{type: mongoose.Schema.Types.ObjectId, ref:"BookPromotion"}]
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;