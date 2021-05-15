import DirectorModel from '../models/director-model'

class DirectorRepository {
  private model : any

  constructor (model : any) {
    this.model = model
  }

  async getToCreateGenericFilm (id: string) {
    const result = await this.model.findById(id, ['name', 'lastname'])
    if (!result) {
      return
    }
    return {
      director_id: result._id,
      name: result.name,
      lastname: result.lastname
    }
  }

  async getById (id: string, fieldsToReturn?: Array<string>) {
    return await this.model.findById(id, fieldsToReturn)
  }

  async save (director :any) {
    return await this.model.create(director)
  }
}

export default new DirectorRepository(DirectorModel)
