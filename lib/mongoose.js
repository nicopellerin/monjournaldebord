import mongoose from 'mongoose'

const connectDB = handler => async (req, res) => {
  if (mongoose.connections[0].readyState !== 1) {
    await mongoose.connect(process.env.mongo_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
  }

  return handler(req, res)
}

const db = mongoose.connection
db.once('open', () => console.log('Connected to mongo'))

export default connectDB
