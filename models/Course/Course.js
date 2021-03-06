const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    url: { type: mongoose.Schema.Types.String, required: true },
    title: { type: mongoose.Schema.Types.String, required: true },
    price: { type: mongoose.Schema.Types.String, required: true },
    instructorName: { type: mongoose.Schema.Types.String, required: true },
    summary: { type: mongoose.Schema.Types.String, required: true },
    keywords: { type: mongoose.Schema.Types.String, required: true },
    cover: { type: mongoose.Schema.Types.String, required: true },
    email: { type: mongoose.Schema.Types.String, required: true },
    user: {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
    promotions: [{type: mongoose.Schema.Types.ObjectId, ref:'CoursePromotion'}],
    createdOn: { type: mongoose.Schema.Types.Date, default: Date.now }
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;