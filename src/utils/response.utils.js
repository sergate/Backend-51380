import { ResponseData, ResponseError } from "../dao/models/response.model.js"

export const responseData = (status, payload) => new ResponseData(status, payload)
export const responseError = (status, payload, error) => new ResponseError(status, payload, error)