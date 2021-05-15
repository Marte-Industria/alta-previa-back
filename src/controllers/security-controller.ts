'use strict'

import { Request, Response } from 'express'
import {ControllerAbstract} from '../interfaces/controller-absctract'
import { SecurityService } from '../services'

class SecurityController extends ControllerAbstract {
  private securityService: SecurityService

  constructor () {
    super()
    this.securityService = new SecurityService()
  }

  register = async (req: Request, res: Response) => {
    try {
      const { user } = req.body
      const resultService = await this.securityService.registerUser(user)
      return this.response(res, 201, 'user created', resultService)
    } catch (error) {
      console.error(error)
      return this.handleException(res, error)
    }
  }

  login = async (req: Request, res: Response) => {
    try {
      const { BASIC_EMAIL: email, BASIC_PASSWORD: password } = req.body
      const resultService = await this.securityService.login(email, password)
      return this.response(res, 200, 'login success', resultService)
    } catch (error) {
      console.error(error)
      return this.handleException(res, error)
    }
  }

  refreshToken = async (req: Request, res: Response) => {
    try {
      const {
        JWT_ALIAS: alias
      } = req.body
      const resultService = await this.securityService.refreshToken(alias)
      return this.response(res, 200, 'refresh success', resultService)
    } catch (error) {
      console.error(error)
      return this.handleException(res, error)
    }
  }

  logout = async (req: Request, res: Response) => {
    try {
      const resultService = await this.securityService.logout()
      return this.response(res, 200, 'logout success', resultService)
    } catch (error) {
      console.error(error)
      return this.handleException(res, error)
    }
  }
}

export { SecurityController }
