const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 5000;


const app = express();
app.use(cors());
app.use(bodyParser.json());

const user0 = {
    id: 0,
    name: 'sammy',
    email: 'sam@gmail.com',
    password: '1234',
    joined: new Date(),
    balance: 5000
}

const users = [user0];

const createUser = (name, email, password) => {
    return {
        id: users.length,
        name: name,
        email: email,
        password: password,
        joined: new Date(),
        balance: users.length * 1000
    }
}

const getUser = (email, password) => {
    for(let user of users) {
        if (email === user.email && password === user.password) {
            return user;
        }
    }
    return {email: 'not found', password: 'none'};
}

app.post('/register', function (req, res) {
    console.log('register: ', users, req.body);
    if (req.body.email && req.body.password && req.body.password) {
        const newUser = createUser(req.body.name, req.body.email, req.body.password, )
        users.push(newUser);
        res.json('User registered succesfully');
    } else {
        res.json('Unable to register');
    }
})

app.post('/signin', function (req, res) {
    const user = getUser(req.body.email, req.body.password);
    if (req.body.email === user.email && req.body.password === user.password) {
        res.json(user);
    } else {
        res.json('Email and/or password are incorrect');
    }
    
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
