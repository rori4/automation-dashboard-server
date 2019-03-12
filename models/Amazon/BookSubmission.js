const mongoose = require("mongoose");

const bookSubmissionSchema = new mongoose.Schema({
  createdOn: { type: mongoose.Schema.Types.Date, default: Date.now },
  website: { type: mongoose.Schema.Types.String, required: true },
  result: { type: mongoose.Schema.Types.String, required: true },
  screenshots: [{ type: mongoose.Schema.Types.String }],
  error: { type: mongoose.Schema.Types.String },
  bookPromotion: { type: mongoose.Schema.Types.ObjectId, ref: "BookPromotion" },
});

const BookSubmission = mongoose.model("BookSubmission", bookSubmissionSchema);
module.exports = BookSubmission;
  