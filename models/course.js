const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
  },
  description: String,
  image: {
    type: String,
    default: 'https://st2.depositphotos.com/2586633/46477/v/450/depositphotos_464771766-stock-illustration-no-photo-or-blank-image.jpg'
  },
  lectures: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LectureSchedule'
  }]
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;


