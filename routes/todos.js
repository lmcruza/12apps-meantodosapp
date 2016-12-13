var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://lmcruza:lmcruza@ds127938.mlab.com:27938/meantodosapp_01', ['todos']);

// Get All Todos
router.get('/todos', function(req, res, next){
    db.todos.find(function(err, todos){
        if(err){
            res.send(err);
        } else {
            res.json(todos);
        }
    });
});

// Get Single Todos
router.get('/todo/:id', function(req, res, next){
    db.todos.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function(err, todo){
        if(err){
            res.send(err);
        } else {
            res.json(todo);
        }
    });
});

// Save Todo
router.post('/todo', function(req, res, next){
    var todo = req.body;
    if(!todo.text || !(todo.isCompleted + '')){
        res.status(400);
        res.json({
            "error": "Invalid data"
        })
    } else {
        db.todos.save(todo, function(err, result){
            if(err){
                res.send(err);
            } else {
                res.json(result);
            }
        });
    }
});

// Update Todo
router.put('/todo/:id', function(req, res, next){
    var todo = req.body;
    var updObj = {};
    if(todo.isCompleted) {
        updObj.isCompleted = todo.isCompleted;
    }
    if(todo.text) {
        updObj.text = todo.text;
    }
    if(!updObj){
        res.status(400);
        res.json({
            "error": "Invalid data"
        })
    } else {
        db.todos.update({
            _id: mongojs.ObjectId(req.params.is)
        }, updObj, function(err, result){
            if(err){
                res.send(err);
            } else {
                res.json(result);
            }
        });
    }
});

// Delete Todo
router.delete('/todo/:id', function(req, res, next){
    db.todos.remove({
        _id: mongojs.ObjectId(req.params.id)
    }, '', function(err, result){
        if(err){
            res.send(err);
        } else {
            res.json(result);
        }
    });
});


module.exports = router;