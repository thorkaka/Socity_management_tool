const express = require("express");
const { json } = require("body-parser");
const mysql = require("mysql2");
const app = express();
app.use(json());
const cors = require("cors");
app.use(cors({
  origin:["http://localhost:3000"],
  methods:["POST","GET"],
  credentials:true
}));

// import session from "express-session";
// import cookieParser from "cookie-parser";

const session = require("express-session");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(
  session({
    secret: "server",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Ketan@3115",
  database: "socity_info",
});

conn.connect((err) => {
  if (err) {
    console.log("error in sql  can not connect...... :(");

    console.log(err);
  } else {
    console.log("connection sucess with mysql...  :)");
  }
});

app.get("/api/member", (req, res) => {
  var sql = "SELECT * FROM socity_member";
  conn.query(sql, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/api/complain", (req, res) => {
  var sql = "SELECT * FROM socity_complian";
  conn.query(sql, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/api/addcomplain", (req, res) => {
  const sql =
    "INSERT INTO socity_complian (`user_id`,`com_heading`,`com_desc`) VALUES(?)";
  const addcomplain = [
    req.body.user_id,
    req.body.com_heading,
    req.body.com_desc,
  ];
  conn.query(sql, [addcomplain], (err, result) => {
    if (err) {
      console.log("error in push data to database", err);

      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/api/addnotice", (req, res) => {
  const sql =
    "INSERT INTO socity_notice (`notice_heading`,`notice_type`,`notice_date`,`notice_message`) VALUES(?)";
  const addnotice = [
    req.body.notice_heading,
    req.body.notice_type,
    req.body.notice_date,
    req.body.notice_message,
  ];
  conn.query(sql, [addnotice], (err, result) => {
    if (err) {
      console.log("error in push data to database", err);

      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/api/notice", (req, res) => {
  var sql = "SELECT * FROM socity_notice";
  conn.query(sql, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});
app.post("/api/addmember", (req, res) => {
  const sql =
    "INSERT INTO socity_member (`user_id`,`user_name`,`user_email`,`user_mobile`,`user_passwordl`) VALUES(?)";
  const addmember = [
    req.body.user_id,
    req.body.user_name,
    req.body.user_email,
    req.body.user_mobile,
    req.body.user_passwordl,
  ];
  conn.query(sql, [addmember], (err, result) => {
    if (err) {
      console.log("error in push data to database", err);
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/api/login", (req, res) => {
  const sql =
    "SELECT * FROM socity_member WHERE user_name=? or user_passwordl=?";
  conn.query(
    sql,
    [req.body.user_name, req.body.user_passwordl],
    (err, result) => {
      if (err) {
        console.log("error in to featch data to database", err);
      }
      if (result.length > 0) {
        if (result[0].user_name == req.body.user_name) {
          if (result[0].user_passwordl == req.body.user_passwordl) {
            // console.log("result", result[0]);

            req.session.member = result[0].user_name;
            req.session.uid = Number(result[0].user_id);
            console.log('session add',req.session.member);
            
            return res.json({ Login: true  });
          } else {
            return res.json({ username: true, password: false });
          }
        } else {
          return res.json({ username: false });
        }
      } else {
        return res.json({ Login: false });
      }
      // else{
      //   console.log('result data is',result.length);

      // res.send(result)
      // }
    }
  );
});

app.get("/Dashbord",(req,res)=>{
  // console.log('session',req.session.member);
  if(req.session.member){
    return res.json({valid :true , member: req.session.member, uid:req.session.uid});
  }else{
    return res.json({valid:false});
  }
})

app.post("/api/adminlogin", (req, res) => {
  const sql =
    "SELECT * FROM socity_admin WHERE admin_name=? or admin_passwordl=?";
  conn.query(
    sql,
    [req.body.admin_name, req.body.admin_passwordl],
    (err, result) => {
      if (err) {
        console.log("error in to featch data to database", err);
      }

      if (result.length > 0) {
        if (result[0].admin_name == req.body.admin_name) {
          if (result[0].admin_passwordl == req.body.admin_passwordl) {
            // console.log("result", result[0]);

            req.session.member = result[0].admin_name;
            
            // console.log('session add',req.session.member);
            
            return res.json({ Login: true  });
          } else {
            return res.json({ username: true, password: false });
          }
        } else {
          return res.json({ username: false });
        }
      } else {
        return res.json({ Login: false });
      }
    
    }
  );
});



app.listen(5000, (err) => {
  if (err) {
    console.log("Error occors.. :(", err);
  } else {
    console.log("connected sucessfull in 5000 port.. :)");
  }
});

// main pipe line is leak so that water will lost very much solve this problem as soon as possible.
