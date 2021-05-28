import { INeverModel } from '../models/iNever-model';
import { Model } from 'mongoose';

class INeverRepository {

  public model: Model<any>;

  constructor(model: Model<any>) {
    this.model = model
  }

  async getById(id: string) {
    return await this.model.findById(id)
  }

  async getManyByPropertys(properties : Object) {
    return await this.model.find({ ...properties})
  }

  async getByUserAlias(alias: string) {
    return await this.model.find({ 'user.alias': alias })
  }

  async createMany(arrINever: any) {
    return await this.model.insertMany(arrINever)
  }

  async update(id: string, alias: string) {
    return await this.model.findOneAndUpdate(
      { _id: id, user: { alias } },
      {
        new: true,
        runValidators: true,
        context: 'query'
      }
    )
  }

  async disabled(id: string, alias: string) {
    return await this.model.findOneAndUpdate(
      { _id: id, 'user.alias': alias, isActive : true },
      { isActive: false },
      {
        new: true,
        runValidators: true,
        context: 'query'
      }
    )
  }
}

export default new INeverRepository(INeverModel)