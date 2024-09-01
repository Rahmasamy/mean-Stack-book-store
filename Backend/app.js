const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");

const bookRoute = require("./Router/bookRoute");
const categoryRoutes = require("./Router/categoryRoute");
const autherRoute = require("./Router/autherRoute");
const userAuthenticateRoute = require("./Router/userAuthenticateRoute");
const usersRoute = require("./Router/usersRoute");
const signUpAndLoginRoute = require("./Router/signUpAndLoginRoute");
const userOprationsRoute = require("./Router/userOprationsRoute");
const dbConnection = require("./config/database");
const globalErrors = require("./MiddleWare/errorMiddleware");

dotenv.config({ path: "config.env" });
dbConnection();

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "uploads")));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log("Running");
}

app.use("/api/bookstore/authors", autherRoute);
app.use("/api/bookstore/books", bookRoute);
app.use("/api/bookstore/categories", categoryRoutes);
app.use("/api/bookstore/user", userAuthenticateRoute);

app.use("/api/user/books", userOprationsRoute);

app.use("/api/userAuth", signUpAndLoginRoute);
app.use("/api", usersRoute);

app.use(globalErrors);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection error: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error("Shutting down app...");
    process.exit(1);
  });
});
