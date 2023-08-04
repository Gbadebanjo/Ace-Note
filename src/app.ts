import {config} from 'dotenv'
import createError from 'http-errors';
import express,{Request,Response,NextFunction} from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import db from './config/db.config';

import indexRouter from './routes/index';
import usersRouter from './routes/users';
import noteRouter from './routes/note';


db.sync()
.then(() => {
  console.log('database synced');
})
.catch((err) => {
  console.log('err syncing db', err);
});
const app = express();
config()
// console.log(process.env.PORT);
// console.log(process.env.NODE_ENV);
// view engine setup
app.set('views', path.join(__dirname,'..', 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'..', 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/note', noteRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err: createError.HttpError, req:Request, res:Response, next:NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
