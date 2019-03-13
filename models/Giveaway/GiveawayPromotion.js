const mongoose = require('mongoose');

const coursePromotionSchema = new mongoose.Schema({
    course: {type: mongoose.Schema.Types.ObjectId, ref:'Course'},
    status: {type: mongoose.Schema.Types.String, default:"processing"},
    submissions: [{type: mongoose.Schema.Types.ObjectId, ref:'CourseSubmission'}]
});

const CoursePromotion = mongoose.model('CoursePromotion', coursePromotionSchema);
module.exports = CoursePromotion;
