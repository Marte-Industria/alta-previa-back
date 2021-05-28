import mongoose from 'mongoose';

const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      ref: 'Nombre',
      minlength: 3,
      maxlength: 50,
      required: [true, 'El firstName es necesario']
    },
    lastName: {
      type: String,
      ref: 'Apellido',
      minlength: 3,
      maxlength: 50,
      required: [true, 'El lastName es necesario']
    },
    alias: {
      type: String,
      ref: 'Alias',
      minlength: 3,
      maxlength: 50,
      unique: true,
      index: true,
      required: [true, 'El alias es necesario']
    },
    email: {
      type: String,
      ref: 'Email',
      minlength: 5,
      maxlength: 50,
      unique: true,
      index: true,
      required: [true, 'El correo es necesario']
    },
    socialRed: {
      type: {
        username: { type: String, required: true },
        url: { type: String, required: true },
        isVisible: { type: Boolean, required: true }
      },
      ref: 'Social Red',
      required: false
    },
    password: {
      type: String,
      ref: 'Password',
      required: [true, 'El clave es necesario']
    },
    country: {
      type: String,
      ref: 'Country',
      minlength: 1,
      maxlength: 5,
      required: [true, 'El pais es necesario']
    },
    city: {
      type: String,
      ref: 'City',
      minlength: 3,
      maxlength: 50,
      required: [true, 'El ciudad es necesario']
    },
    isEnabled: {
      type: Boolean,
      ref: 'Enabled',
      required: [true, 'El Campo Activo es necesario']
    },
    createdAt: {
      type: Date,
      ref: 'Created',
      required: [true, 'El Creado es necesario']
    }
  }, {
  collection: 'user',
  toJSON: {
    virtuals: true
  }
}
)

const UserModel = mongoose.model('User', UserSchema)

export {
  UserSchema,
  UserModel
}