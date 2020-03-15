import mongoose, { Schema } from 'mongoose'

const UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: 'Veuillez entrer votre address courriel',
  },
  password: {
    type: String,
    trim: true,
    required: 'Veuillez entrer un mot de passe',
  },
  avatar: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.users || mongoose.model('users', UserSchema)
