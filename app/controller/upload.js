
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
      console.log('files=>', ctx.request.body)
      const {source} = ctx.request.body;
      const file = ctx.request.files[0];
      const res = await ctx.helper.saveFile(file, true);
      const photo = await this.ctx.service.photo.create({
        path: res.path,
        width: res.width,
        height: res.height,
        thumb_path: res.thumbPath, // 缩略图路径
        thumb_width: res.thumbWidth,
        thumb_height: res.thumbHeight,
        source,
      });
      response.message = '上传成功！';
      response.data = res;
    } catch (error) {
      ctx.helper.handleCatchResponse(response, error);
    }
    ctx.helper.handleResponse(response, ctx);
  }

  async getPage() {
    const { ctx } = this;
    const response = new Response(0, null, null);
    const query = ctx.helper.handleQueryParams(ctx);
    try {
      const res = await ctx.service.photo.getPage(query);
      response.message = '查询成功！';
      response.data = res;
    } catch (error) {
      ctx.helper.handleCatchResponse(response, error);
    }
    ctx.helper.handleResponse(response, ctx);
  }

  async preview() {
    
  }
}

module.exports = UploadController;