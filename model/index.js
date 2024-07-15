const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('task', 'root', 'yash@123', {
    host: 'localhost',
    logging: false,
    dialect: 'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});
try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.user = require('./user')(sequelize, DataTypes)
db.book = require('./Book')(sequelize, DataTypes)
db.bookIssue = require('./BookIssue')(sequelize, DataTypes)

db.user.hasMany(db.book, { foreignKey: 'userId' });
db.book.belongsTo(db.user, { foreignKey: 'userId' });

db.book.hasMany(db.bookIssue, { foreignKey: 'bookid' });
db.bookIssue.belongsTo(db.book, { foreignKey: 'bookid' });

db.user.hasMany(db.bookIssue, { foreignKey: 'userId' });
db.bookIssue.belongsTo(db.user, { foreignKey: 'userId' });

db.sequelize.sync({ force: false })

module.exports = db

// mdbhadani63@gmail.com