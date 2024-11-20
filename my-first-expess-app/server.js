const express = require('express');
const path = require('path');

const app = express();
const PORT = 8080;

var users = [];
// Makes sure that express uses the public direction for the static files.
app.use(express.static(path.join(__dirname, 'public')));

// Basic route for the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) =>{
    res.send('<h1>This is the about page<h1/>')
});

// Reads the form submission. urlencoded automatically reads the url. 
app.post('/submit', express.urlencoded({extended: true}), (req, res) => {
    const {name, age} = req.body;
    res.send(`Received data:<br>Name: ${name}<br>Age: ${age}`);
})

app.get('/users-list', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'users.html'));
});

app.get('/users', (req, res) => {
    res.json(users);
})

app.post('/users', express.urlencoded({extended: true}), (req, res) => {
    const {name, age} = req.body;
    users.push({'name': name, 'age': age})
    res.redirect('/users-list');
});

app.listen(PORT, () => {
    console.log(`server running on port http://localhost:${PORT}`)
})