const bcrypt = require('bcrypt');
const User = require('../models/users');

const userData = [
  {
    name: 'Manager User',
    email: 'manager@example.com',
    password: bcrypt.hashSync('password123', 10),
  },
  {
    name: 'Client User',
    email: 'client@example.com',
    password: bcrypt.hashSync('password456', 10),
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;