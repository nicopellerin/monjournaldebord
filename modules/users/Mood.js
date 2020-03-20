import mongoose, { Schema } from 'mongoose'

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
