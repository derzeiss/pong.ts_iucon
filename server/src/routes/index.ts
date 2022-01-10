import { ErrorRequestHandler, Router } from 'express';
import { pongRouter } from './pongRouter';

export const apiRouter = Router();

apiRouter.use('/pong', pongRouter);

const validationErrorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  if (err.name === 'ValidationError') {
    const errorsByField = Object.keys(err.errors).reduce((errors, key) => {
      errors[key] = err.errors[key].message;
      return errors;
    }, {} as any);

    return res.status(422).json(errorsByField);
  }
  return next(err);
};

apiRouter.use(validationErrorHandler);
