import { SynonymModel } from '../models/synonym-model';
import { Model } from 'mongoose';

class SynonymRepository {

  public model: Model<any>;

  constructor(model: Model<any>) {
    this.model = model
  }

  async getById(id: string) {
    return await this.model.findById(id)
  }

  async getByUserAlias(alias: string) {
    return await this.model.find({ 'user.alias': alias })
  }

  async getManyByPropertys(properties : Object) {
    return await this.model.find({ ...properties})
  }

  async createMany(arrSynonym: any) {
    return await this.model.insertMany(arrSynonym)
  }

  async update (alias : string, synonym : any) {
    return await this.model.findOneAndUpdate(
      { alias },
      synonym,
      {
        new: true,
        runValidators: true,
        context: 'query'
      }
    )
  }

  async disabled(alias : string, id :string) {
    return await this.model.findOneAndUpdate(
      { _id : id, user : { alias }},
      { isEnabled: false },
      {
        new: true,
        runValidators: true,
        context: 'query'
      }
    )
  }
}

export default new SynonymRepository(SynonymModel)