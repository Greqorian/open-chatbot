import express from "express";
import cors from "cors";
import { OpenAI } from "openai";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3005;

const apiKey = process.env.VITE_OPEN_AI_KEY;
// Initialise OpenAI API
const openai = new OpenAI({ apiKey: apiKey });

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.post("/open-chat", async (req, res) => {
  // question comes from frontend and is the question asked by the user
  const { question } = req.body;

  const response = await openai.chat.create({
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: question },
    ],
    model: "gpt-3.5-turbo",
    max_tokens: 300,
  });
  res.send(response.choices[0].message.content);
});
