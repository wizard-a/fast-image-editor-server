
'use strict';
const bcrypt = require('bcrypt');

const Response = require('../utils/response');

const Controller = require('egg').Controller;

class UserController extends Controller {
    async login() {
        const { ctx, app } = this;
        const { login_name, pwd } = ctx.request.body;

        const response = new Response(0, null, null);
        try {
            // const bcryptPwd = 
            // 查找用户
            const currUser = await this.ctx.service.user.getByUser({ login_name });
            if (!currUser) {
                response.code = -1;
                response.message = '用户名不存在！';
                
            } else {
                const userPwd = currUser.pwd;
                const isEqual = await bcrypt.compare(pwd, userPwd);
                console.log('isEqual==>', isEqual)
                if (!isEqual) {
                    response.code = -1;
                    response.message = '密码不正确！';
                } else {
                    const token = app.jwt.sign({
                        username: login_name, //需要存储的 token 数据
                    }, app.config.jwt.secret);

                    response.data = {
                        user: currUser,
                        token: token,
                    }
                    ctx.session = response.data;
                    response.message = '登录成功!';
                }
            }

        } catch (error) {
            response.message = error.message;
            response.code = -1;
        }

        ctx.body = response;
        ctx.status = 200;
    }

    async create() {
        const { ctx } = this;
        const body = ctx.request.body;
        const user = await this.ctx.service.user.create(body)
        ctx.body = user;
    }

    async reg() {
        const { ctx } = this;
        const { body: { login_name, pwd, ...otherData } } = ctx.request;
        const response = new Response(0, null, null);
        try {
            const user = await this.ctx.service.user.getByUser({ login_name });
            if (user) {
                response.code = -1;
                response.message = '用户名称已存在，请换个用户名！';
            } else {
                // 生成密码
                const bcryptPwd = await bcrypt.hash(pwd, 10);
                const createUser = await this.ctx.service.user.create({
                    login_name,
                    pwd: bcryptPwd,
                    ...otherData
                })
                response.message = '用户创建成功！';
                response.data = createUser;
            }

        } catch (error) {
            console.log('error=>', error);
            response.message = error.message;
            response.code = -1;
        }
        ctx.body = response;
        ctx.status = 200;
    }


    async list() {
        const { ctx } = this;
        console.log('session=>', ctx.session)
        ctx.body = 'list';
        ctx.status = 200;
    }
}

module.exports = UserController;
