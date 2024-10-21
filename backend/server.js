const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Ensure unique filenames
    },
});
const upload = multer({ storage: storage });

// Load users data from JSON file
const loadUsersData = () => {
    if (!fs.existsSync('users.json')) {
        fs.writeFileSync('users.json', JSON.stringify([]));
    }
    const data = fs.readFileSync('users.json');
    return JSON.parse(data);
};

// Save users data to JSON file
const saveUsersData = (data) => {
    fs.writeFileSync('users.json', JSON.stringify(data, null, 2));
};

// Middleware for authentication
const authenticateJWT = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (token) {
        jwt.verify(token, 'secretkey', (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

// Registration route
app.post('/api/register', upload.fields([{ name: 'image' }, { name: 'cv' }]), (req, res) => {
    const { firstName, lastName, username, email, password, gender, hobbies, brief, dateOfBirth, favoriteColor } = req.body;

    // Validation checks
    if (!firstName || !lastName || !username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const users = loadUsersData();

    const newUser = {
        firstName,
        lastName,
        username,
        email,
        password: hashedPassword,
        gender,
        hobbies: hobbies ? hobbies.split(',') : [],
        brief,
        dateOfBirth,
        favoriteColor,
        image: req.files['image'][0]?.path, // Optional chaining
        cv: req.files['cv'][0]?.path, // Optional chaining
    };

    users.push(newUser);
    saveUsersData(users);
    res.status(201).json({ message: 'User registered successfully' });
});

// Login route
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    const users = loadUsersData();
    const user = users.find(u => u.email === email);

    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ username: user.username }, 'secretkey', { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Profile route
app.get('/api/profile', authenticateJWT, (req, res) => {
    const users = loadUsersData();
    const user = users.find(u => u.username === req.user.username);
    
    if (user) {
        res.json(user);
    } else {
        res.sendStatus(404);
    }
});

// Home route (for demonstration)
app.get('/api/home', authenticateJWT, (req, res) => {
    res.json({ message: 'Welcome to the Home page!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
