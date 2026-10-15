const { GoogleGenAI } = require("@google/genai");
const { model } = require("mongoose");


/* AI instance created */
const ai = new GoogleGenAI({});


/* Generate AI Response */
const generateAiResponse = async (content) => {

  const response = await ai.interactions.create({
    model: "gemini-3.5-flash-lite",
    input: content,
  })
  return response.output_text;
}


module.exports = { generateAiResponse };


