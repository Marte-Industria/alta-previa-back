import { Request, Response } from 'express';
import { ControllerAbstract } from '../interfaces';
import UserService from '../services/user-service';
const userService = new UserService();

export class UserController extends ControllerAbstract {

  readUser = async (req: Request, res: Response) => {
    try {
      const { JWT_ALIAS : alias } = req.body
      const resultService = await userService.readUser(alias)
      return res.status(200).json(resultService);
    } catch (error) {
      console.error(error)
      return this.handleException(res, error)
    }
  }

  updateUser = async (req: Request, res: Response) => {
    try {
      const { user, JWT_ALIAS : alias } = req.body
      const resultService = await userService.updateUser(alias,user)
      return res.status(200).json(resultService);
    } catch (error) {
      console.error(error)
      return this.handleException(res, error)
    }
  }

  disabledUser = async (req: Request, res: Response) => {
    try {
      const { JWT_ALIAS : alias  } = req.body
      const resultService = await userService.disabledUser(alias)
      return res.status(200).json(resultService);
    } catch (error) {
      console.error(error)
      return this.handleException(res, error)
    }
  }
}