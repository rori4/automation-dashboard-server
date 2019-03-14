const mongoose = require("mongoose");

const giveawayPromotionSchema = new mongoose.Schema({
  giveaway: { type: mongoose.Schema.Types.ObjectId, ref: "Giveaway" },
  status: { type: mongoose.Schema.Types.String, default: "processing" },
  startDate: { type: mongoose.Schema.Types.Date, required: true },
  endDate: { type: mongoose.Schema.Types.Date, required: true },
  submissions: [
    { type: mongoose.Schema.Types.ObjectId, ref: "GiveawaySubmission" }
  ],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdOn: { type: mongoose.Schema.Types.Date, default: Date.now }
});

const GiveawayPromotion = mongoose.model(
  "GiveawayPromotion",
  giveawayPromotionSchema
);
module.exports = GiveawayPromotion;
