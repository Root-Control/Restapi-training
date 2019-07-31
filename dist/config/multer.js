"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = require("multer");
const path_1 = require("path");
const server_constants_1 = require("../server.constants");
const multerS3 = require("multer-s3");
const aws_sdk_1 = require("aws-sdk");
const environment_variables_1 = require("../environment.variables");
let environmentService = new environment_variables_1.EnvironmentService('.env');
let storage;
if (environmentService.get('NODE_ENV') === 'production') {
    aws_sdk_1.config.update({
        accessKeyId: server_constants_1.SERVER_CONFIG.awsKey,
        secretAccessKey: server_constants_1.SERVER_CONFIG.awsSecret
    });
    let s3 = new aws_sdk_1.S3();
    storage = multerS3({
        s3: s3,
        bucket: 'thelinkstore',
        acl: 'public-read'
    });
}
else {
    storage = multer_1.diskStorage({
        destination: './public/uploads',
        filename: (req, file, cb) => {
            const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
            cb(null, `${randomName}${path_1.extname(file.originalname)}`);
        }
    });
}
const MulterConfig = {
    storage: storage
};
exports.MulterConfig = MulterConfig;
//# sourceMappingURL=multer.js.map