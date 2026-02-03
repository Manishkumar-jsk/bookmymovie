import { Schema, model, models } from "mongoose";

const MovieSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    duration: {
      type: Number,
      required: true,
    },

    genre: {
      type: [String],
      required: true,
    },

    language: {
      type: String,
      required: true,
    },

    releaseDate: {
      type: Date,
      required: true,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 10,
    },

    posterUrl: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["NOW_SHOWING", "UPCOMING", "ENDED"],
      required: true,
    },

    totalBookings: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default models.Movie || model("Movie", MovieSchema);

