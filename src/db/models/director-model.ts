const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Director = new Schema({
  name: {
    type: String,
    ref: 'Name',
    minlength: 3,
    maxlength: 50,
    required: [true, 'The name is necessary']
  },
  lastname: {
    type: String,
    ref: 'LastName',
    minlength: 3,
    maxlength: 50,
    required: [true, 'The lastname is necessary']
  }
}, {
  collection: 'director'
})

export default mongoose.model('Director', Director)
