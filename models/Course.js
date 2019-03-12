const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    // title: { type: mongoose.Schema.Types.String, required: true, unique: true },
    // synopsis: { type: mongoose.Schema.Types.String, required: true },
    // authorBio: { type: mongoose.Schema.Types.String, required: true },
    // bookCover: { type: mongoose.Schema.Types.String, required: true },
    // amazonUrl: { type: mongoose.Schema.Types.String, required: true },
    // authorEmail: { type: mongoose.Schema.Types.String, required: true },
    // dateFrom: { type: mongoose.Schema.Types.Date, required: true },
    // dateТо: { type: mongoose.Schema.Types.Date, required: true },
    // user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    //perma free ? or kindle unlimited promotion ?
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;