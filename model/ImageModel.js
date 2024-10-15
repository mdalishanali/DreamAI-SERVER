const mongoose = require("mongoose");

// Define the schema for storing generated images
const imageSchema = new mongoose.Schema({
  prompt: {
    type: String,
    required: true,
    trim: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
},{
    timestamps:true,
    versionKey:false
});

// Create the model from the schema
const ImageModel = mongoose.model("GeneratedImage", imageSchema);

module.exports = ImageModel;
