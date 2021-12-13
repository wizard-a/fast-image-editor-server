'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;

  router.get('/', controller.home.index);

  /**
   * user router begin
   */
  
  // 登录
  router.post('/api/user/login', controller.user.login);

  // 注册
  router.post('/api/user/reg', controller.user.reg);

  // 获取用户列表
  router.get('/api/user/list', jwt, controller.user.list);

  /**
   * user router end
   */


  /**
   * upload router begin
   */
  // 上传图片
  router.post('/api/upload', jwt, controller.upload.upload);

  // 分页获取数据
  router.get('/api/upload/getPage', jwt, controller.upload.getPage);

  /**
   * upload router end
   */

};
