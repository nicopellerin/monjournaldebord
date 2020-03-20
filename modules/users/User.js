import mongoose, { Schema } from 'mongoose'

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
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
    min: [6, 'Veuillez entrer un mot de passe de plus de 6 charactères'],
    required: 'Veuillez entrer un mot de passe',
  },
  avatar: {
    type: String,
  },
  dailyMood: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.users || mongoose.model('users', UserSchema)
