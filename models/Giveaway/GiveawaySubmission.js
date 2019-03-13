const mongoose = require("mongoose");

const courseSubmissionSchema = new mongoose.Schema({
  createdOn: { type: mongoose.Schema.Types.Date, default: Date.now },
  website: { type: mongoose.Schema.Types.String, required: true },
  result: { type: mongoose.Schema.Types.String, required: true },
  screenshots: [{ type: mongoose.Schema.Types.String }],
  error: { type: mongoose.Schema.Types.String },
  coursePromotion: { type: mongoose.Schema.Types.ObjectId, ref: "CoursePromotion" },
});

const courseSubmission = mongoose.model("CourseSubmission", courseSubmissionSchema);
module.exports = courseSubmission;
  