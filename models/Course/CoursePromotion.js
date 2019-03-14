const mongoose = require("mongoose");

const coursePromotionSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  status: { type: mongoose.Schema.Types.String, default: "processing" },
  startDate: { type: mongoose.Schema.Types.Date, required: true },
  endDate: { type: mongoose.Schema.Types.Date, required: true },
  submissions: [
    { type: mongoose.Schema.Types.ObjectId, ref: "CourseSubmission" }
  ],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdOn: { type: mongoose.Schema.Types.Date, default: Date.now }
});

const CoursePromotion = mongoose.model(
  "CoursePromotion",
  coursePromotionSchema
);
module.exports = CoursePromotion;
