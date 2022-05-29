const express = require('express');
const oracledb = require('oracledb');
const app = express();

async function run() {

  let connection;

  try {

    connection = await oracledb.getConnection({ user: "dbms", password: "manager", connectionString: "localhost:1521/xepdb1" });

    console.log("Successfully connected to Oracle Database");

    // Create a table

    // await connection.execute(`create table todoitem (id number(2))`);

    // Insert some data

    const sql = `insert into todoitem values(2)`;


    // let result = await connection.execute(sql);

    // console.log(result.rowsAffected, "Rows Inserted");

    // connection.commit();

    // Now query the rows back

    let result = await connection.execute(
      `select * from voters`);

    console.log(result);

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

run();

app.post("/new", (req, res) => {
  console.log(req.body);
  res.send("Hello");
});

app.get('/api', function (req, res) {
  res.json({ message: "Hello World!" });
})

app.listen(3001, function () {
  console.log('listening on port 3001');
});
