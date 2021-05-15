import mongoose from 'mongoose'
const Schema = mongoose.Schema

const directorSubSchema = new Schema({
  director_id: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  lastname: { type: String, required: true }
}, { _id: false })

const actorsSubSchema = new Schema({
  actor_id: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  lastname: { type: String, required: true }
}, { _id: false })

const episodesSubSchema = new Schema({
  name: { type: String, required: true },
  number: { type: Number, required: true },
  description: { type: String, required: true }
})

const seasonsSubSchema = new Schema({
  name: { type: String, required: true },
  number: { type: Number, required: true },
  year: { type: Number, required: true },
  episodes: {
    type: [episodesSubSchema],
    required: true,
    validate: [(arr:any) => arr.length > 0, 'The episodes is necessary']
  }
})

export {
  directorSubSchema,
  actorsSubSchema,
  seasonsSubSchema
}
