import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import { SECRET_KEY_REFRESH_TOKEN, SECRET_KEY_TOKEN } from '../constants'
import { TokenError } from '../exceptions'
import { responseJSON } from '../utils'

const logicVerification = (secreteKey: string, authorization: any) : any => {
  let decoded;
  if (!authorization || typeof authorization !== 'string') {
    throw new TokenError(401, 'Authorization not found')
  }

  const [type, token] = authorization.split(' ')

  if (!type || !token || type !== 'Bearer') {
    throw new TokenError(400, 'Authorization invalid')
  }

  try {
    decoded = jwt.verify(token, secreteKey)
  } catch (error) {
    throw new TokenError(400, 'Token not valid')
  }

  if (!decoded || typeof decoded === 'string') {
    throw new TokenError(400, 'Invalid Token')
  }

  const aud = Object.prototype.hasOwnProperty.call(decoded, 'aud')
  const iss = Object.prototype.hasOwnProperty.call(decoded, 'iss')
  const sub = Object.prototype.hasOwnProperty.call(decoded, 'sub')

  if (!aud || !iss || !sub) {
    throw new TokenError(400, 'Corrupt token')
  }

  return decoded
}

const tokenVerification = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers
    const decoded = logicVerification(SECRET_KEY_TOKEN, authorization)

    req.body.JWT_ALIAS = decoded.sub
    next()
  } catch (error) {
    return (error instanceof TokenError)
      ? res.status(error.code).json(responseJSON(error.message))
      : res.status(500).json(responseJSON('Internal Error.'))
  }
}

const refreshTokenVerification = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers
    const decoded = logicVerification(SECRET_KEY_REFRESH_TOKEN, authorization)

    req.body.JWT_ALIAS = decoded.sub
    next()
  } catch (error) {
    return (error instanceof TokenError)
      ? res.status(error.code).json(responseJSON(error.message))
      : res.status(500).json(responseJSON('Internal Error.'))
  }
}

export {
  tokenVerification,
  refreshTokenVerification
}
