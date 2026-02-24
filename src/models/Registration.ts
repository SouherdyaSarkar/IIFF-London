import mongoose, { Schema, model, models } from "mongoose";

const RegistrationSchema = new Schema({
  title: String,
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

const Registration = models.Registration || model("Registration", RegistrationSchema);

export default Registration;
