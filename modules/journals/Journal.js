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

const JournalSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
    get: decrypt,
    set: encrypt,
  },
  image: {
    type: String,
  },
  mood: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'private',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.journals ||
  mongoose.model('journals', JournalSchema)
