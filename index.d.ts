import express from 'express';
import { IOptions } from './interfaces';
/**
 * UPLOADER
 * @param req {express.Request}
 * @param res {express.Response}
 * @param options {IOptions?}
 * @return {Promise<any>}
 */
export default function (req: express.Request, res: express.Response, options?: IOptions): Promise<any>;
