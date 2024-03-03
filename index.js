const express = require("express");
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser'); // Import body-parser middleware
const connectDB = require('./services/server');
const app = express();

const login = require('./routes/authRoutes');
const adminRoutes = require("./routes/adminRoutes");
const instructor = require("./routes/instructorRoutes");


const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen();
  })
  .catch(err => {
    console.error('Failed to connect to the database:', err);
  });

app.use(cors({
  origin: ['http://localhost:5173','http://localhost:5173/','https://main--ideamagixschedular.netlify.app/','https://main--ideamagixschedular.netlify.app'],
}));

app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({ limit: '50mb',extended: true }));
app.use("/api/admin/instructors",adminRoutes);
app.use("/api/admin/courses",adminRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/login", login);
app.use("/api/my-lectures",instructor);

app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});


module.exports = app; 
