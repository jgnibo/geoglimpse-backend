import { ErrorRequestHandler } from "express";

export const httpErrors = {
  BAD_REQUEST: {
    status: 400,
    message: 'Bad Request',
  },
  UNAUTHORIZED: {
    status: 401,
    message: 'Unauthorized',
  },
  FORBIDDEN: {
    status: 403,
    message: 'Forbidden',
  },
  NOT_FOUND: {
    status: 404,
    message: 'Not Found',
  },
  INTERNAL_SERVER_ERROR: {
    status: 500,
    message: 'Internal Server Error',
  },
};

export const getFieldNotFoundError = (field: string) => ({
  status: httpErrors.BAD_REQUEST.status,
  message: `${field} not found!`,
});


export const errorHandler: ErrorRequestHandler = (err, req, res) => {
  const message = err.code < 500
    ? 'Request error'
    : 'Server error';

  res.status(err.status).json({ message, errors: [err.message] });
};