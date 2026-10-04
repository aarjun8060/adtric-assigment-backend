import mongoose, { Schema } from "mongoose";

const newsEventSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    category: { type: String, enum: ["News", "Event", "Achievement"], required: true },
    date: { type: Date, required: true },
    image: { type: String },
    shortDescription: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    published: { type: Boolean, default: false, index: true },
  },
  { timestamps: true },
);

newsEventSchema.method("toJSON", function () {
  const document = this.toObject();
  document.id = document._id;
  delete document._id;
  delete document.__v;
  return document;
});

export const NewsEvent = mongoose.model("NewsEvent", newsEventSchema);
