import mongoose from 'mongoose';

const emailAccountSchema = new mongoose.Schema({
  uid: String,
  email: String,
  password: String,
}, { timestamps: true });

const googleAccountSchema = new mongoose.Schema({
  uid: String,
  email: String,
}, { timestamps: true });

export const emailSignup = mongoose.model('emailSignup', emailAccountSchema);
export const googleSignup = mongoose.model('googleSignup', googleAccountSchema);
