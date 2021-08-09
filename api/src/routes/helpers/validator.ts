import express from 'express';
import { validationResult, ValidationChain, ValidationError } from 'express-validator';
import AppError from 'utils/appError';

const errorFormatter = ({ location, msg, param, value, nestedErrors }: ValidationError) => {
  return `${location}[${param}]: ${msg}`;
};

const validate = (validations: ValidationChain[]) => {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req).formatWith(errorFormatter);
    if (errors.isEmpty()) {
      return next();
    }
    next(new AppError(errors.array().join(', '), 400));
  };
};

export default validate;
