import { Request, Response } from 'express';
import { ControllerAbstract } from '../interfaces';
import {UserService} from '../services';
export class UserController extends ControllerAbstract {
  
  private userService: UserService

  constructor () {
    super()
    this.userService = new UserService()
  }

  readUser = async (req: Request, res: Response) => {
    try {
      const { JWT_ALIAS : alias } = req.body
      const resultService = await this.userService.readUser(alias)
      return res.status(200).json(resultService);
    } catch (error) {
      console.error(error)
      return this.handleException(res, error)
    }
  }

  updateUser = async (req: Request, res: Response) => {
    try {
      const { user, JWT_ALIAS : alias } = req.body
      const resultService = await this.userService.updateUser(alias,user)
      return res.status(200).json(resultService);
    } catch (error) {
      console.error(error)
      return this.handleException(res, error)
    }
  }

  disabledUser = async (req: Request, res: Response) => {
    try {
      const { JWT_ALIAS : alias  } = req.body
      await this.userService.disabled(alias)
      return res.status(204).end();
    } catch (error) {
      console.error(error)
      return this.handleException(res, error)
    }
  }
}