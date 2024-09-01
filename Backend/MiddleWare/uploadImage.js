// // // // // const multer = require("multer");
// // // // // const path = require("path");
// // // // // const fs = require("fs");
// // // // // const ApiError = require("../Utils/apiError");

// // // // // // Ensure the directories exist
// // // // // const ensureDirectoryExistence = (filePath) => {
// // // // //   const dirname = path.dirname(filePath);
// // // // //   if (!fs.existsSync(dirname)) {
// // // // //     fs.mkdirSync(dirname, { recursive: true });
// // // // //   }
// // // // // };

// // // // // // Set up storage for images
// // // // // const imageStorage = multer.diskStorage({
// // // // //   destination: (req, file, cb) => {
// // // // //     const uploadPath = path.join(__dirname, "../uploads/images");
// // // // //     ensureDirectoryExistence(uploadPath);
// // // // //     cb(null, uploadPath);
// // // // //   },
// // // // //   filename: (req, file, cb) => {
// // // // //     cb(null, Date.now() + path.extname(file.originalname));
// // // // //   },
// // // // // });

// // // // // const uploadImage = multer({ storage: imageStorage });

// // // // // exports.uploadSingleImage = uploadImage.single("image");
// // // // // // Set up storage for multiple images (same as above)
// // // // // const multipleImagesStorage = multer.diskStorage({
// // // // //   destination: (req, file, cb) => {
// // // // //     const uploadPath = path.join(__dirname, "../uploads/images");
// // // // //     ensureDirectoryExistence(uploadPath);
// // // // //     cb(null, uploadPath);
// // // // //   },
// // // // //   filename: (req, file, cb) => {
// // // // //     cb(null, Date.now() + path.extname(file.originalname));
// // // // //   },
// // // // // });

// // // // // const uploadMultipleImages = multer({ storage: multipleImagesStorage });

// // // // // exports.uploadMultipleImages = uploadMultipleImages.array("imagePaths", 5);
// // // // // // Set up storage for PDF files
// // // // // const pdfStorage = multer.diskStorage({
// // // // //   destination: (req, file, cb) => {
// // // // //     const uploadPath = path.join(__dirname, "../uploads/pdf");
// // // // //     ensureDirectoryExistence(uploadPath);
// // // // //     cb(null, uploadPath);
// // // // //   },
// // // // //   filename: (req, file, cb) => {
// // // // //     cb(null, Date.now() + path.extname(file.originalname));
// // // // //   },
// // // // // });

// // // // // const uploadPDF = multer({ storage: pdfStorage });

// // // // // exports.uploadSinglePDF = uploadPDF.single("pdf");
// // // // // const multer = require("multer");
// // // // // const path = require("path");
// // // // // const fs = require("fs");
// // // // // const ApiError = require("../Utils/apiError");

// // // // // // Ensure the directories exist
// // // // // const ensureDirectoryExistence = (filePath) => {
// // // // //   const dirname = path.dirname(filePath);
// // // // //   if (!fs.existsSync(dirname)) {
// // // // //     fs.mkdirSync(dirname, { recursive: true });
// // // // //   }
// // // // // };

// // // // // // Set up storage for different types of files
// // // // // const storage = multer.diskStorage({
// // // // //   destination: (req, file, cb) => {
// // // // //     let uploadPath = path.join(__dirname, "../uploads");

// // // // //     if (file.mimetype === "application/pdf") {
// // // // //       uploadPath = path.join(__dirname, "../uploads/pdf");
// // // // //     } else if (file.mimetype.startsWith("image/")) {
// // // // //       uploadPath = path.join(__dirname, "../uploads/images");
// // // // //     } else {
// // // // //       return cb(new ApiError("Invalid file type"), false);
// // // // //     }

// // // // //     ensureDirectoryExistence(uploadPath);
// // // // //     cb(null, uploadPath);
// // // // //   },
// // // // //   filename: (req, file, cb) => {
// // // // //     cb(null, Date.now() + path.extname(file.originalname));
// // // // //   },
// // // // // });

// // // // // const upload = multer({ storage });

// // // // // // Middleware for handling multiple images and a single PDF
// // // // // exports.uploadFiles = upload.fields([
// // // // //   { name: 'imagePaths', maxCount: 5 }, // For multiple images (max 5)
// // // // //   { name: 'pdf', maxCount: 1 }         // For a single PDF file
// // // // // ]);

// // // // // const multer = require("multer");
// // // // // const path = require("path");
// // // // // const fs = require("fs");
// // // // // const ApiError = require("../Utils/apiError");

