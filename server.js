import express from "express";
import cors from "cors";
import { OpenAI } from "openai";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3005;

const apiKey = process.env.VITE_OPEN_AI_KEY;
const openai = new OpenAI({ apiKey: apiKey });

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.post("/open-chat", async (req, res) => {
  try {
    const { question } = req.body;

    const response = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: question },
      ],
      model: "gpt-4o-mini",
      max_tokens: 300,
    });

    res.send(response.choices[0].message.content);
  } catch (error) {
    console.error("Error start: ", error);
    res.status(500).send("An error occurred");
  }
});
