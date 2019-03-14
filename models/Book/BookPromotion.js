const mongoose = require("mongoose");

const bookPromotionSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  status: { type: mongoose.Schema.Types.String, default: "processing" },
  startDate: { type: mongoose.Schema.Types.Date, required: true },
  endDate: { type: mongoose.Schema.Types.Date, required: true },
  submissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "BookSubmission" }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdOn: { type: mongoose.Schema.Types.Date, default: Date.now }
});

const BookPromotion = mongoose.model("BookPromotion", bookPromotionSchema);
module.exports = BookPromotion;
