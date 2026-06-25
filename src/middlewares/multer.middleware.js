// import multer from "multer";
// import path from "path";

// const storage = multer.diskStorage({

//     destination: function(req, file, cb){
//         cb(null, "public/temp");
//     },

//     filename: function(req, file, cb){
//         cb(
//             null,
//             `${Date.now()}-${Math.random()}${path.extname(file.originalname)}`
//         );
//     }
// });

// const upload = multer({
//     storage
// });

// export default upload;

import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = path.join(
    process.cwd(),
    "public",
    "temp"
);

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, {
        recursive: true
    });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },

    filename: function (req, file, cb) {
        cb(
            null,
            `${Date.now()}-${Math.random()}${path.extname(file.originalname)}`
        );
    }
});

export default multer({ storage });