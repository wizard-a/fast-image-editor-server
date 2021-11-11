
'use strict';
const Response = require('../utils/response');
const Controller = require('egg').Controller;


class UploadController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async upload() {
    const { ctx } = this;
    const response = new Response(0, null, null);
    // const name = 'egg-multipart-test/' + path.basename(file.filename);
    try {
      // console.log('files=>', ctx.request.files)
      const file = ctx.request.files[0];
      const res = await ctx.helper.saveFile(file);
      const photo = await this.ctx.service.photo.create({
        path: res.relativePath,
        source: 2,
      });
      response.message = '上传成功！';
      response.data = res;
    } catch (error) {
      ctx.helper.handleCatchResponse(response, error);
    }
    ctx.helper.handleResponse(response, ctx);
  }
}

module.exports = UploadController;