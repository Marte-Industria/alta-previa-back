import { Response } from 'express'
import { responseJSON } from '../utils'
import { NODE_ENV } from '../constants'
import { MyError } from './error-abstract'
import Ajv from "ajv"

abstract class ControllerAbstract {
  private _ajv : Ajv

  constructor(){
    this._ajv = new Ajv({coerceTypes: true})
  }

  protected response(res: Response, code: number, msg: string, data?: any) {
    return res.status(code).json(responseJSON(msg, data))
  }

  protected handleException(res: Response, error: Error) {
    console.error(error)
    return (error instanceof MyError)
      ? this.response(res, 400, error.message, [error.name])
      : this.response(res, 500, 'Internal Error', [NODE_ENV !== 'prod' && error.toString()])
  }

  protected validSchema<T>(schema: any, data: any): T {

    const validate = this._ajv.compile(schema)
    const valid = validate(data)
    if(!valid && validate.errors) {
      class RequestError extends MyError{}
      const listError = validate.errors.map((err) => err.propertyName || err.instancePath)
      throw new RequestError('Error in parameters',listError.toString())
    }
    return data as T
  }
}

export {
  ControllerAbstract
}
