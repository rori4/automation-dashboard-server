const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    udemyUrl: { type: mongoose.Schema.Types.String, required: true, unique: true },
    title: { type: mongoose.Schema.Types.String, required: true },
    price: { type: mongoose.Schema.Types.String, required: true },
    instructorName: { type: mongoose.Schema.Types.String, required: true },
    summary: { type: mongoose.Schema.Types.String, required: true },
    keywords: { type: mongoose.Schema.Types.String, required: true },
    courseCover: { type: mongoose.Schema.Types.String, required: true },
    instructorEmail: { type: mongoose.Schema.Types.String, required: true },
    user: {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
    promotions: [{type: mongoose.Schema.Types.ObjectId, ref:'CoursePromotion'}]
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;