
const fs = require('fs');
const path = require('path');
const resizeImg = require('resize-img');
const sizeOf = require('image-size');

const { getZoomImageSize } = require('../utils/util')

module.exports = {
    setModelValue(data, ctx) {
        const { user } = ctx.session;
        const userId = user ? user.id : 1;
        return {
            ...data,
            created_by: userId,
            updated_by: userId,
        }
    },
    /**
     * 
     * @param {*} file 
     * @param {*} thumbConfig 缩略图的配置，可以是boolean值，可以是一个对象，如果是对象可以配置大小{ width, height}
     * @returns 
     */
    saveFile(file, thumbConfig = false) {
        if (typeof thumbConfig === 'boolean' && thumbConfig) {
            thumbConfig = {
                width: 300,
                height: 300
            }
        }
        return new Promise((resolve, reject) => {
            try {
                // 读取文件
                fs.readFile(file.filepath, function (err, data) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    // 简单的判断文件后缀
                    let ext = file.filename.match(/\.(?:[a-zA-Z]+$)/);
                    // if (!ext) {
                    //     resolve(new Error("文件后缀不正确"));
                    //     return;
                    // }
                    // 给文件去个新名字，并写到服务器的资源文件路径
                    let tempFileName = new Date().getTime() + ext;
                    const relativePath = `upload/${tempFileName}`;
                    let tempUploadDir = path.resolve('./', relativePath);
                    fs.writeFile(tempUploadDir, data, async function (err) {
                        if (err) {
                            reject(err);
                            return;
                        }

                        if (thumbConfig) {
                            // 生成缩略图
                            const realThumbConfig = {
                                width: 128,
                                height: 128,
                                ...thumbConfig,
                            }
                            const size = sizeOf(data);
                            const {width, height} = getZoomImageSize(size.width, size.height, realThumbConfig.width, realThumbConfig.height)
                            
                            console.log('size',size, realThumbConfig.width, realThumbConfig.height);
                            realThumbConfig.width = width;
                            realThumbConfig.height = height;
                            console.log('real=>size', width, height);
                            const image = await resizeImg(data, realThumbConfig);
                           
                            const relativeThumbPath = `upload/thumb/${tempFileName}`;
                            let tempUploadDirThumb = path.resolve('./', relativeThumbPath);
                            fs.writeFile(tempUploadDirThumb, image, function (err) {
                                resolve({
                                    absolutePath: tempUploadDir,
                                    fileName: tempFileName,
                                    path: relativePath,
                                    width: size.width, 
                                    height: size.height,
                                    thumbPath: relativeThumbPath,
                                    thumbAbsolutePath: tempUploadDirThumb,
                                    thumbWidth: width,
                                    thumbHeight: height,
                                });
                            });
                        } else {
                            resolve({
                                absolutePath: tempUploadDir,
                                fileName: tempFileName,
                                path: relativePath,
                                width: size.width, 
                                height: size.height,
                            });
                        }

                    });



                });
            } catch (err) {
                reject(err);
            }
        });
    },
    getUserId() {
        const { user } = this.ctx.session;
        return user ? user.id : 1;
    },
    handleCatchResponse(response, error) {
        response.message = error.message;
        response.code = -1;
    },
    handleResponse(response, ctx) {
        ctx.body = response;
        ctx.status = 200;
    },
    handleQueryParams(ctx) {
        const { pageIndex, pageSize, orderKey, orderBy, ...other } = ctx.request.query;
        return {
            offset: (pageIndex - 1) * pageSize,
            limit: parseInt(pageSize, 10) || 10,
            orderKey: orderKey || 'created_at',
            orderBy: orderBy || 'DESC',
            ...other
        }
    }
}