// // // // // // Ensure the directories exist
// // // // // const ensureDirectoryExistence = (filePath) => {
// // // // //   const dirname = path.dirname(filePath);
// // // // //   if (!fs.existsSync(dirname)) {
// // // // //     fs.mkdirSync(dirname, { recursive: true });
// // // // //   }
// // // // // };

// // // // // // Set up storage for different types of files
// // // // // const storage = multer.diskStorage({
// // // // //   destination: (req, file, cb) => {
// // // // //     let uploadPath = path.join(__dirname, "../uploads");

// // // // //     if (file.mimetype === "application/pdf") {
// // // // //       uploadPath = path.join(__dirname, "../uploads/pdf");
// // // // //     } else if (file.mimetype.startsWith("image/")) {
// // // // //       uploadPath = path.join(__dirname, "../uploads/images");
// // // // //     } else {
// // // // //       return cb(new ApiError("Invalid file type"), false);
// // // // //     }

// // // // //     ensureDirectoryExistence(uploadPath);
// // // // //     cb(null, uploadPath);
// // // // //   },
// // // // //   filename: (req, file, cb) => {
// // // // //     cb(null, Date.now() + path.extname(file.originalname));
// // // // //   },
// // // // // });

// // // // // const upload = multer({ storage });
// // // // // console.log(storage)
// // // // // // Middleware for handling multiple images and a single PDF
// // // // // exports.uploadFiles = upload.fields([
// // // // //   { name: "imagePaths", maxCount: 5 }, // For multiple images (max 5)
// // // // //   { name: "pdf", maxCount: 2 }, // For a single PDF file
// // // // // ]);
// // // // const multer = require("multer");
// // // // const path = require("path");
// // // // const fs = require("fs");

// // // // // Ensure the directories exist
// // // // const ensureDirectoryExistence = (filePath) => {
// // // //   const dirname = path.dirname(filePath);
// // // //   if (!fs.existsSync(dirname)) {
// // // //     fs.mkdirSync(dirname, { recursive: true });
// // // //   }
// // // // };

// // // // // Set up storage for different types of files
// // // // const storage = multer.diskStorage({
// // // //   destination: (req, file, cb) => {
// // // //     let uploadPath = path.join(__dirname, "../uploads");
// // // //     console.log(file.mimetype  ,"upload1");

// // // //     if (file.mimetype == "application/pdf") {
// // // //       console.log(file.mimetype);
// // // //       uploadPath = path.join(__dirname, "../uploads/pdf");
// // // //     } else {
// // // //       return cb(new Error("Invalid file type pdf"), false);
// // // //     }

// // // //     if (file.mimetype.startsWith("image/")) {
// // // //       uploadPath = path.join(__dirname, "../uploads/images");
// // // //     } else {
// // // //       return cb(new Error("Invalid file type image"), false);
// // // //     }

// // // //     ensureDirectoryExistence(uploadPath);
// // // //     cb(null, uploadPath);
// // // //   },
// // // //   filename: (req, file, cb) => {
// // // //     cb(null, Date.now() + path.extname(file.originalname));
// // // //   },
// // // // });

// // // // const upload = multer({ storage });

// // // // // Middleware for handling multiple images and a single PDF
// // // // exports.uploadFiles = upload.fields([
// // // //   { name: "imagePaths", maxCount: 5 }, // For multiple images (max 5)
// // // //   { name: "pdf", maxCount: 1 }, // For a single PDF file
// // // // ]);
// // // const multer = require("multer");
// // // const path = require("path");
// // // const fs = require("fs");

// // // // Ensure the directories exist
// // // const ensureDirectoryExistence = (filePath) => {
// // //   const dirname = path.dirname(filePath);
// // //   if (!fs.existsSync(dirname)) {
// // //     fs.mkdirSync(dirname, { recursive: true });
// // //   }
// // // };

// // // // Storage configuration for images
// // // const imageStorage = multer.diskStorage({
// // //   destination: (req, file, cb) => {
// // //     const uploadPath = path.join(__dirname, "../uploads/images");
// // //     ensureDirectoryExistence(uploadPath);
// // //     cb(null, uploadPath);
// // //   },
// // //   filename: (req, file, cb) => {
// // //     cb(null, Date.now() + path.extname(file.originalname)); // Add a timestamp to avoid name conflicts
// // //   },
// // // });

