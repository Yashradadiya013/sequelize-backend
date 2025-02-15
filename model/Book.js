const d = require('../model/index');

module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define('Books', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        bookName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        course: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sem: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        timestamps: false,
    });

    return Book;
};
