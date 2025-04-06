
class ErrorHandler extends Error {
  statusCode: number;
  erros: any;
  constructor(
    statusCode: number,
    message: string = "sSomething went wrong",
    erros: any = [],
    stack: string = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.erros = erros;
    console.error(message);
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }

}

export default ErrorHandler;