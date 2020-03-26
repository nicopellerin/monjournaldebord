import mongoose, { Schema } from 'mongoose'
import Cryptr from 'cryptr'

const cryptr = new Cryptr(process.env.ACCESS_TOKEN_SECRET)

function encrypt(text) {
  const encrytedText = cryptr.encrypt(text)
  return encrytedText
}

function decrypt(text) {
  const decryptedText = cryptr.decrypt(text)
  return decryptedText
}

const MoodSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  mood: {
    type: String,
    get: decrypt,
    set: encrypt,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.moods || mongoose.model('moods', MoodSchema)
