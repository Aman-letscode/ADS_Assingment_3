
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 4000;


app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());


//connectin to mysql server
const con = mysql.createConnection(
    {host: "localhost",
    user: "root",
    password: "1234",
    database: "university"}
)

con.connect( (err) => {
    if(err) throw err;
    console.log("connected");
})


//use for creating tables
app.get('/createTable',(req,res)=>{
    
    let sql = 'Show tables';
    con.query(sql, (err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send("Table created");
    })
})


//display of table
app.get('/showTable/:id/',(req,res)=>{
    
    let id = req.params.id;
    let sql = 'select * from '+id;

    //Running the query
    con.query(sql, (err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send({"status":"success","result":result});
    })
})




//Student form
app.post('/student',(req,res)=>{
    
    let id = req.body.Id;
    let name= req.body.name;
    let dept_name= req.body.dept_name;
    let tot_credit= req.body.tot_cred;
    
    const profile = {
        
        ID: id,
        name: name,
        dept_name: dept_name,
        tot_credit: tot_credit
    };
    let sql = "INSERT INTO student SET ?";
    let query = con.query(sql,profile, (err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send({"status":"success","message":"Info added"});
        
    })
    
})


//Department form
app.post('/department',(req,res)=>{
   
    let dept_name= req.body.dept_name;
    let building= req.body.building;
    let budget= req.body.budget;
    
    const profile = {
        dept_name: dept_name,
        building: building,
        budget: budget
    };
    let sql = "INSERT INTO department SET ?";
    let query = con.query(sql,profile, (err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send({"status":"success","message":"Info added"});
    }) 
})



//Course form
app.post('/course',(req,res)=>{
   
    let course_id= req.body.course_id;
    let title= req.body.title;
    let dept_name= req.body.dept_name;
    let credits= req.body.credits;
    
    const info = {
        course_id: req.body.course_id,
    title: req.body.title,
    dept_name: req.body.dept_name,
    credits: req.body.credits
    };
    let sql = "INSERT INTO course SET ?";
    let query = con.query(sql,info, (err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send({"status":"success","message":"Info added"});
    }) 
})



//Course form
app.post('/instructor',(req,res)=>{
   
    let id= req.body.course_id;
    let title= req.body.title;
    let dept_name= req.body.dept_name;
    let credits= req.body.credits;
    
    const info = {
        ID: req.body.Id,
    name: req.body.name,
    dept_name: req.body.dept_name,
    salary: req.body.salary
    };
    let sql = "INSERT INTO instructor SET ?";
    let query = con.query(sql,info, (err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send({"status":"success","message":"Info added"});
    }) 
})


//classroom form
app.post('/classroom',(req,res)=>{
   
    // let building= req.body.building;
    // let room_number= req.body.room_number;
    // let capacity= req.body.capacity;
    // let credits= req.body.credits;
    
    const info = {
        building: req.body.building,
    capacity: req.body.capacity,
    room_number: req.body.room_number,
    }
    
    let sql = "INSERT INTO instructor SET ?";
    let query = con.query(sql,info, (err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send({"status":"success","message":"Info added"});
    }) 
})



//section form
app.post('/section',(req,res)=>{
   
    
    const info = {
        course_id: req.body.course_id,
    sec_id: req.body.sec_id,
    semester: req.body.semester,
    year: req.body.year,
    building: req.body.building,
    room_number: req.body.room_number,
    time_slot_id: req.body.time_slot_id,
    
    }
    
    let sql = "INSERT INTO section SET ?";
    let query = con.query(sql,info, (err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send({"status":"success","message":"Info added"});
    }) 
})


//Time slot form
app.post('/section',(req,res)=>{
   
    
    const info = {
        time_slot_id: req.body.time_slot_id,
    day: req.body.day,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
    
    
    }
    
    let sql = "INSERT INTO section SET ?";
    let query = con.query(sql,info, (err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send({"status":"success","message":"Info added"});
    }) 
})

app.listen(port,()=>{
    console.log("Listening at port:"+port);
})