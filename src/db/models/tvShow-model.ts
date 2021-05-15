import mongoose from 'mongoose'
import { actorsSubSchema, directorSubSchema, seasonsSubSchema } from '../schemes'
const Schema = mongoose.Schema

const tvShowSchema = new Schema({
  name: {
    type: String,
    ref: 'Name',
    minlength: 3,
    maxlength: 50,
    required: [true, 'The name is necessary']
  },
  origin: {
    type: String,
    ref: 'Origin',
    minlength: 3,
    maxlength: 50,
    required: [true, 'The origin is necessary']
  },
  seasons: {
    type: [seasonsSubSchema],
    required: true,
    validate: [(arr:any) => arr.length > 0, 'The seasons is necessary']
  },
  director: {
    type: directorSubSchema,
    required: [true, 'The director is necessary']
  },
  actors: {
    type: [actorsSubSchema],
    required: true,
    validate: [(arr:any) => arr.length > 0, 'The actors is necessary']
  }

}, {
  collection: 'tvShow'
})

export default mongoose.model('TvShow', tvShowSchema)
