// const jwt = require('jsonwebtoken');
import jwt from "jsonwebtoken"

// Use a strong secret key in a real application
const secretKey = 'franklinmazda922';

// User data to include in the token payload
const user = {
    _id: 'userId123',
    name: 'mazda',
    email: 'franklindery922@gmail.com'
};

// Generate a token
const token = jwt.sign({ id: user._id, name: user.name, email: user.email }, secretKey, {
    expiresIn: '30d',
});

console.log('Generated Token:', token);
