import { UserModel } from '../models/userModel';
import { Model } from 'mongoose';

class UserRepository {

  public model: Model<any>;

  constructor(model: Model<any>) {
    this.model = model
  }

  async getById(id: string) {
    return await this.model.findById(id)
  }

  async getByEmail(email: string) {
    return await this.model.findOne({ email })
  }

  async getByAlias(alias: string) {
    return await this.model.findOne({ alias })
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