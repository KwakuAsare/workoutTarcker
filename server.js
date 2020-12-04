const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require('path');

const app = express();
var PORT = process.env.PORT || 3500;

const db = require("./models");

app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
});

app.get('/exercise', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'exercise.html'));
});

app.get('/stats', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'stats.html'));
});

app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
});

app.post('/api/workouts', (req, res) => {
    db.Workout.create(req.body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

app.put('/api/workouts/:id', (req, res) => {
    db.Workout.findByIdAndUpdate(
      req.params.id,
      { $push: {exercises: req.body}},
      { new: true }
    )
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});
  
app.get('/api/workouts/range', (req,res) => { 
    db.Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

app.listen(PORT, function() {
  console.log(`Now listening on port: ${PORT}`);
});