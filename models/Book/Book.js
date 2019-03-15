const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: mongoose.Schema.Types.String, required: true },
  synopsis: { type: mongoose.Schema.Types.String, required: true },
  authorBio: { type: mongoose.Schema.Types.String, required: true },
  cover: { type: mongoose.Schema.Types.String, required: true },
  url: { type: mongoose.Schema.Types.String, required: true },
  authorName: { type: mongoose.Schema.Types.String, required: true },
  email: { type: mongoose.Schema.Types.String, required: true },
  keywords: { type: mongoose.Schema.Types.String, required: true },
  reviewsIframe: { type: mongoose.Schema.Types.String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rankHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "AmazonRank" }],
  promotions: [{ type: mongoose.Schema.Types.ObjectId, ref: "BookPromotion" }],
  createdOn: { type: mongoose.Schema.Types.Date, default: Date.now }
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
