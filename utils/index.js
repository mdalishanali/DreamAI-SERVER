const { createClient } = require('@supabase/supabase-js');

// Create a Supabase client
const supabaseUrl = 'https://dnrksmpzphligzmluyss.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey);

 const generateUniqueFileName = () => `${Date.now()}-${Math.random().toString(36).substring(2)}`;

async function uploadBase64Image(image) {
  try {
     base64Image = `data:image/jpeg;base64,${image}`;
    const filename = generateUniqueFileName();
    // Remove the data URL prefix if present
    const base64String = base64Image.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64String, 'base64');

    // Upload the image to Supabase storage
    const { data, error } = await supabase.storage
      .from('photos')
      .upload(`public/${filename+".png"}`, buffer, {
        contentType: 'image/jpeg', // or 'image/png' or the appropriate content type
      });

    if (error) {
      throw error;
    }

    // Generate a public URL for the uploaded image
    const imageUrl = `${supabaseUrl}/storage/v1/object/public/${data.fullPath}`;
    console.log('Uploaded image URL:', imageUrl);
    return imageUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
  }
}


module.exports={
    uploadBase64Image
}
