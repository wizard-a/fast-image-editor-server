const Service = require('egg').Service;

class UserService extends Service {
  async find(uid) {
    const user = await this.ctx.db.query('select * from user where uid = ?', uid);
    return user;
  }

  async create(user) {
    const ctx = this.ctx;
    
    const { setModelValue } = ctx.helper;
    const newUser = await ctx.model.User.create(setModelValue(user, ctx));
    return newUser;
  }

  async getByUser(user) {
    const ctx = this.ctx;
    return await ctx.model.User.findOne({ where: user });
  }
}

module.exports = UserService;