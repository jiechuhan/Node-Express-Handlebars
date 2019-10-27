var connection = require("./connection.js")

function printQuestionMarks(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
        arr.push("?");
    };
    return arr.toString();
};

function objTosql(ob) {
    var arr = [];
    for (key in ob) {
        var value = ob[key];
        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(ley + "=" + value)
        };
    };
    return arr.toString();
};

var orm = {
    selectAll: function (tableInput, cb) {
        var sql = "SELECT * FROM " + tableInput + ";";
        connection.query(sql, function (err, result) {
            if (err) {
                throw err;
            };
            cb(result);
        });
    },

    insertOne: function (table, cols, vals, cb) {
        var sql = "INSERT INTO " + table;

        sql += " (";
        sql += cols.toString();
        sql += ") ";
        sql += "VALUES (";
        sql += printQuestionMarks(vals.length);
        sql += ") ";

        console.log(sql)

        connection.query(sql, vals, function (err, result) {
            if (err) {
                throw err;
            };
            cb(result);
        });
    },

    updateOne: function (table, objColVals, condition, cb) {
        var sql = "UPDATE " + table;

        sql += " SET ";
        sql += objTosql(objColVals);
        sql += " WHERE ";
        sql += condition;

        console.log(sql);
        connection.query(sql, function (err, result) {
            if (err) {
                throw err;
            };
            cb(result);
        });
    }
};


module.exports = orm;