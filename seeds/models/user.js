import mongoose from 'mongoose'
const Schema = mongoose.Schema

const UserSchema = new mongoose.Schema({
  username: { type: Schema.Types.String, required: true},
  email: { type: Schema.Types.String, required: true, unique: true },
  hash: { type: Schema.Types.String, required: true, unique: true },
  notebooks: [{ type: Schema.Types.ObjectId, refs: "Notebook"}],
  updatedAt: { type: Schema.Types.Number, default: Date.now() },
  createdAt: {type: Schema.Types.Number, default: Date.now()}
})

export default mongoose.model('User', UserSchema, 'user')
