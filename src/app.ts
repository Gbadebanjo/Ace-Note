import { config } from "dotenv";
import createError from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import db from "./config/db.config";
import { auth } from "./middlewares/auth";
import passport from "passport";
import session from "express-session";

import { passportSetup } from "./middlewares/passport";
import indexRouter from "./routes/index";
import usersRouter from "./routes/users";
import noteRouter from "./routes/note";
import authRouter from "./routes/auth";

// import homePage from "./routes/page"

db.sync({ force: false })
  .then(() => {
    console.log("database synced");
  })
  .catch((err) => {
    console.log("err syncing db", err);
  });
const app = express();
config();
passportSetup();

// initialize cookie-session to allow us track the user's session
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
  })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// console.log(process.env.PORT);
// console.log(process.env.NODE_ENV);
// view engine setup
app.set("views", path.join(__dirname, "..", "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/", [indexRouter, authRouter]);
// app.use("/google", [indexRouter, authRouter]);
app.use("/users", auth, usersRouter);
app.use("/users/notes", noteRouter);
// app.use("/homePage", homePage);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (
  err: createError.HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
