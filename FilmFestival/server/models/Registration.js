import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
  uid: String,
  name: String,
  email: String,
  projectTitle: String, // Changed from 'title' to 'projectTitle'
  duration: {
    hours: String,
    minutes: String,
    seconds: String,
  },
  productionDate: String,
  trailerLink: String,
  fullFilmLink: String,
  cast: String,
  producer: String,
  directorsByte: String,
}, { timestamps: true });

export default mongoose.model('Registration', registrationSchema);
