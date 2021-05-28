import { UserModel } from '../models/user-model';
import { Model } from 'mongoose';

class UserRepository {

  public model: Model<any>;

  constructor(model: Model<any>) {
    this.model = model
  }

  async getById(id: string) {
    return await this.model.findById(id)
  }

  async getOneByPropertys(property: Object) {
    return await this.model.findOne({ ...property })
  }

  async create(user: Object) {
    return await this.model.create(user)
  }

  async update (alias : string, user : any) {
    return await this.model.findOneAndUpdate(
      { alias },
      user,
      {
        new: true,
        runValidators: true,
        context: 'query'
      }
    )
  }

  async updatePassword(alias : string, password: string) {
    return await this.model.findOneAndUpdate(
      { alias },
      { password },
      {
        new: true,
        runValidators: true,
        context: 'query'
      }
    )
  }

  async disabled(alias : string) {
    return await this.model.findOneAndUpdate(
      { alias},
      { isEnabled: false },
      {
        new: true,
        runValidators: true,
        context: 'query'
      }
    )
  }
}

export default new UserRepository(UserModel)