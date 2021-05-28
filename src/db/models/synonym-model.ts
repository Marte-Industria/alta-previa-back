import mongoose from 'mongoose';

const Schema = mongoose.Schema

const SynonymSchema = new Schema(
  {
    type: {
      type: String,
      ref: 'Type',
      minlength: 3,
      maxlength: 50,
      required: [true, 'El type es necesario']
    },
    key: {
      type: String,
      ref: 'Key',
      minlength: 2,
      maxlength: 20,
      required: [true, 'El key es necesario']
    },
    value: {
      type: String,
      ref: 'Value',
      minlength: 2,
      maxlength: 50,
      required: [true, 'El value es necesario']
    },
    country: {
      type: String,
      ref: 'Country',
      minlength: 2,
      maxlength: 5,
      required: [true, 'El country es necesario']
    },
    user: {
      type: {
        alias: { type: String, required: true },
      },
      ref: 'User',
      required: true
    },
    isApproved: {
      type: Boolean,
      ref: 'Approved',
      required: [true, 'El Campo Status es necesario']
    },
    isActive: {
      type: Boolean,
      ref: 'Active',
      required: [true, 'El Campo Deleted es necesario']
    },
    createdAt: {
      type: Date,
      ref: 'Created',
      required: [true, 'El Creado es necesario']
    }
  },{
    collection: 'synonym',
    toJSON: {
      virtuals: true
    }
  }
)

const SynonymModel = mongoose.model('Synonym', SynonymSchema)

export{ 
  SynonymSchema,
  SynonymModel
}