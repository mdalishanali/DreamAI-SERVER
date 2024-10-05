const Together = require("together-ai");
const { z } = require("zod");
const ImageModel = require("../model/ImageModel");

const apiKey =process.env.TOGETHER_API_KEY;

const generateImage = async (req, res) => {
    const together = new Together({ apiKey });
  // Validate API Key
  if (!process.env.TOGETHER_API_KEY) {
    return res.status(500).json({ error: "API key is missing." });
  }

  // Validate input
  const parsedInput = z.object({
    prompt: z.string().min(1, "Prompt cannot be empty."),
  });

  try {
    const { prompt } = parsedInput.parse(req.body);

    let response = await together.images.create({
      prompt,
    //   model: "black-forest-labs/FLUX.1-schnell-Free",
    model: "black-forest-labs/FLUX.1-schnell",
    // prompt: "Cats eating popcorn",
      width: 1024,
      height: 768,
      steps: 3,
      response_format: "base64",
    });

    // const newImage = new ImageModel({ prompt, imageUrl: response.data[0].b64_json });
    // await newImage.save();


    // Return the generated image URL
    return res.status(200).json({ imageUrl: response.data[0] });
  } catch (error) {
    console.error("Error generating image:", error); // Log the error for debugging
    return res.status(500).json({ error: error.message });
  }
};

const getImages = async (req, res) => {
    // Extract page number and limit from the query parameters
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
  
    try {
      const totalImages = await ImageModel.countDocuments(); // Get total number of images
      const images = await ImageModel.find()
        .skip((page - 1) * limit) // Skip the documents for pagination
        .limit(limit) // Limit the number of documents returned
        .sort({ createdAt: -1 }); // Sort by most recent
  
      return res.status(200).json({
        totalPages: Math.ceil(totalImages / limit), // Total pages based on total images and limit
        currentPage: page,
        images,
      });
    } catch (error) {
      console.error("Error fetching images:", error);
      return res.status(500).json({ error: error.message });
    }
  };

  
module.exports = { generateImage,getImages };
