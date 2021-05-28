
import { Request, Response } from 'express';
import { ControllerAbstract } from '../interfaces';
import { INeverService, SynonymService } from '../services';
import { SearchINever } from '../types';

export class INeverController extends ControllerAbstract {

  private iNeverService: INeverService

  constructor() {
    super()
    this.iNeverService = new INeverService()
  }

  createMany = async (req: Request, res: Response) => {
    try {
      const { synonym: arrSynonym, JWT_ALIAS: alias } = req.body
      const resultService = await this.iNeverService.createMany(alias, arrSynonym)
      return res.status(201).json(resultService);
    } catch (err) {
      console.error('iNeverController.createMany::err', err.message)
      return this.handleException(res, err)
    }
  }

  getManyByUser = async (req: Request, res: Response) => {
    try {
      const { JWT_ALIAS: alias } = req.body
      const resultService = await this.iNeverService.readManyByUser(alias)
      return res.status(200).json(resultService);
    } catch (err) {
      console.error('iNeverController.getManyByUser::err', err.message)
      return this.handleException(res, err)
    }
  }

  getMany = async (req: Request, res: Response) => {
    try {
      const { JWT_COUNTRY: country } = req.body
      const schema = {
        type: "object",
        properties: {
          country: { type: "string" },
          level: { type: "string" },
          is_spacy: { type: "boolean" }
        },
        additionalProperties: true
      }
      const { level, is_spacy: isSpacy } = this.validSchema<SearchINever>(schema, {...req.query,country})
      const gamesINever = await this.iNeverService.readMany(level, isSpacy)
      const resultService = await SynonymService.replaceVariable(country,gamesINever)
      return res.status(200).json(resultService);
    } catch (err) {
      console.error('iNeverController.getMany::err', err.message)
      return this.handleException(res, err)
    }
  }

  disabled = async (req: Request, res: Response) => {
    try {
      const { JWT_ALIAS: alias } = req.body
      const { id: iNeverID } = req.params
      await this.iNeverService.disabled(alias, iNeverID)
      return res.status(204).end();
    } catch (err) {
      console.error('iNeverController.disabled::err', err.message)
      return this.handleException(res, err)
    }
  }
}
