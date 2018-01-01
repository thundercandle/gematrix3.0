import mongoose from 'mongoose'
const Schema = mongoose.Schema

const UserSchema = new mongoose.Schema({
  username: { type: Schema.Types.String, required: true},
  email: { type: Schema.Types.String, required: true, unique: true },
  hash: { type: Schema.Types.String, required: true, unique: true },
  notebookIds: [{ type: Schema.Types.ObjectId, refs: "Notebook"}],
  numeralIds: [{ type: Schema.Types.ObjectId, refs: "Numeral"}],
  letterIds: [{ type: Schema.Types.ObjectId, refs: "Letter"}],
  sephirothIds: [{ type: Schema.Types.ObjectId, refs: "Sephiroth"}],
  setIds: [{ type: Schema.Types.ObjectId, refs: "Set"}],
  noteIds: [{ type: Schema.Types.ObjectId, refs: "Note"}],
  updatedAt: { type: Schema.Types.Number, default: Date.now() },
  createdAt: {type: Schema.Types.Number, default: Date.now()}
})

export default mongoose.model('User', UserSchema, 'user')
