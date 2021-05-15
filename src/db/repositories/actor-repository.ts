import ActorModel from '../models/actor-model'

class ActorRepository {
  private model : any

  constructor (model : any) {
    this.model = model
  }

  async getToCreateGenericFilm (ids: string) {
    const actors = await this.model.find({ _id: ids })

    if (!actors) {
      return
    }

    return actors.map((actor :any) => {
      return {
        actor_id: actor._id,
        name: actor.name,
        lastname: actor.lastname
      }
    })
  }

  async getById (id: string) {
    return await this.model.findById(id)
  }

  async save (actor :any) {
    return await this.model.create(actor)
  }
}

export default new ActorRepository(ActorModel)
