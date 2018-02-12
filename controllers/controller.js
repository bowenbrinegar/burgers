var express = require("express");

var router = express.Router();

var orm = require("../config/orm.js");
var burger = require("../models/burger.js");

router.get("/", function(req, res) {
  burger.all(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.put("/", function(req, res) {
  burger.create([
    "name", "devoured"
  ], [
    req.body.name, req.body.devoured
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
    res.status(200).end();
  });
});

router.put("/:id", function(req, res) {
	var condition = req.params.id

  burger.update({
    devoured: req.body.devoured
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/:id", function(req, res) {
  var condition = req.params.id
  burger.delete(condition, function(result) {
    res.status(200).end();
  })
})

module.exports = router;

