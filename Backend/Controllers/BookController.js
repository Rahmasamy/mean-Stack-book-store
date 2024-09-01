const BookModle = require("../Models/bookModle");
const asyncHandler = require("express-async-handler");
const { uploadFiles } = require("../MiddleWare/uploadImage");
// const { uploadPDF, uploadImages } = require("../MiddleWare/uploadImage");

// C R U D Operations

exports.getAllBooks = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 5;
  const skip = (page - 1) * limit;

  const books = await BookModle.find({}).skip(skip).limit(limit);
  const count = await BookModle.countDocuments({});

  res.status(200).json({ count, page, data: books });
});
// get book by id
exports.getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await BookModle.findById(id);
    return res.status(200).json({
      count: book.length,
      data: book,
    });
  } catch (error) {
    res.status(500).send({ "error message: ": error.message });
  }
};

exports.getBooksByCategoryId = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await BookModle.find({ Category_id: id });
    return res.status(200).json({
      count: book.length,
      data: book,
    });
  } catch (error) {
    res.status(500).send({ "error message: ": error.message });
  }
};

exports.getBooksByAuthorId = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await BookModle.find({ Author_id: id });
    return res.status(200).json({
      count: book.length,
      data: book,
    });
  } catch (error) {
    res.status(500).send({ "error message: ": error.message });
  }
};


exports.createBook = [
  uploadFiles,
  async (req, res) => {
    console.log("Request Files:", req.files);
    console.log("Request Body:", req.body);

    try {
      // if (!req.body.Author_id || !req.body.Category_id || !req.body.title) {
      //   return res.status(400).send({ message: "All fields must be required" });
      // }
      let pdf;
      // let pdf2 = req.files["pdf"];
      const images =
        req.files["imagePaths"].map((file) => {
    
         return  file.filename;
        })

      const newBook = {
        title: req.body.title,
        imagePaths: images,
        Author_id: req.body.Author_id,
        Category_id: req.body.Category_id,
        Category: req.body.Category,
        Author: req.body.Author,
        status: req.body.status,
        rating: req.body.rating,
        desc: req.body.desc,
        reviews: req.body.reviews,
        pdf: pdf,
        userRating: req.body.userRating,
      };

      const book = await BookModle.create(newBook);
      return res.status(201).json({ data: book });
    } catch (err) {
      console.error("Error creating book:", err.message);
      return res.status(500).send({ "error message": err.message });
    }
  },
];

// update book
exports.updateBook = [
  uploadFiles,
  async (req, res) => {
  try {
    // if (
    //   (!req.body.Author_id,
    //   !req.body.Category_id,
    //   !req.body.img,
    //   !req.body.title)
    // ) {
    //   return res.status(400).send({ message: "All fields must be required " });
    // }
    const images =req.files["imagePaths"].map((file) => {
      if (file.filename.includes("pdf")) {
        pdf = file.filename;
      } else {
        return file.filename;
      }
    }) || [];
    const { id } = req.params;
    const result = await BookModle.findByIdAndUpdate(id, 
      
      {...req.body,imagePaths:images}
    );
    if (!result) {
      return res.status(400).send({ message: "Not found book with that id " });
    }
    return res.status(200).send({ message: "Book Update Succesfully" });
  } catch (error) {
    console.log("error");
    res.status(500).send({ "error message: ": error.message });
  }
}];
exports.DeleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await BookModle.findByIdAndDelete(id);
    if (!result) {
      return res.status(400).send({ message: "Book Not Found" });
    }

    return res.status(200).send({ message: "Book is deleted Succesfully" });
  } catch (error) {
    res.status(500).send({ "error message: ": error.message });
  }
};
