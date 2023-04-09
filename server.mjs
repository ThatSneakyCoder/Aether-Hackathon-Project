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
      model: 'text-davinci-002',
      prompt: `Locations to visit in ${input}`,
      maxTokens: 200,
      temperature: 0.5,
      n: 1,
      stop: "\n"
    });

    const message = response.data.choices[0].text.trim();

    if (message) {
      res.json({ message });
    } else {
      res.status(400).json({ error: 'Unable to find any locations. Please try again with a different query.' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




