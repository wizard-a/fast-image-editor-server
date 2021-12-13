const Service = require('egg').Service;
const { Op } = require("sequelize");

class PhotoService extends Service {

  async create(photo) {
    const ctx = this.ctx;
    
    const { setModelValue } = ctx.helper;
    const newUser = await ctx.model.Photo.create(setModelValue(photo, ctx));
    return newUser;
  }

  async getByUser(user) {
    const ctx = this.ctx;
    return await ctx.model.Photo.findOne({ where: user });
  }

  async getPage({offset, limit, orderKey, orderBy, ...params}) {
    const {ctx} = this;
    const userId = ctx.helper.getUserId();
    return await ctx.model.Photo.findAndCountAll({
      where: {
        source: params.source || 1,
        created_by: userId,
      },
      order: [
        [orderKey, orderBy],
      ],
      offset,
      limit,
    })

  }
}

module.exports = PhotoService;