
import { Request, Response } from 'express';
import { ControllerAbstract } from '../interfaces';
import { SynonymService } from '../services';

export class SynonymController extends ControllerAbstract {

  private synonymService: SynonymService

  constructor() {
    super()
    this.synonymService = new SynonymService()
  }

  createMany = async (req: Request, res: Response) => {
    try {
      const { synonym: arrSynonym, JWT_ALIAS: alias } = req.body
      const resultService = await this.synonymService.createMany(alias, arrSynonym)
      return res.status(201).json(resultService);
    } catch (err) {
      console.error('synonymController.createMany::err', err.message)
      return this.handleException(res, err)
    }
  }

  getManyByUser = async (req: Request, res: Response) => {
    try {
      const { JWT_ALIAS: alias } = req.body
      const resultService = await this.synonymService.getManyByUser(alias)
      return res.status(200).json(resultService);
    } catch (err) {
      console.error('synonymController.getManyByUser::err', err.message)
      return this.handleException(res, err)
    }
  }

  disabled = async (req: Request, res: Response) => {
    try {
      const { JWT_ALIAS: alias } = req.body
      const { id: synonymID } = req.params
      await this.synonymService.disabled(alias, synonymID)
      return res.status(204).end();
    } catch (err) {
      console.error('synonymController.disabled::err', err.message)
      return this.handleException(res, err)
    }
  }
}
