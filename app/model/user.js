
'use strict';

module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;

    const User = app.model.define('t_users', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        login_name: STRING(25),
        pwd: STRING,
        name: STRING(30),
        status: INTEGER,
        valid_time: Date,
        created_by: {
            type: INTEGER,
        },
        created_at: DATE,
        updated_by: {
            type: INTEGER,
        },
        updated_at: DATE,
    });

    return User;
};
