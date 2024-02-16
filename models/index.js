const Equipment = require('./equipment');
const Reservation = require('./reservations');
const User = require('./users');

// Define associations between models if needed
// If a reservation belongs to a user
User.hasMany(Reservation, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

Reservation.belongsTo(User, {
  foreignKey: 'userId',
});

// If a reservation is associated with equipment
Equipment.hasMany(Reservation, {
  foreignKey: 'equipmentId',
});

Reservation.belongsTo(Equipment, {
  foreignKey: 'equipmentId',
});

// Export the models 

module.exports = {
  Equipment,
  Reservation,
  User,
};