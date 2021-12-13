/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1631095514447_4604';

  // add your middleware config here
  config.middleware = [];

  config.sequelize = {
    dialect: 'mysql',
    // host: '192.168.1.105',
    host: '39.97.252.98',
    port: 3306,
    database: 'fast_image_editor',
    username: 'image',
    password: 'image'
  };

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    }
  }

  config.jwt = {
    secret: "123456"//自定义 token 的加密条件字符串
  };

  config.cors = {
    origin:'*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };

  config.multipart = {
    mode: 'file',
  };

  console.log('appInfo.baseDir=>', path.join(appInfo.baseDir, '/upload'));
  config.view = {
    root: path.join(appInfo.baseDir, '/upload'),
  }

  config.onerror = {
    json(err, ctx) {
      // json hander
      ctx.body = { message: err.message, code: '-1' };
      ctx.status = 200;
    },
  }
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',

  };

  return {
    ...config,
    ...userConfig,
  };
};
