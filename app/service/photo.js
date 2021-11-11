const Service = require('egg').Service;

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
}

module.exports = PhotoService;