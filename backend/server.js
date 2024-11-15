const express = require("express")
const cors = require("cors")
const mysql = require("mysql")

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

app.post('/signup/membership', (req, res) => {
    const sql = "INSERT INTO membership (`name`, `email`, `subject`, `phoneNumber`, `message`) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [req.body.name, req.body.email, req.body.subject, req.body.phoneNumber, req.body.message], (err, result) => {
        if(err) {
            return res.json("Error");
        }
        return res.json(data);
    });
});

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?, ?, ?)";
    db.query(sql, [req.body.name, req.body.email, req.body.password], (err, data) => {
        if(err) {
            return res.json("Error");
        }
        return res.json(data);
    });
});


app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Check if the user exists in the database
    const query = 'SELECT * FROM login WHERE `email` = ? AND `password` = ?';
    db.query(query, [email, password], (err, results) => {

        if (results.length > 0) {
            res.json({ success: true, message: 'Welcome to OFBJP_USA' });
        } else {
            res.json({ success: false, message: 'Invalid email or password' });
        }
    });
});

app.post('/images', (req, res) => {
    const sql = 'SELECT url FROM images'; 
    return sql;
})

app.listen(5000, () => {
    console.log("listening")
})