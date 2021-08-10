class AppError extends Error {
  public statusCode: number;
  public status: string;
  public isOperational: boolean;
  public errors: string[];

  constructor(message: string, statusCode: number, arr?: string[]) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    this.errors = arr || [''];

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
