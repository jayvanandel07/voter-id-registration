const express = require('express');
const oracledb = require('oracledb');
var bodyParser = require('body-parser')

var app = express()

// create application/json parser
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

async function insertNewVoter(data) {

  var vid;
  let connection;
  try {

    connection = await oracledb.getConnection({ user: "dbms", password: "manager", connectionString: "localhost:1521/xepdb1" });

    console.log("Successfully connected to Oracle Database");

    let result = await connection.execute(
      `SELECT * FROM voters WHERE vid=(SELECT max(vid) FROM voters)`);

    if (result.rows.length === 0) {
      vid = "TN10001";
    } else {
      var tvid = result.rows[0][0];
      vid = ("TN" + (parseInt(tvid.slice(2)) + 1)).toString();
      console.log(vid);
      console.log(data);
      console.log(`insert into voters values(${vid}, ${data.name}, ${data.surname}, ${data.rsurname}, ${data.typeofr}, ${data.age}, ${data.dob}, ${data.genderSelected},${data.house_no},${data.street},${data.city},${data.pin},${data.stateSelected}, ${data.districtSelected})`);
    }

    // Insert some data

    const sql = `insert into voters values('${vid}', '${data.name}', '${data.surname}', 
    '${data.rsurname}', '${data.typeofr}', '${data.age}', '06-nov-2002', '${data.genderSelected}','${data.house_no}','${data.street}','${data.city}','${data.pin}','${data.stateSelected}', '${data.districtSelected}')`;


    result = await connection.execute(sql);

    console.log(result.rowsAffected, "Rows Inserted");

    connection.commit();

    // Now query the rows back

    result = await connection.execute(
      `SELECT * FROM voters`);

    console.log(result.rows);



  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}







app.get('/api', function (req, res) {
  res.json({ message: "Hello World!" });
})

app.post('/api/new', function (req, res) {
  console.log(req.body);
  insertNewVoter(req.body);
  res.json({ message: "Hello World!" });
})

app.listen(3001, function () {
  console.log('listening on port 3001');
});
