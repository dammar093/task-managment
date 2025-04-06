import { Request, Response, NextFunction } from 'express';


const asyncHander = (requestHandler: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
  }
}

export default asyncHander;