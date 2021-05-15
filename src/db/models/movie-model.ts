import mongoose from 'mongoose'
import { actorsSubSchema, directorSubSchema } from '../schemes'
const Schema = mongoose.Schema

const movieSchema = new Schema({
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
  collection: 'movie'
})

export default mongoose.model('Movie', movieSchema)
