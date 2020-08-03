const multer = require('multer');

const directory = './express-server/public';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, directory);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName);
    }
});

const fileUploader = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
            cb(null, true);
        } else {
            cb(null, file);
            return cb(new Error('Please upload a .png, .jpg, or .jpeg image.'));
        }
    }
});

module.exports = { fileUploader };