const { text } = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('task', 'root', 'yash@123', {
    host: 'localhost',
    logging: false,
    dialect: 'mysql',
});

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user')(sequelize, DataTypes);
db.book = require('./Book')(sequelize, DataTypes);
db.bookIssue = require('./BookIssue')(sequelize, DataTypes);

// Define relationships
// db.user.hasMany(db.bookIssue, { foreignKey: 'userId' },);
// db.bookIssue.belongsTo(db.user, { foreignKey: 'userId' });

// db.book.hasMany(db.bookIssue, { foreignKey: 'bookId' });
// db.bookIssue.belongsTo(db.book, { foreignKey: 'bookId' });

db.book.belongsToMany(db.user, { through: db.bookIssue, foreignKey: 'bookId' });
db.user.belongsToMany(db.book, { through: db.bookIssue, foreignKey: 'userId' });

// db.bookIssue.belongsTo(db.book,{foreignKey:'bookId'})
// db.bookIssue.belongsTo(db.user,{foreignKey:'userId'})


db.sequelize.sync({ force: false });

module.exports = db;
