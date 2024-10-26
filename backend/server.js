const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads')); 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); 
    },
});
const upload = multer({ storage: storage });

const loadUsersData = () => {
    if (!fs.existsSync('users.json')) {
        fs.writeFileSync('users.json', JSON.stringify([]));
    }
    const data = fs.readFileSync('users.json');
    return JSON.parse(data);
};

const saveUsersData = (data) => {
    fs.writeFileSync('users.json', JSON.stringify(data, null, 2));
};



const authenticateJWT = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (token && !tokenBlacklist.includes(req.headers['authorization'])) {
        jwt.verify(token, 'secretkey', (err, user) => {
            if (err) {
                return res.status(403).send("Error: forbidden");
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).send('Error: Unauthorized');
    }
};

app.post('/api/register', upload.fields([{ name: 'image' }, { name: 'cv' }]), (req, res) => {
    const { firstName, lastName, username, email, password ,phone, address, city, state, zipCode, gender, brief, dateOfBirth, favoriteColor } = req.body;

    if (!firstName || !lastName || !username || !email || !password ) {
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
        phone,
        address, 
        city, 
        state, 
        zipCode,
        gender,
        brief,
        dateOfBirth,
        favoriteColor,
        image: req.files['image'][0]?.path, 
        cv: req.files['cv'][0]?.path, 
    };

    users.push(newUser);
    saveUsersData(users);
    res.status(201).json({ message: 'User registered successfully' });
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    const users = loadUsersData();
    const user = users.find(u => u.email === email);

    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ username: user.username }, 'secretkey', { expiresIn: '1h' });
        res.json({ token, firstName: user.firstName });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

app.get('/api/profile', authenticateJWT, (req, res) => {
    const users = loadUsersData();
    const user = users.find(u => u.username === req.user.username);
    
    if (user) {
        res.json(user);
    } else {
        res.sendStatus(404);
    }
});

app.get('/api/home', authenticateJWT, (req, res) => {
    res.json({ message: 'Welcome to the Home page!' });
});

const counterFilePath = path.join(__dirname, 'counter.json');

const getCounter = () => {
    const data = fs.readFileSync(counterFilePath);
    const counter = JSON.parse(data);
    return counter.count;
}

const updateCounter = (newValue) => {
    const counter = { count: newValue };
    fs.writeFileSync(counterFilePath, JSON.stringify(counter));
    return counter.count;
}

app.get('/api/counter', (req, res) => {
    const currentCount = getCounter();
    res.json({ count: currentCount });
});

app.post('/api/counter/increment', (req, res) => {
    const currentCount = getCounter();
    const newCount = updateCounter(currentCount + 1);
    res.json({ count: newCount });
});

app.post('/api/counter/decrement', (req, res) => {
    const currentCount = getCounter();
    const newCount = updateCounter(currentCount - 1);
    res.json({ count: newCount });
});

let tokenBlacklist = [];

app.post('/api/logout', authenticateJWT, (req, res) => {
    tokenBlacklist.push(req.headers['authorization']);
    res.sendStatus(204); 
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
