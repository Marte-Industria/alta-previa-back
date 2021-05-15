import { Request, Response, NextFunction } from 'express'
import { responseJSON } from '../utils'

const credentialVerification = async (req : Request, res : Response, next : NextFunction) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(400).json(responseJSON('Authorization not found'))
  }

  const [type, credencialesEnbase64] = authorization.split(' ')

  if (!type || !credencialesEnbase64 || type !== 'Basic') {
    return res.status(400).json(responseJSON('Authorization invalid'))
  }

  const [mail, password] = Buffer.from(credencialesEnbase64, 'base64').toString('utf8').split(':')

  if (!mail || !password) {
    return res.status(400).json(responseJSON('Authorization invalid'))
  }

  req.body.BASIC_EMAIL = mail
  req.body.BASIC_PASSWORD = password
  next()
}

export {
  credentialVerification
}