// // // const uploadImages = multer({ storage: imageStorage }).array("imagePaths", 5); // Max 5 images
// // // exports.uploadImages = (req, res, next) => {
// // //   uploadImages(req, res, (err) => {
// // //     if (err) {
// // //       return res.status(400).send({ message: "Error uploading images", error: err.message });
// // //     }
// // //     next();
// // //   });
// // // };
// // // // Storage configuration for PDFs
// // // const pdfStorage = multer.diskStorage({
// // //   destination: (req, file, cb) => {
// // //     const uploadPath = path.join(__dirname, "../uploads/pdf");
// // //     ensureDirectoryExistence(uploadPath);
// // //     cb(null, uploadPath);
// // //   },
// // //   filename: (req, file, cb) => {
// // //     cb(null, Date.now() + path.extname(file.originalname)); // Add a timestamp to avoid name conflicts
// // //   },
// // // });

// // // const uploadPDF = multer({ storage: pdfStorage }).single("pdf"); // Single PDF file
// // // exports.uploadPDF = (req, res, next) => {
// // //   uploadPDF(req, res, (err) => {
// // //     if (err) {
// // //       return res.status(400).send({ message: "Error uploading PDF", error: err.message });
// // //     }
// // //     next();
// // //   });
// // // };

// // const multer = require("multer");
// // const path = require("path");
// // const fs = require("fs");

// // // Ensure the directories exist
// // const ensureDirectoryExistence = (filePath) => {
// //   const dirname = path.dirname(filePath);
// //   if (!fs.existsSync(dirname)) {
// //     fs.mkdirSync(dirname, { recursive: true });
// //   }
// // };

// // // Storage configuration for images
// // const imageStorage = multer.diskStorage({
// //   destination: (req, file, cb) => {
// //     const uploadPath = path.join(__dirname, "../uploads/images");
// //     ensureDirectoryExistence(uploadPath);
// //     cb(null, uploadPath);
// //   },
// //   filename: (req, file, cb) => {
// //     cb(null, Date.now() + path.extname(file.originalname));
// //   },
// // });

// // // Storage configuration for PDFs
// // const pdfStorage = multer.diskStorage({
// //   destination: (req, file, cb) => {
// //     const uploadPath = path.join(__dirname, "../uploads/pdf");
// //     ensureDirectoryExistence(uploadPath);
// //     cb(null, uploadPath);
// //   },
// //   filename: (req, file, cb) => {
// //     cb(null, Date.now() + path.extname(file.originalname));
// //   },
// // });

// // // Middleware for uploading multiple images
// // const uploadImages = multer({ storage: imageStorage }).array("imagePaths", 5); // Max 5 images

// // // Middleware for uploading a single PDF
// // const uploadPDF = multer({ storage: pdfStorage }).single("pdf");

// // // Function to wrap multer middleware in promises
// // const multerPromise = (middleware) => {
// //   return (req, res, next) => {
// //     middleware(req, res, (err) => {
// //       if (err) return next(err);
// //       next();
// //     });
// //   };
// // };

// // // Export the wrapped middleware
// // exports.uploadImages = multerPromise(uploadImages);
// // exports.uploadPDF = multerPromise(uploadPDF);

// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// // تأكد من وجود المجلدات
// // const ensureDirectoryExistence = (filePath) => {
// //   const dirname = path.dirname(filePath);
// //   if (!fs.existsSync(dirname)) {
// //     fs.mkdirSync(dirname, { recursive: true });
// //   }
// // };

// // تكوين التخزين للصور
// const imageStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = path.join(__dirname, "../uploads/images");
//     ensureDirectoryExistence(uploadPath);
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const pdfStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = path.join(__dirname, "../uploads/pdf");
//     // ensureDirectoryExistence(uploadPath);
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// exports.uploadImages = multer({ storage: imageStorage }).array("imagePaths", 5);

// exports.uploadPDF = multer({ storage: pdfStorage }).single("pdf");

const multer = require("multer");
const path = require("path");
const fs = require("fs");


const ensureDirectoryExistence = (filePath) => {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
};


const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../uploads/images");
    ensureDirectoryExistence(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const pdfStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../uploads/pdf");
    ensureDirectoryExistence(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

exports.uploadFiles = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      let uploadPath;
      if (file.mimetype === "application/pdf") {
        uploadPath = path.join(__dirname, "../uploads/pdf");
      } else if (file.mimetype.startsWith("image/")) {
        uploadPath = path.join(__dirname, "../uploads/images");
      } else {
        return cb(new Error("Invalid file type"), false);
      }
      ensureDirectoryExistence(uploadPath);
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  }),
}).fields([
  { name: "imagePaths", maxCount: 5 },
  { name: "pdf", maxCount: 1 },
]);
