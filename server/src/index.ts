import dotenv from 'dotenv';

dotenv.config();

import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';

import { PORT, NODE_ENV } from './config';
import { apiRouter } from './routes';
import { HTTPError } from './utility/HTTPError';

const app = express();

if (NODE_ENV === 'development') {
  console.log(
    'Starting in development mode. If this is a productive system make sure to set env variable NODE_ENV to "production".'
  );
  app.use(cors());
}

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

app.use('/api', apiRouter);

app.use(express.static(path.join(__dirname, '../../react-app/build')));
app.get('*', (_req, res) => res.sendFile(path.join(__dirname, '../../react-app/build/index.html')));

// catch 404
app.use((req, _res, next) => {
  let msg = 'Not found';
  if (NODE_ENV === 'development') msg += ': ' + req.url;
  let err = new HTTPError(msg);
  err.status = 404;
  next(err);
});

// send maintenance site if index.html is not available
app.use((err: HTTPError, _req: Request, res: Response, next: NextFunction) => {
  const errAny = err as any; // to access fs specific error fields
  if (errAny.errno === -2 && errAny.code === 'ENOENT' && errAny.path.match(/index\.html$/)) {
    return res.sendFile(path.join(__dirname, '../public/maintenance.html'));
  }
  next(err);
});

// error handler
app.use((err: HTTPError, req: Request, res: Response, _next: NextFunction) => {
  err.status = err.status || 500;
  console.error(err);
  res.status(err.status);
  res.json({
    req: {
      url: req.url,
    },
    error: {
      status: err.status,
      message: err.message,
    },
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
