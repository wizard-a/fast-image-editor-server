
'use strict';

module.exports = app => {
    const { STRING, INTEGER, DATE, DECIMAL } = app.Sequelize;

    const User = app.model.define('t_photo', {

        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        path: STRING(255),
        width: DECIMAL(10,4),
        height: DECIMAL(10,4),
        thumb_path: STRING(255), // 缩略图路径
        thumb_width: DECIMAL(10,4), // 缩略图宽度
        thumb_height:  DECIMAL(10,4),  // 缩略图高度
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
