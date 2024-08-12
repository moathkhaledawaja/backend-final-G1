import { Request, Response } from 'express';
import { Controller } from 'tsoa';

export class BaseController extends Controller {
  protected request: Request;
  protected response: Response;

  constructor(req: Request, res: Response) {
    super();
    this.request = req;
    this.response = res;
  }
}
