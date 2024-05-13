//app.js
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// setting the session middleware
app.use(session({
    secret: 'gfg-key',
	resave: false,
	saveUninitialized: true
}));
// setting bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Serve Static Files
app.use(express.static('public'));

// users
const users = {
    'admin' : 'password123',
    'user1' : 'hackme'
}

// get session in the /get route
app.get('/get', (req, res) => {
	// retrieve the session variable
	const user = req.session.user || 'No session set';
	res.send(`Session variable: ${user}`);
});

// login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // TODO: REMOVE LOGS
    console.log(username);
    console.log(password);
    if (users[username] && users[username] === password) {
        req.session.user = username;
        res.send(`Hey Geek! Session is set! Now Go to 
		<a href="/get">/get</a> to retrieve the session.`);
    } else {
        res.status(401).send('Invalid Login!');
      }
});

// Logout Route
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.send('Logout erfolgreich');
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});