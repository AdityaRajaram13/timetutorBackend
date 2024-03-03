// adminRoutes.js
const express = require('express');
const { authenticateToken, checkRole } = require('../middleware/authmiddleware');
const LectureSchedule = require('../models/lectureschedule');
const { Instructor } = require('../models/user');
const Course = require('../models/course');

const router = express.Router();

router.get('/', authenticateToken, checkRole('admin'), async (req, res) => {
  try {
    const instructors = await Instructor.find({}); // Use the Instructor model
    res.json({status:'failed',message:'successfully fetch instructors', instructors });
  } catch (error) {
    console.error(error);
    res.status(500).json({status:'failed', message: 'Internal server error' });
  }
});

// Route to add a new course
router.post('/', authenticateToken, checkRole('admin'), async (req, res) => {
    try {
      const { name, level, description, image } = req.body;
      const course = new Course({
        name,
        level,
        description ,
        image,
      });
        await course.save();
        res.status(201).json({ status:'success',message: 'Course created successfully', course });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create course', error });
    }
  });
  
  // Route to get all courses
router.get('/all-course', authenticateToken, checkRole('admin'), async (req, res) => {
  try {
    const courses = await Course.find();
    res.json({ status: 'success', courses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch courses', error });
  }
});

// Add lectures (batches) to a course
router.post('/schedule', authenticateToken, checkRole('admin'), async (req, res) => {
  const { instructorId, date, batch,courseId } = req.body;
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    const instructor = await Instructor.findById(instructorId);
    if (!instructor) {
      return res.status(404).json({ message: 'Instructor not found' });
    }
    const existingLecture = await LectureSchedule.findOne({ instructor: instructorId, date });
    if (existingLecture) {
      return res.status(400).json({ message: 'Instructor is already assigned to a lecture on the same date' });
    }
    const lecture = new LectureSchedule({ course: courseId, instructor: instructorId, date, batch });
    await lecture.save();
    res.status(201).json({ lecture });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.get('/allschedule', authenticateToken, checkRole('admin'), async (req, res) => {
  try {
    const lectures = await LectureSchedule.find().populate('course', 'name description level').populate('instructor', 'username').select('course instructor date batch');
    
    res.status(200).json({ lectures });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;
