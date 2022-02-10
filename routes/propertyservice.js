var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
	port: process.env.DB_PORT,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

connection.connect(function (err) {
    if(err) {
        console.log(err);
    }
    console.log('Connected to the MySQL server.');
});

// define the get route
router.get('/', function(req, res) {
    query = 'SELECT * FROM property';
    var output='';
    selectAll(query, function (result){
        output = result;
        res.json({
            status: 200,
            output,
            message: "Property list retrieved successfully"
        });
    });
});

//define the post route
router.post('/', function(req, res) {
    //check api key
    var api = req.header('api-key');
    if (!validAPIKey(api))
    {
        res.json({
            status: 401,
            message: 'Invalid API key'
        })
    }

    //gather data from request body
    var data = req.body;
    let query = 'INSERT INTO property(address, city, state, zip) VALUES (?)';
    const values = [
        data.address,
        data.city,
        data.state,
        data.zip
    ];

    //validate body data
    if(!validAddress(data.address)) {
        res.json({
            status: 400,
            message: 'address must be between 1 and 1024 characters'
        })
        res.send();
        return;
    }
    if(!validCity(data.city)) {
        res.json({
            status: 400,
            message: 'city must be between 1 and 255 characters'
        })
        res.send();
        return;
    }
    if(!validState(data.state)) {
        res.json({
            status: 400,
            message: 'state must be 2 characters'
        })
        res.send();
        return;
    }
    if(!validZip(data.zip)) {
        res.json({
            status: 400,
            message: 'zip must be between 1 and 10 characters'
        })
        res.send();
        return;
    }

    //process query
    connection.query(query, [values], function(err, rows, fields) {
        if (err)
            console.log(err);
        res.json({
            status: 200,
            message: 'Property added successfully',
            id: rows.insertId
        });
    })
});

//define the get/:id route
router.get('/:id', function (req, res) {
    const id = req.params.id;
    const query = `SELECT * FROM property WHERE id=${id}`;
    var output='';
    selectAll(query, function(result){
        output = result;
        if (output == '') {
            res.json({
                status: 404,
                message: "Property not found"
            });
        }
        else {
            res.json({
                status: 200,
                output,
                message: "Property retrieved successfully"
            });
        }
    });
});

//define the /delete:id route
router.delete('/:id', function (req, res) {
    //check api key
    var api = req.header('api-key');
    if (!validAPIKey(api))
    {
        res.json({
            status: 401,
            message: 'Invalid API key'
        })
    }

    //verify property exists
    const id = req.params.id;
    const query = `SELECT * FROM property WHERE id=${id}`;
    var output='';
    selectAll(query, function(result){
        output = result;
        if (output == '') {
            res.json({
                status: 404,
                message: "Property not found"
            });
        }
        //delete property from database
        else {
            connection.query(`DELETE FROM property WHERE id=${id}`, function(err, rows) {
                if (err) {
                    console.log(err);
                }
                res.json({
                    status: 200,
                    message: "Property deleted successfully"
                });
            })
        }
    });
});

//define the /put:id route
router.put('/:id', function (req, res) {
    //check api key
    var api = req.header('api-key');
    if (!validAPIKey(api))
    {
        res.json({
            status: 401,
            message: 'Invalid API key'
        })
    }

    //verify property exists
    const id = req.params.id;
    const query = `SELECT * FROM property WHERE id=${id}`;
    var output='';
    selectAll(query, function(result){
        output = result;
        if (output == '') {
            res.json({
                status: 404,
                message: "Property not found"
            });
        }
    });

    //build sql statement
    var data = req.body;
    let sql = `UPDATE property SET`;
    if (typeof data.address !== "undefined")
    {
        if(!validAddress(data.address)) {
            res.json({
                status: 400,
                message: 'address must be between 1 and 1024 characters'
            })
            res.send();
            return;
        }
        sql+=` address="${data.address}"`;
    }
    if (typeof data.address !== "undefined" && (typeof data.city !== "undefined" ||  typeof data.state !== "undefined" || typeof data.zip !== "undefined"))
        sql+=",";

    if (typeof data.city !== "undefined")
    {
        if(!validCity(data.city)) {
            res.json({
                status: 400,
                message: 'city must be between 1 and 255 characters'
            })
            res.send();
            return;
        }
        sql+=` city="${data.city}"`;
    }
    if (typeof data.city !== "undefined" && (typeof data.state !== "undefined" || typeof data.zip !== "undefined"))
        sql+=",";
    if (typeof data.state !== "undefined")
    {
        if(!validState(data.state)) {
            res.json({
                status: 400,
                message: 'state must be 2 characters'
            })
            res.send();
            return;
        }
        sql+=` state="${data.state}"`;
    }
    if (typeof data.state !== "undefined" && typeof data.zip !== "undefined")
        sql+=",";
    if (typeof data.zip !== "undefined")
    {
        if(!validZip(data.zip)) {
            res.json({
                status: 400,
                message: 'zip must be between 1 and 10 characters'
            })
            res.send();
            return;
        }
        sql+=` zip="${data.zip}"`;
    }
    sql+=` WHERE id=${id}`;

    //process query
    connection.query(sql, function(err, rows) {
        if (err)
            console.log(err);
        res.json({
            status: 200,
            message: 'Property modified successfully'
        });
    })
});

//selects all records from the database and returns them
function selectAll(statement, callback) {
    connection.query(statement, function(err, rows) {
        if (err) {
            console.log(err);
        }
        return callback(rows);
    });
}

function validAddress(variable) {
    if (variable.length < 1 || variable.length > 1024)
        return false;
    else
        return true;
}
function validCity(variable) {
    if (variable.length < 1 || variable.length > 255)
        return false;
    else
        return true;
}
function validState(variable) {
    if (variable.length != 2)
        return false;
    else
        return true;
}
function validZip(variable) {
    if (variable.length < 1 || variable.length > 10)
        return false;
    else
        return true;
}
function validAPIKey(variable) {
    if (variable == 'cs4783ftw!')
        return true
    else
        return false
}

module.exports = {
    router,
    validAddress,
    validCity,
    validState,
    validZip,
    validAPIKey
};
connection.close;