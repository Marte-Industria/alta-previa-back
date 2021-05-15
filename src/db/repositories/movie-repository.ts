import MovieModel from '../models/movie-model'

class MovieRepository {
  private model : any

  constructor (model : any) {
    this.model = model
  }

  async save (movie :any) {
    return await this.model.create(movie)
  }

  async getByFilters (filters: any, orders: any) {
    return await this.model
      .find({ ...filters })
      .sort({ ...orders })
  }
}

export default new MovieRepository(MovieModel)
