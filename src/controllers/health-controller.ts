

import { Request, Response } from 'express'
import { ControllerAbstract } from '../interfaces'
import { HealthService } from '../services'

class HealthController extends ControllerAbstract {
  private healthService: HealthService

  constructor() {
    super()
    this.healthService = new HealthService()
  }

  dependencies = async (req: Request, res: Response) => {
    try {
      const resultService = await this.healthService.valid()
      return this.response(res, 200, 'Welcome to AltaPrevia', resultService)
    } catch (error) {
      console.error(error)
      return this.handleException(res, error)
    }
  }
}

export { HealthController }
