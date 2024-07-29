const moment = require('moment');
module.exports = (sequelize, DataTypes) => {
    const BookIssue = sequelize.define('bookIssues', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        bookId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Books', // Name of the table
                key: 'id',
            }
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users', // Name of the table
                key: 'id',
            }
        },
        issuedate: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                return moment(this.getDataValue('issuedate')).format('YYYY-MM-DD')
            }
        },
        submitiondate: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                return moment(this.getDataValue('submitiondate')).format('YYYY-MM-DD')
            }
        }
    }, {
        timestamps: false,
    }
    )
    return BookIssue
}