
const fs = require('fs');
const path = require('path');

module.exports = {
    setModelValue(data, ctx) {
        const {user} = ctx.session;
        const userId = user ? user.id : 1;
        return {
            ...data,
            created_by: userId,
            updated_by: userId,
        }
    },
    saveFile(file) {
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
                    fs.writeFile(tempUploadDir, data, function (err) {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve({
                            relativePath,
                            absolutePath: tempUploadDir,
                            fileName: tempFileName
                        });
                    });
                });
            } catch (err) {
                reject(err);
            }
        });
    },
    handleCatchResponse(response, error) {
        response.message = error.message;
        response.code = -1;
    },
    handleResponse(response, ctx) {
        ctx.body = response;
        ctx.status = 200;
    }
}



