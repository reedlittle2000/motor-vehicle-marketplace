const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();  // Declare app only once
const port = 3000;

// Temporary user data (use a database in production)
const users = {
    seller1: 'password123',
    seller2: 'sellercar2024'
};

// Middleware to parse form data and JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (css, js, images, etc.) from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// -------- ROUTES -----------
// Serve the Landing Page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle Seller Login (POST request)
app.post('/seller-login', (req, res) => {
    const { username, password } = req.body;

    if (users[username] && users[username] === password) {
        res.redirect('/dashboard');  // Redirect to dashboard if login is valid
    } else {
        res.send('<h1>Login Failed</h1><p>Invalid username or password. <a href="/">Try Again</a></p>');
    }
});

// Serve the Dashboard Page (after successful login)
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Serve the Marketplace Page (Customer Side)
app.get('/marketplace', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'marketplace.html'));
});

// ----------------------------
// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
