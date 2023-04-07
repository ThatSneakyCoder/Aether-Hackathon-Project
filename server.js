import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

const openAi = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

app.post('/api/chat', async (req, res) => {
  const { input } = req.body;

  try {
    const response = await openAi.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: input }],
    });

    res.json({ message: response.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
