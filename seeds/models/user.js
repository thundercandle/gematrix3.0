import mongoose from 'mongoose'
const Schema = mongoose.Schema

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  notebooks: { type: Schema.ObjectId, refs: "Notebook"},
  updatedAt: { type: Schema.Types.Number, default: Date.now() },
  createdAt: {type: Schema.Types.Number, default: Date.now()}
})

export default mongoose.model('User', UserSchema, 'user')