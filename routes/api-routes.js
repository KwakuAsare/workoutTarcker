const db = require("../models");
const path = require("path");

module.exports = function(app) {

    app.get('/exercise', (req, res) => {
        res.sendFile(path.join(__dirname, '../public', 'exercise.html'));
    });
    
    app.get('/stats', (req, res) => {
        res.sendFile(path.join(__dirname, '../public', 'stats.html'));
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
    
}