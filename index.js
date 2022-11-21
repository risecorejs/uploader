"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
/**
 * UPLOADER
 * @param req {express.Request}
 * @param res {express.Response}
 * @param options {IOptions?}
 * @return {Promise<any>}
 */
async function default_1(req, res, options) {
    const _options = getOptions(options);
    const Multer = (0, multer_1.default)({
        limits: {
            fileSize: _options.settings?.maxSize ? 1024 * 1024 * _options.settings.maxSize : Infinity
        },
        fileFilter(req, file, cb) {
            file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
            if (_options.settings?.extensions) {
                const regex = new RegExp(_options.settings.extensions.join('|'), 'i');
                if (!file.originalname.match(regex)) {
                    cb(Error('Wrong format'));
                }
            }
            cb(null, true);
        },
        get storage() {
            switch (_options.storage.type) {
                case 'memoryStorage':
                    return multer_1.default.memoryStorage();
                case 'diskStorage':
                    return multer_1.default.diskStorage({
                        destination(req, file, cb) {
                            cb(null, _options.storage.dist);
                        },
                        filename(req, file, cb) {
                            cb(null, Date.now() + '-' + file.originalname);
                        }
                    });
            }
        }
    });
    // @ts-ignore
    const upload = Multer[_options.method](..._options.args);
    return new Promise((resolve, reject) => {
        upload(req, res, (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(req[_options.method === 'single' ? 'file' : 'files']);
            }
        });
    });
}
exports.default = default_1;
/**
 * GET-OPTIONS
 * @param options {IOptions | undefined}
 * @return {TOptions}
 */
function getOptions(options) {
    const _options = {};
    if (options)
        Object.assign(_options, options);
    if (!_options.method)
        _options.method = 'any';
    if (!_options.args)
        _options.args = [];
    if (!_options.storage)
        _options.storage = {};
    if (!_options.storage.type)
        _options.storage.type = 'memoryStorage';
    return _options;
}
