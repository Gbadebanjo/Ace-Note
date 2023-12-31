"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const db_config_1 = __importDefault(require("./config/db.config"));
const auth_1 = require("./middlewares/auth");
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const passport_2 = require("./middlewares/passport");
const index_1 = __importDefault(require("./routes/index"));
const users_1 = __importDefault(require("./routes/users"));
const note_1 = __importDefault(require("./routes/note"));
const auth_2 = __importDefault(require("./routes/auth"));
// import homePage from "./routes/page"
db_config_1.default.sync({ force: false })
    .then(() => {
    console.log("database synced");
})
    .catch((err) => {
    console.log("err syncing db", err);
});
const app = (0, express_1.default)();
(0, dotenv_1.config)();
(0, passport_2.passportSetup)();
// initialize cookie-session to allow us track the user's session
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));
// initialize passport
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// console.log(process.env.PORT);
// console.log(process.env.NODE_ENV);
// view engine setup
app.set("views", path_1.default.join(__dirname, "..", "views"));
app.set("view engine", "ejs");
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, "..", "public")));
app.use("/", [index_1.default, auth_2.default]);
// app.use("/google", [indexRouter, authRouter]);
app.use("/users", auth_1.auth, users_1.default);
app.use("/users/notes", note_1.default);
// app.use("/homePage", homePage);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render("error");
});
exports.default = app;
