"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorJson = exports.successJson = void 0;
const jsonRes = (res, data = {}, message = "success") => {
    return {
        succes: res,
        data: data,
        message: message,
    };
};
const successJson = (data) => jsonRes(true, data);
exports.successJson = successJson;
const errorJson = (error) => jsonRes(false, {}, error);
exports.errorJson = errorJson;
