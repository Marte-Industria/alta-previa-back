import TvShowModel from '../models/tvShow-model'

class TvShowRepository {
  private model : any

  constructor (model : any) {
    this.model = model
  }

  async save (tvShow :any) {
    return await this.model.create(tvShow)
  }

  async getEpisodeByIds (tvShowId :string, seasonId :string, episodeId :string) {
    const data = await this.model.findOne({
      _id: tvShowId,
      'seasons._id': seasonId,
      'seasons.episodes._id': episodeId
    })

    if (!data) {
      return
    }

    const { seasons } = data

    const season = seasons
      .find((oneSeason :any) => oneSeason._id.toString() === seasonId)

    const episode = season.episodes
      .find((episodes :any) => episodes._id.toString() === episodeId)

    return {
      director: data.director,
      actors: data.actors,
      episode
    }
  }
}

export default new TvShowRepository(TvShowModel)
