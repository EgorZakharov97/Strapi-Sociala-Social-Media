const mime = require('mime-types')
const fs = require('fs')
const rootDir = process.cwd();

module.exports = {
    uploadFile: (fileBlob) => {
        const extension = fileBlob.name.split('.')[1];
        const fileName = `${Date.now()}.${extension}`;
        const filePath = fileBlob.path;
        const stats = fs.statSync(fileBlob.path);

        return strapi.plugins.upload.services.upload.upload({
            data:{}, //mandatory declare the data(can be empty), otherwise it will give you an undefined error.
            files: {
                path: filePath, 
                name: fileName,
                type: mime.lookup(filePath), // mime type of the file
                size: stats.size,
            },
        });
    }
}