// Create web server
var express = require('express');
var router = express.Router();

// Import the model (comments.js) to use its database functions.
var comments = require('../models/comments.js');

// Create all our routes and set up logic within those routes where required.
router.get('/', function(req, res) {
  comments.all(function(data) {
    var hbsObject = {
      comments: data
    };
    console.log(hbsObject);
    res.render('index', hbsObject);
  });
});

router.post('/api/comments', function(req, res) {
  comments.create([
    'author', 'comment', 'created_at'
  ], [
    req.body.author, req.body.comment, req.body.created_at
  ], function(result) {
    // Send back the ID of new comment
    res.json({ id: result.insertId });
  });
});

router.put('/api/comments/:id', function(req, res) {
  var condition = 'id = ' + req.params.id;

  console.log('condition', condition);

  comments.update({
    comment: req.body.comment
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then comment ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});