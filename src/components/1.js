const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // 设置上传路径，可以根据实际情况进行修改
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        // 设置上传文件的名称，可以根据实际情况进行修改
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), function (req, res, next) {
    // 返回上传成功的文件名
    res.json({ filename: req.file.filename });
});

app.listen(3000, function () {
    console.log('Server listening on port 3000');
});
