
'use strict';

module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;

    const User = app.model.define('t_photo', {

        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        path: STRING(255),
        type: STRING(25),
        source: INTEGER,
        created_by: {
            type: INTEGER,
        },
        created_at: {
            type: DATE,
            underscored: true
        },
        updated_by: {
            type: INTEGER,
        },
        updated_at: DATE,
    }, {
        freezeTableName: true,
        createdAt: false,
        updatedAt: false,
    });

    return User;
};
