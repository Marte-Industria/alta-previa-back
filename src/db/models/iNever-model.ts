import mongoose from 'mongoose';

const Schema = mongoose.Schema

const INeverSchema = new Schema(
  {
    level: {
      type: String,
      ref: 'Level',
      minlength: 3,
      maxlength: 50,
      required: [true, 'El level es necesario']
    },
    body: {
      type: String,
      ref: 'Body',
      minlength: 3,
      maxlength: 50,
      required: [true, 'El Body es necesario']
    },
    user: {
      type: {
        alias: { type: String, required: true },
        socialProfile: { type: String, required: false }
      },
      ref: 'User',
      required: true
    },
    isSpicy: {
      type: Boolean,
      ref: 'Spicy',
      required: [true, 'El Campo Spicy es necesario']
    },
    isSynonymous: {
      type: Boolean,
      ref: 'Synonymous',
      required: [true, 'El Campo Synonymous es necesario']
    },
    isApproved: {
      type: Boolean,
      ref: 'Approved',
      required: [true, 'El Campo Approved es necesario']
    },
    isActive: {
      type: Boolean,
      ref: 'Active',
      required: [true, 'El Campo Active es necesario']
    },
    createdAt: {
      type: Date,
      ref: 'Created',
      required: [true, 'El Created es necesario']
    }
  },{
    collection: 'iNever',
    toJSON: {
      virtuals: true
    }
  }
)

const INeverModel = mongoose.model('INever', INeverSchema)

export{ 
  INeverSchema,
  INeverModel
}