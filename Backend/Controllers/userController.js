const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const ApiError = require("../Utils/apiError");
const UserModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const { uploadFiles } = require("../MiddleWare/uploadImage");

exports.signup = [
  uploadFiles,
  asyncHandler(async (req, res, next) => {
    console.log("Request body:", req.body);
    const { name, email, password } = req.body;
    console.log(req.body);

    const images = req.files["imagePaths"].map((file) => {
      return file.filename;
    });

    if (!email) {
      return next(new ApiError("Invalid email Or password wallahy", 401));
    }
    const user = await UserModel.create({
      name,
      email,
      password,
      imagePaths: images,
    });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIR_TIME,
    });

    return res.status(200).json({ data: user, token });
  }),
];

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  const user = await UserModel.findOne({
    email,
  });

  const hashPassword = await bcrypt.compare(password, user.password);

  console.log(hashPassword);

  if (!user || !hashPassword) {
    return next(new ApiError("Invalid email Or password wallahy", 401));
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIR_TIME,
  });

  res.status(200).json({ data: user, token });
});
exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  console.log(req.headers);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    console.log(token);
  }
  if (!token) {
    return next(
      new ApiError(
        `you are not login to, please login to get access this part`,
        401
      )
    );
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  console.log(decoded);
  const currentUser = await UserModel.findOne({ _id: decoded.userId });
  if (!currentUser) {
    return next(new ApiError("the user is not logged in"));
  }
  if (currentUser.PasswordChangeedAt) {
    const passwordChangedTimestamp = parseInt(
      currentUser.PasswordChangeedAt.getTime() / 1000,
      10
    );
    if (passwordChangedTimestamp > decoded.iat) {
      return next(
        new ApiError(" User recently changed password . Please login again.. ")
      );
    }
  }

  req.UserModel = currentUser;
  next();
});

exports.isAdmin = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findOne({ isAdmin: true });
  console.log(user);
  if (!user) {
    return next(new ApiError("you must be an admin to continue"));
  }
  if (user.isAdmin) {
    console.log("user is Admin go  ");
  }
  next();
});
