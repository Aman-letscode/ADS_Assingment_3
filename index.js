const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

//create connection to mysql server
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "university",
});

//CONNECTION
con.connect((err) => {
  if (err) throw err;
  console.log("connected");
});

//use for creating tables
app.get("/createTable", (req, res) => {
  let sql = "Show tables";
  con.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Table created");
  });
});



//Display table 

//Student
app.get("/showTable/student/", (req, res) => {
  
      let sql = "select student.id,student.name,student.dept_name,student.tot_cred,instructor.name as instructor_name from student inner join advisor on student.ID = advisor.s_id inner join instructor on advisor.i_id = instructor.ID;";
  //Running the query
  con.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
    // res.send({ status: "success", result: result });
  });
});














//Student form
app.post("/student", (req, res) => {
  let id = req.body.Id;
  let name = req.body.name;
  let dept_name = req.body.dept_name;
  let tot_credit = req.body.tot_cred;

  const profile = {
    ID: req.body.Id,
    name: req.body.name,
    dept_name: req.body.dept_name,
    tot_credit: req.body.tot_cred,
  };
  let sql = "INSERT INTO student SET ?";
  let query = con.query(sql, profile, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send({ status: "success", message: "Info added" });
  });
  const instr = {
    s_id: req.body.Id,
    i_id: req.body.i_id,
  };

  sql = "INSERT INTO advisor SET ?";
  query = con.query(sql, instr, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send({ status: "success", message: "Info added" });
  });
});

//Department form
app.post("/department", (req, res) => {
  
  const profile = {
    dept_name: req.body.dept_name,
    building: req.body.building,
    budget: req.body.budget,
  };
  let sql = "INSERT INTO department SET ?";
  let query = con.query(sql, profile, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send({ status: "success", message: "Info added" });
  });
});

//Course form
app.post("/course", (req, res) => {
  

  const info = {
    course_id: req.body.course_id,
    title: req.body.title,
    dept_name: req.body.dept_name,
    credits: req.body.credits,
  };
  let sql = "INSERT INTO course SET ?";
  let query = con.query(sql, info, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send({ status: "success", message: "Info added" });
  });

  const pre = {
    course_id: req.body.course_id,
    prereq_id: req.body.prereq_id,
  };
  sql = "INSERT INTO prereq SET ?";
  query = con.query(sql, pre, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send({ status: "success", message: "Info added" });
  });
});

//Instructor form
app.post("/instructor", (req, res) => {

  const info = {
    ID: req.body.Id,
    name: req.body.name,
    dept_name: req.body.dept_name,
    salary: req.body.salary,
  };
  let sql = "INSERT INTO instructor SET ?";
  let query = con.query(sql, info, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send({ status: "success", message: "Info added" });
  });
});

//classroom form
app.post("/classroom", (req, res) => {
  

  const info = {
    building: req.body.building,
    capacity: req.body.capacity,
    room_number: req.body.room_number,
  };

  let sql = "INSERT INTO instructor SET ?";
  let query = con.query(sql, info, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send({ status: "success", message: "Info added" });
  });
});

//section form
app.post("/section", (req, res) => {
  const info = {
    course_id: req.body.course_id,
    sec_id: req.body.sec_id,
    semester: req.body.semester,
    year: req.body.year,
    building: req.body.building,
    room_number: req.body.room_number,
    time_slot_id: req.body.time_slot_id,
  };

  let sql = "INSERT INTO section SET ?";
  let query = con.query(sql, info, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send({ status: "success", message: "Info added" });
  });
});

//Time slot form
app.post("/timeslot", (req, res) => {
  const info = {
    time_slot_id: req.body.time_slot_id,
    day: req.body.day,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
  };

  let sql = "INSERT INTO section SET ?";
  let query = con.query(sql, info, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send({ status: "success", message: "Info added" });
  });
});

//teaches
app.post("/teaches", (req, res) => {
  const info = {
    ID: req.body.Id,
    course_id: req.body.course_id,
    sec_id: req.body.sec_id,
    semester: req.body.semester,
    year: req.body.year,
  };

  let sql = "INSERT INTO teaches SET ?";
  let query = con.query(sql, info, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send({ status: "success", message: "Info added" });
  });
});

//takes
app.post("/takes", (req, res) => {
  const info = {
    ID: req.body.Id,
    course_id: req.body.course_id,
    sec_id: req.body.sec_id,
    semester: req.body.semester,
    year: req.body.year,
    grade: req.body.grade,
  };

  let sql = "INSERT INTO takes SET ?";
  let query = con.query(sql, info, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send({ status: "success", message: "Info added" });
  });1
});

app.listen(port, () => {
  console.log("Listening at port:" + port);
});
