
'use strict';

module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;

    const User = app.model.define('t_photo', {

        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        path: STRING(255),
        type: STRING(25),
        source: INTEGER,
        pwd: STRING,
        created_by: {
            type: INTEGER,
        },
        created_at: DATE,
        updated_by: {
            type: INTEGER,
        },
        updated_at: DATE,
    }, {
        freezeTableName: true
    });

    return User;
};
