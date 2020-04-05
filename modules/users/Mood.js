import mongoose, { Schema } from 'mongoose'
import crypto from 'crypto'

function encrypt(text) {
  let cipher = crypto.createCipher(
    'aes-256-cbc',
    process.env.access_token_secret
  )
  let crypted = cipher.update(text, 'utf8', 'hex')
  crypted += cipher.final('hex')
  return crypted
}

function decrypt(text) {
  if (text === null || typeof text === 'undefined') {
    return text
  }
  let decipher = crypto.createDecipher(
    'aes-256-cbc',
    process.env.access_token_secret
  )
  let dec = decipher.update(text, 'hex', 'utf8')
  dec += decipher.final('utf8')
  return dec
}

const MoodSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  mood: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.moods || mongoose.model('moods', MoodSchema)
