const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "student_db"
});

db.connect(err => {
    if (err) throw err;
    console.log("MySQL Connected");
});

// READ
app.get("/students", (req, res) => {
    db.query("SELECT * FROM students", (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// CREATE
app.post("/students", (req, res) => {
    const { name, department } = req.body;
    db.query(
        "INSERT INTO students (name, department) VALUES (?, ?)",
        [name, department],
        () => res.send("Student Added")
    );
});

// DELETE
app.delete("/students/:id", (req, res) => {
    db.query(
        "DELETE FROM students WHERE id = ?",
        [req.params.id],
        () => res.send("Student Deleted")
    );
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
