var connection = require("../config/connection.js");

var orm = {
  all: function(tableInput, cb) {
  	connection.query({
      sql: `SELECT * FROM ??`,
      values: [tableInput]
    }, function(err, res) {
      if (err) throw err;
      cb(res)
    });
  },

  create: function(table, cols, vals, cb) {
  	connection.query({
      sql: `INSERT INTO ?? (??) VALUES (?)`,
      values: [table, cols, vals]
    }, function(err, res) {
      if (err) throw err;
      cb(res)
    });
  },

  // An example of objColVals would be {name: panther, sleepy: true}
  update: function(table, objColVals, condition, cb) {
  	connection.query({
      sql: `UPDATE ?? SET ? WHERE id = ?`,
      values: [table, objColVals, condition]
    }, function(err, res) {
      if (err) throw err;
      cb(res)
    });
  },

  delete: function(table, condition, cb) {
    connection.query({
      sql: `DELETE FROM ?? WHERE id = ?`,
      values: [table, condition]
    }, function(err, res) {
      if (err) throw err;
      cb(res)
    });
  }
};



module.exports = orm;