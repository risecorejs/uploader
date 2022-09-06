import multer from 'multer'
import express from 'express'

import { IOptions } from './interfaces'
import { TOptions } from './types'

/**
 * UPLOADER
 * @param req {express.Request}
 * @param res {express.Response}
 * @param options {IOptions?}
 * @return {Promise<any>}
 */
export default async function (req: express.Request, res: express.Response, options?: IOptions) {
  const _options = getOptions(options)

  const Multer = multer({
    get storage() {
      switch (_options.storage.type) {
        case 'memoryStorage':
          return multer.memoryStorage()

        case 'diskStorage':
          return multer.diskStorage({
            destination(req, file, cb) {
              cb(null, <string>_options.storage.dist)
            },
            filename(req, file, cb) {
              cb(null, Date.now() + '-' + file.originalname)
            }
          })
      }
    },
    limits: {
      fileSize: _options.settings?.maxSize ? 1024 * 1024 * _options.settings.maxSize : Infinity
    },
    fileFilter(req, file, cb) {
      if (_options.settings?.extensions) {
        const regex = new RegExp(_options.settings.extensions.join('|'), 'i')

        if (!file.originalname.match(regex)) {
          cb(Error('Wrong format'))
        }
      }

      cb(null, true)
    }
  })

  // @ts-ignore
  const upload = Multer[_options.method].apply(null, _options.args)

  return new Promise((resolve, reject) => {
    upload(req, res, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve(req[_options.method === 'single' ? 'file' : 'files'])
      }
    })
  })
}

/**
 * GET-OPTIONS
 * @param options {IOptions | undefined}
 * @return {TOptions}
 */
function getOptions(options: IOptions | undefined): TOptions {
  const _options: any = {}

  if (options) Object.assign(_options, options)

  if (!_options.method) _options.method = 'any'
  if (!_options.args) _options.args = []
  if (!_options.storage) _options.storage = {}
  if (!_options.storage.type) _options.storage.type = 'memoryStorage'

  return _options
}
