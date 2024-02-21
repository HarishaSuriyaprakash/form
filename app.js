const express = require('express');
const mysql = require("mysql2");
const path = require("path");
const app = express();
const bodyParser = require('body-parser');
const hbs = require("hbs");

app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Root@123',
    database: 'regform', 
});

db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('success');
    }
});

const location = path.join(__dirname, "./public");
app.use(express.static(location));
app.set("view engine", "hbs");
app.get("/", (req, res) => {
    res.render('index');
});

app.post('/submit', (req, res) => {
    const { employeeName, employeeId, department, dob, gender, designation, salary } = req.body;

    console.log("Submitted data:", { employeeName, employeeId, department, dob, gender, designation, salary});

    const sql = "INSERT INTO emp (employeeName, employeeId, department, dob, gender, designation, salary ) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [employeeName, employeeId, department, dob, gender, designation, salary ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error storing form data in the database:", err);
            res.status(500).send("Error storing form data in the database");
        } else {
            console.log("Form data stored in the database");
            res.status(200).send("Form data stored successfully");
        }
    });
});

app.listen(3001, () => {
    console.log("server started @ port 3001");
});