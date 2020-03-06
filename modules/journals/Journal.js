import mongoose, { Schema } from 'mongoose'

const JournalSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.journals ||
  mongoose.model('journals', JournalSchema)
