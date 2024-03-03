const express = require('express');
const { authenticateToken, checkRole } = require('../middleware/authmiddleware');
const LectureSchedule = require('../models/lectureschedule');

const router = express.Router();

router.get('/', authenticateToken, checkRole('instructor'), async (req, res) => {
    try {
        const instructorId = req.user.id; 
        const instructorLectures = await LectureSchedule.find({
            instructor: instructorId
        })
        .select('course date batch instructor') 
        .populate({
            path: 'instructor',
            select: 'username' 
        })
        .populate({
            path: 'course',
            select: 'name level description' 
        });

        res.status(200).json({status:'success',message:'data fetch succesfully',instructorLectures });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;
