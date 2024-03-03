const mongoose = require('mongoose');

const lectureScheduleSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Instructor',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  batch: {
    type: String,
    enum: ['Morning', 'Afternoon', 'Evening'],
    required: true
  }
});

const LectureSchedule = mongoose.model('LectureSchedule', lectureScheduleSchema);

module.exports = LectureSchedule;
